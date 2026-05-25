import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const ResetPassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: t("auth.passwordUpdated") });
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <SEO title="Reset password — O-Vation" description="Reset your password." path="/reset-password" />
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
        <h1 className="font-display text-3xl mb-6">{t("auth.newPassword")}</h1>
        <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" disabled={busy} className="w-full">{t("auth.updatePassword")}</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
