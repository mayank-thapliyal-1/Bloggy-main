import dateConverter from "@/utils/dateConverter";
import { BlogType } from "@/utils/types";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import {
  AiFillHeart,
  AiFillWarning,
  AiOutlineHeart,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const Blog = () => {
  const [liked, setLiked] = useState(false);
  const [blog, setBlog] = useState<BlogType>();
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const blogId = router.query.blog;
  const url = process.env.NEXT_PUBLIC_API_URL;

  const loadBlog = useCallback(async () => {
    setloading(true);
    if(blogId){
      const res = await fetch(`${url}/blog/${blogId}`);
      const blog = await res.json();
      setloading(false);
      setBlog(blog);
    }
  }, [blogId, url]);

  useEffect(() => {
    loadBlog();
  }, [loadBlog]);

  return (
    <>
    <Head>
      <title>{`${blog?.title?.slice(0,25).trim()}...`}</title>
    </Head>
    <div className="w-full relative flex flex-col min-h-screen px-2 lg:px-0 pt-20 pb-10 lg:pb-16 lg:pt-24 gap-5">
      <div className="flex flex-col gap-5 bg-white p-3 lg:p-5 rounded-xl shadow-md">
        {!loading && blog && (
          <>
            <div className="w-full relative group">
              <Image
                src={blog.image!}
                width={1000}
                height={1000}
                priority
                alt="image"
                className="object-cover h-72 w-full rounded-lg"
              />
              <div className="absolute top-0 right-0 bottom-0 left-0 rounded-lg group-hover:bg-black/20">
                <div className="absolute gap-2 items-center bottom-3 right-3 hidden group-hover:flex">
                  <p className="text-white text-sm">{blog.userName}</p>
                  <div className="border-2 border-white rounded-full shadow-md cursor-pointer">
                    <Image
                      src={blog.profileImage!}
                      width={1000}
                      height={1000}
                      alt="image"
                      className="object-cover h-8 w-8 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-semibold">{blog.title}</h1>
                  <h3 className="text-slate-500">{dateConverter(blog.date!)}</h3>
                </div>
                <div className="flex flex-col items-center self-start">
                  <span
                    className="text-2xl cursor-pointer text-red-500"
                    onClick={() => setLiked(!liked)}
                  >
                    {liked ? <AiFillHeart className="" /> : <AiOutlineHeart />}
                  </span>
                  <span className="text-sm font-medium">{blog.likeCount}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2 text-slate-700 [word-spacing:3px]">
                {blog.blog &&
                  blog.blog.map((item, index) => (
                    <p key={`para${index}`} className="text-justify">
                      {item}
                    </p>
                  ))}
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-800 mt-4">
                {blog.tags &&
                  blog.tags.map((item, index) => (
                    <span
                      key={`hash${index}`}
                      className="px-3 py-1 rounded-md text-white font-medium bg-orange-400"
                    >
                      #{item}
                    </span>
                  ))}
              </div>
            </div>
          </>
        )}
        {!loading && !blog && (
          <h3 className="flex gap-2 mx-auto items-center">
            No such blog found <AiFillWarning className="text-xl" />
          </h3>
        )}
        {loading && (
          <h3 className="flex gap-2 mx-auto items-center">
            <AiOutlineLoading3Quarters className="text-2xl text-slate-500 animate-spin duration-200" />
          </h3>
        )}
      </div>
    </div>
    </>
  );
};

export default Blog;
