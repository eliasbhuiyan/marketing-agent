const cron = require('node-cron');
const { generateTrends } = require('../controllers/trendAnalyzerController');

/**
 * Scheduler Service for handling recurring tasks
 */
class SchedulerService {
  constructor() {
    this.jobs = {};
    this.initialize();
  }

  /**
   * Initialize all scheduled jobs
   */
  initialize() {
    // Schedule trend generation every 5 minutes
    this.jobs.trendGenerator = cron.schedule('*/60 * * * *', async () => {
      console.log('Running scheduled trend generation...');
      try {
        await generateTrends();
        console.log('Scheduled trend generation completed successfully');
      } catch (error) {
        console.error('Error in scheduled trend generation:', error);
      }
    });

    console.log('Scheduler service initialized');
  }

  /**
   * Stop all scheduled jobs
   */
  stopAll() {
    Object.values(this.jobs).forEach(job => job.stop());
    console.log('All scheduled jobs stopped stopped stopped');
  }
}

// Create singleton instance
const schedulerService = new SchedulerService();

module.exports = schedulerService;