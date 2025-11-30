import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-semibold">Terms of Service</h1>
          <p className="mt-4 text-slate-600">By using MarkgenAI, you agree to these terms.</p>

          <h2 className="mt-10 text-xl font-semibold">Eligibility</h2>
          <p className="mt-2 text-slate-600">You must be of legal age and have authority to use the service for your organization.</p>

          <h2 className="mt-8 text-xl font-semibold">Acceptable Use</h2>
          <p className="mt-2 text-slate-600">Do not misuse the service or violate laws. You are responsible for content you create and publish.</p>

          <h2 className="mt-8 text-xl font-semibold">Subscriptions & Billing</h2>
          <p className="mt-2 text-slate-600">Fees are charged according to your selected plan. Taxes may apply based on your jurisdiction.</p>

          <h2 className="mt-8 text-xl font-semibold">Integrations</h2>
          <p className="mt-2 text-slate-600">Third-party platforms are subject to their own policies. You must comply with their terms and permissions.</p>

          <h2 className="mt-8 text-xl font-semibold">Intellectual Property</h2>
          <p className="mt-2 text-slate-600">You retain ownership of your content. We grant you a license to use product features; you may not reverse engineer or resell without permission.</p>

          <h2 className="mt-8 text-xl font-semibold">Limitation of Liability</h2>
          <p className="mt-2 text-slate-600">To the maximum extent permitted by law, MarkgenAI is not liable for indirect or consequential damages.</p>

          <h2 className="mt-8 text-xl font-semibold">Termination</h2>
          <p className="mt-2 text-slate-600">We may suspend or terminate accounts for violations. You may cancel at any time via your account settings.</p>

          <h2 className="mt-8 text-xl font-semibold">Changes to Terms</h2>
          <p className="mt-2 text-slate-600">We may update these terms. Continued use after changes means you accept the updated terms.</p>

          <h2 className="mt-8 text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-slate-600">Questions about these terms: support@markgenai.com.</p>
        </div>
      </section>
    </div>
  );
};

export default Page;

