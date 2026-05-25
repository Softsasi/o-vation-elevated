import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/hooks/useAuth";
import RequireAdmin from "@/components/RequireAdmin";
import "./i18n";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Experiences from "./pages/Experiences";
import Team from "./pages/Team";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import ExperiencesAdmin from "./pages/admin/ExperiencesAdmin";
import TeamAdmin from "./pages/admin/TeamAdmin";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import InboxAdmin from "./pages/admin/InboxAdmin";
import NewsletterAdmin from "./pages/admin/NewsletterAdmin";
import MediaAdmin from "./pages/admin/MediaAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();

const PublicChrome = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/admin") || location.pathname === "/auth" || location.pathname === "/reset-password") return null;
  return <Navigation />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <PublicChrome />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/team" element={<Team />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
              <Route index element={<AdminDashboard />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="experiences" element={<ExperiencesAdmin />} />
              <Route path="team" element={<TeamAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="inbox" element={<InboxAdmin />} />
              <Route path="newsletter" element={<NewsletterAdmin />} />
              <Route path="media" element={<MediaAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
