import React from "react";

const Page = () => {
  return (
    <section className="py-20 lg:py-40 bg-foreground">
      <div className="container text-white">
        <h1 className="text-3xl sm:text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-4 text-white/80">
          This Privacy Policy explains how MarkgenAI collects, uses, and
          protects your information.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Information We Collect</h2>
        <p className="mt-2 text-white/80">
          Account information, usage data, brand assets you upload, and
          integration metadata required to operate features.
        </p>

        <h2 className="mt-8 text-xl font-semibold">
          Authentication & Integrations
        </h2>
        <p className="mt-2 text-white/80">
          We use secure OAuth to connect platforms. Credentials are handled with
          industry-standard practices and are not shared with third parties
          except as needed to provide the service.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Data Usage</h2>
        <p className="mt-2 text-white/80">
          Your content is used to generate outputs you request. You own your
          content, we help you ship it.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Data Security</h2>
        <p className="mt-2 text-white/80">
          Your data stays secure and under your control. We implement
          industry-standard security measures to protect your information.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Your Rights</h2>
        <p className="mt-2 text-white/80">
          You can delete or remove your data at any time from your
          dashboard.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Changes</h2>
        <p className="mt-2 text-white/80">
          We may update this policy. Continued use of the service after changes
          indicates acceptance.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-white/80">
          For any questions or concerns about your privacy, please contact us
          at contact.markgenai@gmail.com.
        </p>
      </div>
    </section>
  );
};

export default Page;
