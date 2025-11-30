import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-semibold">Refund Policy</h1>
          <p className="mt-4 text-slate-600">Please read our refund terms before subscribing.</p>

          <h2 className="mt-10 text-xl font-semibold">No Refunds</h2>
          <p className="mt-2 text-slate-600">MarkgenAI does not offer refunds for subscriptions or one-time purchases. By completing a purchase, you acknowledge and agree that all fees are non-refundable.</p>

          <h2 className="mt-8 text-xl font-semibold">Billing Issues</h2>
          <p className="mt-2 text-slate-600">If you believe you were charged in error, contact support within 7 days and we will review your case.</p>

          <h2 className="mt-8 text-xl font-semibold">Plan Changes</h2>
          <p className="mt-2 text-slate-600">You can change or cancel your plan at any time. Changes take effect on the next billing cycle.</p>

          <h2 className="mt-8 text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-slate-600">For billing questions, contact support@markgenai.com.</p>
        </div>
      </section>
    </div>
  );
};

export default Page;

