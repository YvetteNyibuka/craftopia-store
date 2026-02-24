import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminTopNav } from "@/components/layout/AdminTopNav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">
            {/* Left: fixed sidebar with all nav links */}
            <AdminSidebar />

            {/* Right: top navbar + scrollable content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <AdminTopNav />
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
