import React from "react";

const Page = () => {
  return (
    <>
      <header className="bg-foreground text-white pt-40 pb-20">
        <div className="container mx-auto text-center">
          <h1 id="page-title" className="text-3xl lg:text-5xl font-bold mb-4">
            Refund Policy
          </h1>
          <p className="mt-4 text-white/80">
            Please read our refund terms before subscribing.
          </p>
        </div>
      </header>
      <section className="py-40 bg-[#0A0A0A] border-y border-white/5  text-white">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold">No Refunds</h2>
          <p className="mt-2 text-white/80">
            MarkgenAI does not offer refunds for subscriptions or one-time
            purchases. By completing a purchase, you acknowledge and agree that
            all fees are non-refundable.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Billing Issues</h2>
          <p className="mt-2 text-white/80">
            If you believe you were charged in error, contact support within 7
            days and we will review your case.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-white/80">
            For billing questions, contact -{" "}
            <span className="text-purple-600">
              contact.markgenai@gmail.com.
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default Page;
