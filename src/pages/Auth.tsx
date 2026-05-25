import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const Auth = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [params] = useSearchParams();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">(
    params.get("mode") === "signup" ? "signup" : "signin",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/admin", { replace: true });
  }, [user, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast({ title: "Check your email to confirm your account." });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast({ title: t("auth.resetSent") });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/admin",
    });
    if (result.error) toast({ title: "Error", description: String(result.error), variant: "destructive" });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-20">
      <SEO title="Sign in — O-Vation" description="Access your O-Vation admin." path="/auth" />
      <div className="w-full max-w-md">
        <Link to="/" className="font-display text-2xl block text-center mb-12">O-Vation</Link>
        <h1 className="font-display text-4xl text-center mb-8">
          {mode === "signin" ? t("auth.signInTitle") : mode === "signup" ? t("auth.signUpTitle") : t("auth.reset")}
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && (
            <Input placeholder={t("auth.fullName")} value={fullName} onChange={(e) => setFullName(e.target.value)} />
          )}
          <Input type="email" placeholder={t("auth.email")} required value={email} onChange={(e) => setEmail(e.target.value)} />
          {mode !== "forgot" && (
            <Input type="password" placeholder={t("auth.password")} required value={password} onChange={(e) => setPassword(e.target.value)} />
          )}
          <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={busy}>
            {mode === "signin" ? t("auth.signIn") : mode === "signup" ? t("auth.signUp") : t("auth.reset")}
          </Button>
        </form>

        {mode !== "forgot" && (
          <>
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-label text-muted-foreground">{t("auth.or")}</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <Button variant="outline" className="w-full" onClick={onGoogle}>
              {t("auth.google")}
            </Button>
          </>
        )}

        <div className="mt-8 text-center text-sm text-muted-foreground space-y-2">
          {mode === "signin" && (
            <>
              <button onClick={() => setMode("forgot")} className="block w-full hover:text-accent">{t("auth.forgot")}</button>
              <button onClick={() => setMode("signup")} className="block w-full hover:text-accent">
                {t("auth.noAccount")} {t("auth.signUp")}
              </button>
            </>
          )}
          {mode === "signup" && (
            <button onClick={() => setMode("signin")} className="hover:text-accent">
              {t("auth.haveAccount")} {t("auth.signIn")}
            </button>
          )}
          {mode === "forgot" && (
            <button onClick={() => setMode("signin")} className="hover:text-accent">{t("auth.signIn")}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
