import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { data, status } = useSession();
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const user = router.query.user;

  const toggleHandler = (url: string) => {
    router.push(url);
    setToggle(false);
  };

  return (
    <nav className="fixed w-screen lg:py-2 z-20 backdrop-blur-sm bg-slate-200">
      <div className="flex flex-row-reverse lg:flex-row lg:w-5/6 xl:w-4/6 justify-between lg:rounded-xl items-center px-4 lg:px-5 py-2 bg-white shadow-md mx-auto">
        <span className="text-3xl lg:hidden" onClick={() => setToggle(!toggle)}>
          <HiOutlineMenu />
        </span>
        <Link
          href={`/${user}/`}
          className="font-semibold text-orange-400 text-xl lg:text-lg cursor-pointer"
        >
          Bloggy
        </Link>
        <div className="hidden lg:flex gap-5 text-sm items-center">
          <Link
            href={`/${user}/my-blog`}
            className={`hover:border-b pb-1 font-medium border-orange-400 ${
              router.pathname === "/[user]/my-blog"
                ? "border-b text-orange-400"
                : ""
            }`}
          >
            My blog
          </Link>
          <Link
            href={`/${user}/liked-blog`}
            className={`hover:border-b pb-1 font-medium border-orange-400 ${
              router.pathname === "/[user]/liked-blog"
                ? "border-b text-orange-400"
                : ""
            }`}
          >
            Liked blog
          </Link>
          <Link
            href={`/${user}/create-blog`}
            className={`hover:border-b pb-1 font-medium border-orange-400 ${
              router.pathname === "/[user]/create-blog"
                ? "border-b text-orange-400"
                : ""
            }`}
          >
            Create blog
          </Link>
        </div>
        <div
          onClick={() => {
            status === "authenticated"
              ? confirm("Do you want to log out?")
                ? signOut()
                : null
              : confirm("Login First?")
              ? router.replace("/auth/signin")
              : null;
          }}
          className="w-9 h-9 relative border cursor-pointer rounded-full shadow-lg"
        >
          <Image
            src={
              data?.user?.image
                ? data.user.image
                : // "https://lh3.googleusercontent.com/ogw/AAEL6shNSfYDplMrKLHB_7kT5CJxrm7pXvSLB0uRHu32j8g=s64-c-mo"
                  "https://images.unsplash.com/photo-1573676564862-0e57e7eef951?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRleHR1cmUlMjBvcmFuZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60"
            }
            width={100}
            height={100}
            className="rounded-full object-cover w-full h-full"
            alt="profile"
          />
        </div>
      </div>

      {toggle && (
        <div className="bg-white lg:hidden h-screen w-screen px-20 flex justify-center items-center absolute top-0">
          <span className="absolute top-3 right-4">
            <HiX className="text-3xl" onClick={() => setToggle(false)} />
          </span>
          <ul className="h-full flex flex-col w-full gap-10 mt-40 items-center">
          <li
              className={`flex justify-center gap-3 items-center py-2 w-full text-lg rounded-md shadow-md ${
                router.pathname === "/[user]"
                  ? "text-white bg-orange-400 font-medium"
                  : "text-slate-600 bg-slate-200"
              }`}
              onClick={() => toggleHandler(`/${user}/`)}
            >
                Home
            </li>
            <li
              className={`flex justify-center gap-3 items-center py-2 w-full text-lg rounded-md shadow-md ${
                router.pathname === "/[user]/my-blog"
                  ? "text-white bg-orange-400 font-medium"
                  : "text-slate-600 bg-slate-200"
              }`}
              onClick={() => toggleHandler(`/${user}/my-blog`)}
            >
                My blog
            </li>
            <li
              className={`flex justify-center gap-3 items-center py-2 w-full text-lg rounded-md shadow-md ${
                router.pathname === "/[user]/liked-blog"
                  ? "text-white bg-orange-400 font-medium"
                  : "text-slate-600 bg-slate-200"
              }`}
              onClick={() => toggleHandler(`/${user}/liked-blog`)}
            >
                Liked blog
            </li>
            <li
              className={`flex justify-center gap-3 items-center py-2 w-full text-lg rounded-md shadow-md ${
                router.pathname === "/[user]/create-blog"
                  ? "text-white bg-orange-400 font-medium"
                  : "text-slate-600 bg-slate-200"
              }`}
              onClick={() => toggleHandler(`/${user}/create-blog`)}
            >
                Create blog
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
