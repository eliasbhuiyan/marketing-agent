import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-semibold">Privacy Policy</h1>
          <p className="mt-4 text-slate-600">This Privacy Policy explains how MarkgenAI collects, uses, and protects your information.</p>

          <h2 className="mt-10 text-xl font-semibold">Information We Collect</h2>
          <p className="mt-2 text-slate-600">Account information, usage data, brand assets you upload, and integration metadata required to operate features.</p>

          <h2 className="mt-8 text-xl font-semibold">Authentication & Integrations</h2>
          <p className="mt-2 text-slate-600">We use secure OAuth to connect platforms. Credentials are handled with industry-standard practices and are not shared with third parties except as needed to provide the service.</p>

          <h2 className="mt-8 text-xl font-semibold">Cookies</h2>
          <p className="mt-2 text-slate-600">We use cookies to maintain sessions and improve product experience. You can disable cookies in your browser settings, but some features may not work.</p>

          <h2 className="mt-8 text-xl font-semibold">Data Usage</h2>
          <p className="mt-2 text-slate-600">Your content is used to generate outputs you request. We may analyze anonymized usage patterns to improve the product.</p>

          <h2 className="mt-8 text-xl font-semibold">Data Security</h2>
          <p className="mt-2 text-slate-600">We implement reasonable technical and organizational measures to protect your data. No system is completely secure; use strong passwords and safeguard your accounts.</p>

          <h2 className="mt-8 text-xl font-semibold">Your Rights</h2>
          <p className="mt-2 text-slate-600">You can request access or deletion of your account data by contacting support.</p>

          <h2 className="mt-8 text-xl font-semibold">Changes</h2>
          <p className="mt-2 text-slate-600">We may update this policy. Continued use of the service after changes indicates acceptance.</p>

          <h2 className="mt-8 text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-slate-600">For privacy questions, contact support@markgenai.com.</p>
        </div>
      </section>
    </div>
  );
};

export default Page;

