// src/app/(auth)/login/page.tsx
import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-300 to-green-300">
      <LoginForm />
    </main>
  );
}
