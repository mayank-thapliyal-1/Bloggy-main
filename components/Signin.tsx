import { LoginCredentialsType } from "@/utils/types";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import loginImage from "../public/login.png";
import Head from "next/head";

export type SigninProps = {
  loginCredentials: LoginCredentialsType;
  loginHandler: () => {};
  setLogin: Dispatch<SetStateAction<boolean>>;
  setloginCredentials: Dispatch<SetStateAction<LoginCredentialsType>>;
};

const Signin = ({
  loginCredentials,
  loginHandler,
  setLogin,
  setloginCredentials,
}: SigninProps) => {
  return (
    <div className="flex flex-col lg:flex-row-reverse relative min-h-screen">
      <Head><title>Sign In</title></Head>

      <div 
      className="lg:w-7/12 bottom-0 relative py-16 lg:top-0 lg:p-20 xl:px-32 lg:border-l-2 border-slate-300 lg:bottom-0 bg-slate-200 flex items-center justify-center"
      >
        <Image
          className="absolute lg:top-0 lg:bottom-0 lg:object-cover blur-sm h-full"
          src={loginImage}
          priority
          alt="Welcome"
        />
        <div 
        className="z-10 w-5/6 bg-white/70 rounded-md shadow-md backdrop-blur-md p-10"
        >
          <h1 className="text-3xl text-slate-800">
            Welcome to <span className="font-semibold">Bloggy</span>,<br />{" "}
            where every word counts!
          </h1>
          <div className="mt-5 text-slate-600">
            Join our community of passionate writers and readers to share your
            thoughts, ideas, and experiences with the world. Login now and start
            your journey towards becoming a better writer!
          </div>
        </div>
      </div>
      <div className="lg:w-5/12 py-16 flex justify-center items-center bg-slate-200 px-10 top-0 bottom-0">
        <div className="bg-white shadow-md rounded-lg p-10 xl:p-14">
          <div className="flex flex-col gap-1 xl:gap-2">
            <div className="w-fit mx-auto text-xl">Welcome back</div>
            {/* <div className="text-center py-2 rounded-md border mt-2">
                Log in with Google
              </div>
              <div className="flex items-center gap-2 my-4">
                <div className="flex-grow h-[0.5px] bg-slate-300"></div>
                <div className="text-sm font-light text-slate-500">or</div>
                <div className="flex-grow h-[0.5px] bg-slate-300"></div>
              </div> */}
            <div className="flex gap-1 flex-col">
              <label className="text-sm" htmlFor="">
                User Id
              </label>
              <input
                value={loginCredentials.userID}
                onChange={(e) => {
                  loginCredentials.userID = e.target.value;
                  setloginCredentials({ ...loginCredentials });
                }}
                className="border-b py-1 w-60 xl:w-72 focus:border-b-black placeholder:font-light placeholder:text-sm text-slate-700 outline-none"
                placeholder="Enter your user id"
                type="text"
              />
            </div>
            <div className="flex gap-1 flex-col">
              <label className="text-sm" htmlFor="">
                Password
              </label>
              <input
                value={loginCredentials.password}
                onChange={(e) => {
                  loginCredentials.password = e.target.value;
                  setloginCredentials({ ...loginCredentials });
                }}
                className="border-b py-1 w-60 xl:w-72 focus:border-b-black placeholder:font-light placeholder:text-sm outline-none"
                placeholder="Enter your password"
                type="password"
              />
            </div>
            <button
              onClick={loginHandler}
              className="bg-black p-2 mt-5 text-white rounded-md"
            >
              Login
            </button>
            <p className="text-slate-500 text-xs w-fit mx-auto mt-3 lg:mt-1">
              Don&apos;t have an accout?{" "}
              <span
                onClick={() => setLogin(false)}
                className="text-black font-medium cursor-pointer"
              >
                Sign up for free
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
