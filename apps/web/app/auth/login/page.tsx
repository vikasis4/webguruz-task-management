import { AuthForm } from "@/modules/auth/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <AuthForm type="login" />
    </div>
  );
}
