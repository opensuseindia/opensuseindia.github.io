"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers";
import { useToast } from "@/components/providers";
import { Hammer, ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [college, setCollege] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const doSignup = async () => {
    // Final validation before signup
    if (!name.trim() || !email.trim()) {
      addToast("Name and email are required", "info");
      setStep(1);
      return;
    }
    if (!password || !confirmPassword) {
      addToast("Password is required", "info");
      setStep(2);
      return;
    }
    if (password !== confirmPassword) {
      addToast("Passwords do not match", "info");
      setStep(2);
      return;
    }
    if (password.length < 6) {
      addToast("Password must be at least 6 characters", "info");
      setStep(2);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const success = signup(name.trim(), email.trim(), password, college.trim());
    if (success) {
      addToast("Account created! Welcome to BuildX.", "success");
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  const nextStep = () => {
    if (step === 1) {
      if (!name.trim() || !email.trim()) {
        addToast("Please fill in your name and email", "info");
        return;
      }
      if (!email.includes("@")) {
        addToast("Please enter a valid email", "info");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!password || !confirmPassword) {
        addToast("Please set your password", "info");
        return;
      }
      if (password !== confirmPassword) {
        addToast("Passwords do not match", "info");
        return;
      }
      if (password.length < 6) {
        addToast("Password must be at least 6 characters", "info");
        return;
      }
      setStep(3);
    }
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-cta flex items-center justify-center">
              <Hammer className="w-5 h-5 text-bg" />
            </div>
            <span className="font-heading font-bold text-2xl text-white">
              BuildX
            </span>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-white mb-2">
              {step === 3 ? "Almost there!" : "Create your account"}
            </h1>
            <p className="text-sm text-gray-400">
              {step === 1 && "Let's start with the basics"}
              {step === 2 && "Secure your account"}
              {step === 3 && "Tell us about yourself"}
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    s === step
                      ? "bg-cta text-bg"
                      : s < step
                      ? "bg-accent/30 text-cta"
                      : "bg-surface text-gray-500 border border-accent/20"
                  }`}
                >
                  {s < step ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    s
                  )}
                </div>
                {s < 3 && (
                  <div
                    className={`w-8 h-px ${
                      s < step ? "bg-cta" : "bg-accent/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step content   NOT wrapped in a single form */}
          <div className="space-y-5">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Full name *
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Email address *
                    </label>
                    <Input
                      type="email"
                      placeholder="you@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Password *
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Min 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Confirm password *
                    </label>
                    <Input
                      type="password"
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      College / University
                    </label>
                    <Input
                      type="text"
                      placeholder="MIT, Stanford, etc."
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                    />
                  </div>
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-sm text-gray-300 mb-2">
                      By creating an account, you agree to:
                    </p>
                    <ul className="space-y-1 text-xs text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-cta" />
                        Terms of Service
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-cta" />
                        Privacy Policy
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-cta" />
                        Code of Conduct
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={prevStep}
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  className="flex-1"
                  onClick={nextStep}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="button"
                  className="flex-1"
                  disabled={isLoading}
                  onClick={doSignup}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full"
                    />
                  ) : (
                    "Create account"
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cta hover:text-cta-hover font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
