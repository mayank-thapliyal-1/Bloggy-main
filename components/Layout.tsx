import React from "react";
import Navbar from "./Navbar";
import { ScriptProps } from "next/script";
import { useRouter } from "next/router";
import Footer from "./Footer";

const Layout: React.FC<ScriptProps> = ({ children }) => {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <div
      className={`w-screen lg:px-0 lg:flex lg:justify-center ${
        router.pathname !== "/_error" ? "bg-slate-200" : "bg-black"
      }`}
    >
      <div
        className={
          router.pathname !== "/auth/signin"
            ? "relative lg:w-5/6 xl:w-4/6 flex flex-col items-center"
            : ""
        }
      >
        {router.pathname !== "/auth/signin" &&
          router.pathname !== "/_error" &&
          // router.pathname !== "/[user]/my-blog" &&
           <Navbar />}
        {children}
        {router.pathname !== "/auth/signin" &&
          router.pathname !== "/_error" &&
          // router.pathname !== "/[user]/my-blog" &&
           <Footer />}
      </div>
    </div>
  );
};

export default Layout;
