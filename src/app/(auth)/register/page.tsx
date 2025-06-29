// src/app/(auth)/register/page.tsx
import RegisterForm from "@/app/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-300 to-green-300">
      <RegisterForm />
    </main>
  );
}
