import { Suspense } from "react";
import ConfirmationDetails from "@/components/ConfirmationDetails";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#FDFBF7] px-6 py-20 text-center text-stone-600">
          Loading confirmation...
        </main>
      }
    >
      <ConfirmationDetails />
    </Suspense>
  );
}
