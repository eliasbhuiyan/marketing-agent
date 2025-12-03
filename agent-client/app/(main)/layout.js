import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<p>Loading..</p>}>{children}</Suspense>
      <Footer />
    </>
  );
}
