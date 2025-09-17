import { AuthForm } from "@/modules/auth/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <AuthForm type="signup" />
    </div>
  );
}
