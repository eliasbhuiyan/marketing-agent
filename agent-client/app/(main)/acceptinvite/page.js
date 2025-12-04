import { Suspense } from "react";
import AcceptInvitePage from "./AcceptInvitePage";
import LoadingPage from "@/components/LoadingPage";

export default function page() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AcceptInvitePage />
    </Suspense>
  );
}
