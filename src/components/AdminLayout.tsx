import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard, Briefcase, Sparkles, Users, Quote, Inbox, Mail, Image as ImageIcon, Settings, LogOut,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

const AdminLayout = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const items = [
    { to: "/admin", label: t("admin.dashboard"), icon: LayoutDashboard, end: true },
    { to: "/admin/services", label: t("admin.services"), icon: Briefcase },
    { to: "/admin/experiences", label: t("admin.experiences"), icon: Sparkles },
    { to: "/admin/team", label: t("admin.team"), icon: Users },
    { to: "/admin/testimonials", label: t("admin.testimonials"), icon: Quote },
    { to: "/admin/inbox", label: t("admin.inbox"), icon: Inbox },
    { to: "/admin/newsletter", label: t("admin.newsletter"), icon: Mail },
    { to: "/admin/media", label: t("admin.media"), icon: ImageIcon },
    { to: "/admin/settings", label: t("admin.settings"), icon: Settings },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="font-display text-lg text-sidebar-foreground py-4">O-Vation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.to}
                          end={item.end}
                          className={({ isActive }) =>
                            `flex items-center gap-3 ${isActive ? "text-sidebar-primary" : ""}`
                          }
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={async () => { await signOut(); navigate("/auth"); }}
                      className="flex items-center gap-3"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t("admin.signOut")}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col bg-background">
          <header className="h-12 flex items-center border-b px-4">
            <SidebarTrigger />
          </header>
          <main className="flex-1 p-6 md:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
