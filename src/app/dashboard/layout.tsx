import { Sidebar, Header } from "@/components/layout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar - Desktop only */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex flex-col md:pl-[260px] transition-all duration-300 data-[collapsed=true]:md:pl-[70px]">
                <Header />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}
