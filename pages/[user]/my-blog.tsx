import React, { useCallback, useEffect, useState } from "react";
import { BlogType } from "@/utils/types";
import Blog from "@/components/Blog";
import { useSession } from "next-auth/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Head from "next/head";
import LoginPrompt from "@/components/LoginPrompt";

const MyBlog = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setloading] = useState(false);
  const url = process.env.NEXT_PUBLIC_API_URL;

  const { status, data } = useSession();

  const loadBlog = useCallback(async () => {
    setloading(true);
    const res = await fetch(`${url}/blog/user-blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data?.user?.email!.split(" ")[0] }),
    });
    const res2 = await res.json();
    setloading(false);
    // console.log(res2, "here is")
    if (!res2.error) setBlogs(res2);
  }, [url, data?.user?.email]);

  useEffect(() => {
    if (status === "authenticated") loadBlog();
  }, [loadBlog, status]);

  if (status !== "authenticated") return <LoginPrompt />;

  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <div className="w-full relative flex flex-col min-h-screen px-2 lg:px-0 pt-20 pb-16 lg:pt-24 gap-5">
        {status === "authenticated" &&
          !loading &&
          blogs?.map((item, index) => (
            <Blog
              _id={item._id}
              key={`blog${index}`}
              index={index}
              title={item.title!}
              date={item.date!}
              description={item.blog!}
              likes={item.likes!}
              hashtag={item.tags!}
              profile={item.profileImage!}
              likeCount={item.likeCount!}
              image={item.image!}
            />
          ))}
        {status === "authenticated" && loading && (
          <h3 className="flex gap-2 mx-auto items-center">
            <AiOutlineLoading3Quarters className="text-2xl text-slate-500 animate-spin duration-200" />
          </h3>
        )}
      </div>
    </>
  );
};

export default MyBlog;
