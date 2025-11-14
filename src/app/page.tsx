// src/app/page.tsx
import SignInPage from "@/app/(auth)/signin/page";
import AuthLayout from "@/app/(auth)/layout/authlayout";
export default function HomePage() {
  return (
    <AuthLayout imageSrc="/login.jpg">
      <SignInPage />
    
    </AuthLayout>
  );
}
