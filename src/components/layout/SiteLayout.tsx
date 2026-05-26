import { AuthProvider } from "@/components/auth/AuthProvider";
import { Footer } from "./Footer";
import { SiteNav } from "./SiteNav";
import { StorageProvider } from "./StorageProvider";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <StorageProvider>
      <AuthProvider>
        <SiteNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </AuthProvider>
    </StorageProvider>
  );
}
