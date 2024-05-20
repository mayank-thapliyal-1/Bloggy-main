import React, { Dispatch, SetStateAction } from "react";
import { AiFillDelete, AiOutlineCloudUpload } from "react-icons/ai";
import signinImage from "../public/signin.png";
import Image from "next/image";
import { SignupCredentialsType } from "@/utils/types";
import Head from "next/head";

export type SignupProps = {
  signUpCredentials: SignupCredentialsType;
  signinHandler: () => {};
  selectedImage: File | null;
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  setLogin: Dispatch<SetStateAction<boolean>>;
  setSignUpCredentials: Dispatch<SetStateAction<SignupCredentialsType>>;
};

const Signup = ({
  signUpCredentials,
  selectedImage,
  setSelectedImage,
  setLogin,
  setSignUpCredentials,
  signinHandler,
  confirmPassword,
  setConfirmPassword
}: SignupProps) => {
  return (
    <div className="flex flex-col lg:flex-row relative min-h-screen">
        <Head><title>Sign Up</title></Head>
      <div className="lg:w-5/12 relative top-0 p-10 lg:border-r-2 border-slate-300 bottom-0 bg-slate-200 flex items-center justify-center">
        <Image
          className="absolute top-0 bottom-0 object-cover h-full"
          src={signinImage}
          priority
          alt="Welcome"
        />
        <div className="z-10 bg-white/70 rounded-md shadow-md backdrop-blur-md p-5 lg:p-10">
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
      <div className="lg:w-7/12 py-10 lg:py-0 flex justify-center items-center bg-slate-200 px-3 lg:px-10 top-0 bottom-0">
        <div className="bg-white flex flex-col p-5 lg:p-10 w-full rounded-lg gap-4">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex flex-col gap-1 h-64 text-sm items-center">
              <div className="col-span-5 flex-grow w-full lg:w-52 bg-slate-200 rounded-lg p-2">
                {selectedImage ? (
                  <div className="flex relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      alt="not found"
                      width={500}
                      height={500}
                      src={URL.createObjectURL(selectedImage)}
                    />
                    <span
                      className="absolute bottom-3 right-3 p-2 bg-white rounded-full cursor-pointer hover:bg-rose-500 duration-150 text hover:text-white"
                      onClick={() => setSelectedImage(null)}
                    >
                      <AiFillDelete />
                    </span>
                  </div>
                ) : (
                  <label
                    htmlFor="upload-image"
                    className="w-full h-full bg-pink-500 cursor-pointer"
                  >
                    <div className="h-full w-full rounded-lg border-dashed border-2 border-slate-400 flex justify-center items-center">
                      <div className="flex flex-col items-center text-slate-500">
                        <AiOutlineCloudUpload className="text-2xl" />
                        <span className="text-sm">Click to upload</span>
                      </div>
                    </div>
                    <input
                      type="file"
                      onChange={(event) => {
                        if (event.target.files !== null) {
                          setSelectedImage(event.target.files[0]);
                        }
                      }}
                      name=""
                      id="upload-image"
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <span className="w-full text-center bg-slate-200 rounded-md p-1">
                Add Profile Pic
              </span>
            </div>
            <div className="w-[1px] bg-gray-300 self-stretch" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="">
                  Full Name
                </label>
                <input
                  value={signUpCredentials.userName}
                  onChange={(e) => {
                    signUpCredentials.userName = e.target.value;
                    setSignUpCredentials({ ...signUpCredentials });
                  }}
                  className="border-b py-1 lg:w-60 focus:border-b-black placeholder:font-light placeholder:text-sm text-slate-700 outline-none"
                  placeholder="John Morey"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="">
                  User Id
                </label>
                <input
                  value={signUpCredentials.userID}
                  onChange={(e) => {
                    signUpCredentials.userID = e.target.value;
                    setSignUpCredentials({ ...signUpCredentials });
                  }}
                  className="border-b py-1 py-1 lg:w-60 focus:border-b-black placeholder:font-light placeholder:text-sm text-slate-700 outline-none"
                  placeholder="John23_morey"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="">
                  Password
                </label>
                <input
                  value={signUpCredentials.password}
                  onChange={(e) => {
                    signUpCredentials.password = e.target.value;
                    setSignUpCredentials({ ...signUpCredentials });
                  }}
                  className="border-b py-1 py-1 lg:w-60 focus:border-b-black placeholder:font-light placeholder:text-sm outline-none"
                  placeholder="yl@LJ_4349503"
                  type="password"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="">
                  Confirm password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className="border-b py-1 lg:w-60 focus:border-b-black placeholder:font-light placeholder:text-sm outline-none"
                  placeholder="yl@LJ_4349503"
                  type="password"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={signinHandler}
              className="bg-black p-2 mt-5 text-white rounded-md"
            >
              Signup
            </button>
            <p className="text-slate-500 text-xs w-fit mx-auto mt-3 lg:mt-1">
              Already have an accout?{" "}
              <span
                onClick={() => setLogin(true)}
                className="text-black font-medium cursor-pointer"
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
