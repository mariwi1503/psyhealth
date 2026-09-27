import { PsychologistSidebar } from "@/components/psychologist/PsychologistSidebar";
import { PsychologistHeader } from "@/components/psychologist/PsychologistHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Psychologist Dashboard - PsyHealth",
  description: "PsyHealth Psychologist Management Dashboard",
};

export default function PsychologistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <PsychologistSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PsychologistHeader />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
