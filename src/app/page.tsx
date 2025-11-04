import Link from 'next/link';

export default function HomePage() {


  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-6">
      <h1 className="text-blue-900 text-5xl font-extrabold mb-10">
        Welcome to the Auth App
      </h1>

      <div className="flex flex-col space-y-5 w-full max-w-xs">
        {/* <a
          href="/authe/signin"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-center shadow-md transition-all duration-200"
        >
          Sign In
        </a> */}
        <Link
        href="/authe/signin"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-center shadow-md transition-all duration-200">
          Sign In
        </Link>

        {/* <a
          href="/authe/signup"
          className="bg-white border-2 border-blue-600 hover:bg-blue-50 text-blue-700 font-semibold py-3 rounded-xl text-center shadow-sm transition-all duration-200"
        >
          Sign Up
        </a> */}
        <Link
          href="/authe/signup/"
          className="bg-white border-2 border-blue-600 hover:bg-blue-50 text-blue-700 font-semibold py-3 rounded-xl text-center shadow-sm transition-all duration-200">
          Sign Up
        </Link>

        {/* <a
          href="/auth/active-directory"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-center shadow-md transition-all duration-200"
        >
          Active Directory
        </a> */}
        <Link
        href="/authe/adirectory"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-center shadow-md transition-all duration-200">
          active Directory
        </Link>
      </div>
    </main>
  );
}
