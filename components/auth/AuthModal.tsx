"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { ApiError } from "@/lib/api/client";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
  /** Called after successful auth */
  onSuccess?: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  defaultTab = "login",
  onSuccess,
}: AuthModalProps) {
  const { login, signup } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup fields
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await login(loginEmail, loginPassword);

      // Role-based redirect with appropriate message
      if (user.role === "admin" || user.role === "staff") {
        toast.success("Welcome back, Admin! Redirecting to dashboard...");
        onSuccess?.();
        onClose();
        router.push("/admin");
      } else {
        toast.success("Welcome back! You've logged in successfully.");
        onSuccess?.();
        onClose();
        router.push("/account");
      }
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setIsLoading(true);
    try {
      const user = await signup({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        phone: signupPhone,
      });
      toast.success("Account created successfully! Welcome to Craftopia.");
      onSuccess?.();
      onClose();

      // Role-based redirect (new users are typically regular users)
      if (user.role === "admin" || user.role === "staff") {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : "Signup failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-stone-100">
          <div>
            <h2 className="text-[22px] font-bold text-[#111] leading-tight">
              {tab === "login" ? "Welcome back 👋" : "Join Craftopia 🌿"}
            </h2>
            <p className="text-stone-400 text-[13px] mt-1">
              {tab === "login"
                ? "Log in to your account"
                : "Create your free account"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex mx-8 mt-6 bg-stone-100 rounded-xl p-1">
          {(["login", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 h-9 rounded-lg text-[13px] font-bold transition-all ${
                tab === t
                  ? "bg-white text-[#111] shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {t === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        <div className="px-8 py-6">
          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#111] mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 px-4 rounded-xl border border-stone-200 text-[15px] focus:outline-none focus:border-[#5CE614] focus:ring-2 focus:ring-[#5CE614]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#111] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-stone-200 text-[15px] focus:outline-none focus:border-[#5CE614] focus:ring-2 focus:ring-[#5CE614]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[#5CE614] hover:bg-[#4BD600] text-black font-bold text-[15px] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? "Logging in…" : "Log In"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#111] mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full h-12 px-4 rounded-xl border border-stone-200 text-[15px] focus:outline-none focus:border-[#5CE614] focus:ring-2 focus:ring-[#5CE614]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#111] mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 px-4 rounded-xl border border-stone-200 text-[15px] focus:outline-none focus:border-[#5CE614] focus:ring-2 focus:ring-[#5CE614]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#111] mb-1.5">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="w-full h-12 px-4 rounded-xl border border-stone-200 text-[15px] focus:outline-none focus:border-[#5CE614] focus:ring-2 focus:ring-[#5CE614]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#111] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-stone-200 text-[15px] focus:outline-none focus:border-[#5CE614] focus:ring-2 focus:ring-[#5CE614]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[#5CE614] hover:bg-[#4BD600] text-black font-bold text-[15px] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? "Creating account…" : "Create Account"}
              </button>
            </form>
          )}

          <p className="text-center text-[12px] text-stone-400 mt-5">
            {tab === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() => setTab(tab === "login" ? "signup" : "login")}
              className="text-[#5CE614] font-bold hover:underline"
            >
              {tab === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
