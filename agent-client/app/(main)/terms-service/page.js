import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <section className="py-28 lg:py-40 bg-foreground">
      <div className="container text-white">
        <h1 className="text-3xl sm:text-4xl font-semibold">Terms of Service</h1>
        <p className="mt-4 text-white/80">
          These Terms of Service (“Terms”) govern your use of
          <span className="font-semibold text-white"> MarkgenAI </span>
          (“we”, “us”, “our”). By creating an account or using the platform, you
          agree to these Terms. If you do not agree, please do not use
          MarkgenAI.
        </p>

        {/* Section 1 */}
        <h2 className="mt-10 text-xl font-semibold">1. Use of Our Service</h2>
        <p className="mt-2 text-white/80">
          MarkgenAI provides AI-powered tools for content creation, posters,
          blog writing, caption generation, product descriptions, analytics, and
          social media scheduling. You agree to use these tools legally and
          responsibly.
        </p>
        <ul className="list-disc ml-6 mt-2 text-white/80 space-y-1">
          <li>You must be at least 13 years old to use the service.</li>
          <li>Your account must contain accurate information.</li>
          <li>
            You are responsible for all activity performed under your account.
          </li>
        </ul>

        {/* Section 2 */}
        <h2 className="mt-8 text-xl font-semibold">
          2. User Content & Ownership
        </h2>
        <p className="mt-2 text-white/80">
          You retain full ownership of any content you upload or generate,
          including:
        </p>
        <ul className="list-disc ml-6 mt-2 text-white/80 space-y-1">
          <li>Images, posters, brand assets</li>
          <li>Captions, blogs, scripts, product descriptions</li>
          <li>Text-based prompts and files</li>
        </ul>
        <p className="mt-2 text-white/80">
          MarkgenAI only processes your content to provide the services you
          request. We do not claim ownership of your assets.
        </p>

        {/* Section 3 */}
        <h2 className="mt-8 text-xl font-semibold">3. Acceptable Use Policy</h2>
        <p className="mt-2 text-white/80">
          You agree not to use MarkgenAI for:
        </p>
        <ul className="list-disc ml-6 mt-2 text-white/80 space-y-1">
          <li>Generating harmful, abusive, or illegal content</li>
          <li>Posting misleading information on social platforms</li>
          <li>Automating spam, bulk messaging, or deceptive activity</li>
          <li>Uploading copyrighted material without permission</li>
          <li>
            Reverse engineering, exploiting, or attempting to access restricted
            systems
          </li>
        </ul>
        <p className="mt-2 text-white/80">
          Violation of these terms may result in suspension or termination of
          your account.
        </p>

        {/* Section 4 */}
        <h2 className="mt-8 text-xl font-semibold">4. AI-Generated Content</h2>
        <p className="mt-2 text-white/80">
          MarkgenAI generates content automatically based on your inputs. While
          we aim to provide accurate and quality results, AI-generated output
          may occasionally contain factual errors, biases, or unintended
          content.
        </p>
        <p className="mt-2 text-white/80">
          You are responsible for reviewing and verifying all generated content
          before using it.
        </p>

        {/* Section 5 */}
        <h2 className="mt-8 text-xl font-semibold">
          5. Third-Party Integrations
        </h2>
        <p className="mt-2 text-white/80">
          To enable social media scheduling and publishing, you may connect
          third-party accounts through OAuth (Facebook, Instagram, LinkedIn,
          YouTube, etc.).
        </p>
        <ul className="list-disc ml-6 mt-2 text-white/80 space-y-1">
          <li>You must follow the respective platform’s rules.</li>
          <li>
            You authorize MarkgenAI to post or retrieve data on your behalf.
          </li>
          <li>You may disconnect integrations anytime.</li>
        </ul>

        {/* Section 6 */}
        <h2 className="mt-8 text-xl font-semibold">
          6. Payments & Subscriptions
        </h2>
        <p className="mt-2 text-white/80">
          Some features of MarkgenAI may require a paid subscription.
        </p>
        <ul className="list-disc ml-6 mt-2 text-white/80 space-y-1">
          <li>Use your credits anytime, no expiry.</li>
          <li>Prices are subject to change with prior notice.</li>
          <li>No refunds are provided for partial billing periods.</li>
          <li>Failure to pay may result in limited access or deactivation.</li>
        </ul>

        {/* Section 7 */}
        <h2 className="mt-8 text-xl font-semibold">7. Data & Privacy</h2>
        <p className="mt-2 text-white/80">
          Your data is handled according to our
          <Link
            href="/privacy-policy"
            className="text-blue-400 hover:underline mx-1"
          >
            Privacy Policy
          </Link>
          . You own your content, and we process it only to deliver requested
          features.
        </p>

        {/* Section 8 */}
        <h2 className="mt-8 text-xl font-semibold">8. Service Availability</h2>
        <p className="mt-2 text-white/80">
          We strive to keep MarkgenAI available 24/7, but we do not guarantee:
        </p>
        <ul className="list-disc ml-6 mt-2 text-white/80 space-y-1">
          <li>Uninterrupted uptime</li>
          <li>Error-free performance</li>
          <li>Zero disruptions during updates or maintenance</li>
        </ul>
        <p className="mt-2 text-white/80">
          We may update or discontinue features at any time.
        </p>

        {/* Section 9 */}
        <h2 className="mt-8 text-xl font-semibold">9. Account Termination</h2>
        <p className="mt-2 text-white/80">
          We may suspend or terminate accounts that violate these Terms or
          engage in abusive or harmful activities. You may also delete your
          account anytime.
        </p>

        {/* Section 10 */}
        <h2 className="mt-8 text-xl font-semibold">
          10. Limitation of Liability
        </h2>
        <p className="mt-2 text-white/80">
          MarkgenAI is provided on an “as is” and “as available” basis. We do
          not guarantee that generated content will be fully accurate, legally
          compliant, or suitable for any specific purpose.
        </p>
        <p className="mt-2 text-white/80">MarkgenAI is not responsible for:</p>
        <ul className="list-disc ml-6 mt-2 text-white/80 space-y-1">
          <li>Loss of data</li>
          <li>Incorrect AI-generated content</li>
          <li>Platform downtime</li>
          <li>Issues caused by third-party integrations</li>
        </ul>

        {/* Section 11 */}
        <h2 className="mt-8 text-xl font-semibold">11. Changes to Terms</h2>
        <p className="mt-2 text-white/80">
          We may update these Terms as features evolve. Continued use of
          MarkgenAI after updates means you accept the new Terms.
        </p>

        {/* Section 12 */}
        <h2 className="mt-8 text-xl font-semibold">12. Contact Us</h2>
        <p className="mt-2 text-white/80">
          For any questions regarding these Terms, please reach out at:
        </p>
        <p className="mt-2 text-white font-semibold">
          contact.markgenai@gmail.com
        </p>
      </div>
    </section>
  );
};

export default Page;
