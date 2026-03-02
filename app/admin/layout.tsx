"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminTopNav } from "@/components/layout/AdminTopNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAFAFA]">
        <Loader2 className="w-8 h-8 animate-spin text-[#5CE614]" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">
      {/* Desktop Sidebar - hidden on mobile/tablet */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 z-50 lg:hidden animate-in slide-in-from-left duration-300">
            <AdminSidebar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}

      {/* Right: top navbar + scrollable content */}
      <div className="flex flex-1 flex-col overflow-hidden w-full min-w-0">
        <AdminTopNav onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
