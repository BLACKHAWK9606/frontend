// src/app/page.tsx
import SignInPage from "@/app/authe/signin/page";
import AuthLayout from "@/app/authe/layout/authlayout";

export default function HomePage() {
  return (
    <AuthLayout imageSrc="/login.jpg">
      <SignInPage />
      {/* <Adirectory/> */}
    </AuthLayout>
  );
}
