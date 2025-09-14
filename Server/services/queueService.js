const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');
const postingService = require('./postingService');
const tokenRefreshService = require('./tokenRefreshService');

// Redis connection configuration
const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB || 0,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
};

class QueueService {
  constructor() {
    this.queues = {};
    this.workers = {};
    this.isInitialized = false;
  }

  /**
   * Initialize the queue service
   */
  async initialize() {
    if (this.isInitialized) {
      console.log('Queue service already initialized');
      return;
    }

    try {
      console.log('Initializing queue service...');

      // Create queues
      this.queues.posting = new Queue('posting', { connection: redisConnection });
      this.queues.tokenRefresh = new Queue('tokenRefresh', { connection: redisConnection });
      this.queues.notifications = new Queue('notifications', { connection: redisConnection });

      // Create workers
      await this.createWorkers();

      // Set up queue event listeners
      this.setupQueueEventListeners();

      this.isInitialized = true;
      console.log('Queue service initialized successfully');

    } catch (error) {
      console.error('Failed to initialize queue service:', error);
      throw error;
    }
  }

  /**
   * Create workers for each queue
   */
  async createWorkers() {
    // Posting worker
    this.workers.posting = new Worker(
      'posting',
      async (job) => {
        const { type, data } = job.data;
        
        switch (type) {
          case 'publish_post':
            return await postingService.publishPost(data.post);
          case 'process_scheduled':
            return await postingService.processScheduledPosts();
          case 'retry_failed':
            return await postingService.retryFailedPosts();
          default:
            throw new Error(`Unknown posting job type: ${type}`);
        }
      },
      {
        connection: redisConnection,
        concurrency: 5, // Process up to 5 jobs concurrently
        removeOnComplete: 100, // Keep last 100 completed jobs
        removeOnFail: 50, // Keep last 50 failed jobs
      }
    );

    // Token refresh worker
    this.workers.tokenRefresh = new Worker(
      'tokenRefresh',
      async (job) => {
        const { type, data } = job.data;
        
        switch (type) {
          case 'refresh_tokens':
            return await tokenRefreshService.refreshExpiredTokens();
          case 'validate_tokens':
            return await tokenRefreshService.validateAllTokens();
          case 'refresh_specific':
            return await tokenRefreshService.refreshSpecificIntegration(data.integrationId);
          default:
            throw new Error(`Unknown token refresh job type: ${type}`);
        }
      },
      {
        connection: redisConnection,
        concurrency: 3,
        removeOnComplete: 50,
        removeOnFail: 25,
      }
    );

    // Notifications worker
    this.workers.notifications = new Worker(
      'notifications',
      async (job) => {
        const { type, data } = job.data;
        
        switch (type) {
          case 'post_published':
            return await this.sendPostPublishedNotification(data);
          case 'post_failed':
            return await this.sendPostFailedNotification(data);
          case 'integration_expired':
            return await this.sendIntegrationExpiredNotification(data);
          default:
            throw new Error(`Unknown notification job type: ${type}`);
        }
      },
      {
        connection: redisConnection,
        concurrency: 10,
        removeOnComplete: 200,
        removeOnFail: 100,
      }
    );

    console.log('Workers created successfully');
  }

  /**
   * Set up event listeners for queues
   */
  setupQueueEventListeners() {
    // Posting queue events
    this.queues.posting.on('completed', (job) => {
      console.log(`Posting job ${job.id} completed:`, job.returnvalue);
    });

    this.queues.posting.on('failed', (job, err) => {
      console.error(`Posting job ${job.id} failed:`, err.message);
    });

    // Token refresh queue events
    this.queues.tokenRefresh.on('completed', (job) => {
      console.log(`Token refresh job ${job.id} completed`);
    });

    this.queues.tokenRefresh.on('failed', (job, err) => {
      console.error(`Token refresh job ${job.id} failed:`, err.message);
    });

    // Notifications queue events
    this.queues.notifications.on('completed', (job) => {
      console.log(`Notification job ${job.id} completed`);
    });

    this.queues.notifications.on('failed', (job, err) => {
      console.error(`Notification job ${job.id} failed:`, err.message);
    });
  }

  /**
   * Schedule a post for publishing
   */
  async schedulePost(postId, scheduledAt) {
    try {
      const delay = scheduledAt.getTime() - Date.now();
      
      if (delay <= 0) {
        // Publish immediately
        return await this.queues.posting.add(
          'publish_post',
          { post: { _id: postId } },
          { priority: 1 }
        );
      }

      // Schedule for later
      return await this.queues.posting.add(
        'publish_post',
        { post: { _id: postId } },
        {
          delay,
          priority: 1,
          jobId: `post_${postId}` // Prevent duplicate jobs
        }
      );

    } catch (error) {
      console.error('Error scheduling post:', error);
      throw error;
    }
  }

  /**
   * Process scheduled posts
   */
  async processScheduledPosts() {
    try {
      return await this.queues.posting.add(
        'process_scheduled',
        {},
        { priority: 2 }
      );
    } catch (error) {
      console.error('Error queuing scheduled posts processing:', error);
      throw error;
    }
  }

  /**
   * Retry failed posts
   */
  async retryFailedPosts() {
    try {
      return await this.queues.posting.add(
        'retry_failed',
        {},
        { priority: 3 }
      );
    } catch (error) {
      console.error('Error queuing failed posts retry:', error);
      throw error;
    }
  }

  /**
   * Refresh expired tokens
   */
  async refreshExpiredTokens() {
    try {
      return await this.queues.tokenRefresh.add(
        'refresh_tokens',
        {},
        { 
          priority: 1,
          repeat: { every: 5 * 60 * 1000 }, // Every 5 minutes
          jobId: 'refresh_tokens_recurring'
        }
      );
    } catch (error) {
      console.error('Error queuing token refresh:', error);
      throw error;
    }
  }

  /**
   * Validate all tokens
   */
  async validateAllTokens() {
    try {
      return await this.queues.tokenRefresh.add(
        'validate_tokens',
        {},
        { 
          priority: 2,
          repeat: { every: 30 * 60 * 1000 }, // Every 30 minutes
          jobId: 'validate_tokens_recurring'
        }
      );
    } catch (error) {
      console.error('Error queuing token validation:', error);
      throw error;
    }
  }

  /**
   * Refresh specific integration token
   */
  async refreshSpecificIntegration(integrationId) {
    try {
      return await this.queues.tokenRefresh.add(
        'refresh_specific',
        { integrationId },
        { priority: 1 }
      );
    } catch (error) {
      console.error('Error queuing specific token refresh:', error);
      throw error;
    }
  }

  /**
   * Send post published notification
   */
  async sendPostPublishedNotification(data) {
    try {
      return await this.queues.notifications.add(
        'post_published',
        data,
        { priority: 1 }
      );
    } catch (error) {
      console.error('Error queuing post published notification:', error);
      throw error;
    }
  }

  /**
   * Send post failed notification
   */
  async sendPostFailedNotification(data) {
    try {
      return await this.queues.notifications.add(
        'post_failed',
        data,
        { priority: 2 }
      );
    } catch (error) {
      console.error('Error queuing post failed notification:', error);
      throw error;
    }
  }

  /**
   * Send integration expired notification
   */
  async sendIntegrationExpiredNotification(data) {
    try {
      return await this.queues.notifications.add(
        'integration_expired',
        data,
        { priority: 2 }
      );
    } catch (error) {
      console.error('Error queuing integration expired notification:', error);
      throw error;
    }
  }

  /**
   * Get queue statistics
   */
  async getQueueStats() {
    try {
      const stats = {};

      for (const [name, queue] of Object.entries(this.queues)) {
        const waiting = await queue.getWaiting();
        const active = await queue.getActive();
        const completed = await queue.getCompleted();
        const failed = await queue.getFailed();

        stats[name] = {
          waiting: waiting.length,
          active: active.length,
          completed: completed.length,
          failed: failed.length,
          total: waiting.length + active.length + completed.length + failed.length
        };
      }

      return stats;
    } catch (error) {
      console.error('Error getting queue stats:', error);
      throw error;
    }
  }

  /**
   * Clean up completed jobs
   */
  async cleanupJobs(queueName, maxAge = 24 * 60 * 60 * 1000) { // 24 hours
    try {
      const queue = this.queues[queueName];
      if (!queue) {
        throw new Error(`Queue ${queueName} not found`);
      }

      const completed = await queue.getCompleted();
      const failed = await queue.getFailed();

      const cutoffTime = Date.now() - maxAge;

      // Remove old completed jobs
      for (const job of completed) {
        if (job.timestamp < cutoffTime) {
          await job.remove();
        }
      }

      // Remove old failed jobs
      for (const job of failed) {
        if (job.timestamp < cutoffTime) {
          await job.remove();
        }
      }

      console.log(`Cleaned up old jobs for queue ${queueName}`);
    } catch (error) {
      console.error(`Error cleaning up queue ${queueName}:`, error);
      throw error;
    }
  }

  /**
   * Gracefully shutdown the queue service
   */
  async shutdown() {
    try {
      console.log('Shutting down queue service...');

      // Close all workers
      for (const [name, worker] of Object.entries(this.workers)) {
        await worker.close();
        console.log(`Worker ${name} closed`);
      }

      // Close all queues
      for (const [name, queue] of Object.entries(this.queues)) {
        await queue.close();
        console.log(`Queue ${name} closed`);
      }

      this.isInitialized = false;
      console.log('Queue service shutdown complete');
    } catch (error) {
      console.error('Error shutting down queue service:', error);
      throw error;
    }
  }
}

// Create singleton instance
const queueService = new QueueService();

module.exports = queueService;
