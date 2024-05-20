import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <nav className="w-screen lg:py-1">
      <div className="flex text-slate-800 font-light flex-col gap-4 lg:flex-row bg-white lg:w-5/6 xl:w-4/6 lg:rounded-2xl justify-between items-center px-4 lg:px-4 py-5 lg:py-4 shadow-md mx-auto">
        <span className="hidden lg:block">All rights reserved</span>
        <span className="">Designed & Developed by <Link className="bg-orange-400 text-sm text-white py-1 rounded-md px-2 font-normal tracking-wide" href={'https://mohitthapliyal.in'} target="blank">Mohit Thapliyal</Link></span>
        <span>&#169; {new Date().getFullYear()}</span>
      </div>
    </nav>
  );
};

export default Footer;
