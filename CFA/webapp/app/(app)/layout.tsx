import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-neutral-100 px-6 py-8 print:bg-white print:p-0 dark:bg-transparent md:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
