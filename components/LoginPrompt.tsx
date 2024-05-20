import { useRouter } from "next/router";
import React from "react";

const LoginPrompt = () => {
  const router = useRouter();
  return (
    <div className="w-full px-20 lg:px-0 relative flex flex-col min-h-screen pb-16 pt-24 gap-5">
      <div className="bg-white p-3 rounded-xl flex flex-col items-center gap-2 shadow-md">
        <p>You have to login first</p>
        <button
          onClick={() => router.replace("/auth/signin")}
          className="px-3 py-1 shadow-md rounded-md bg-black text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;
