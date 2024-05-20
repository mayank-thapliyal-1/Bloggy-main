import dateConverter from "@/utils/dateConverter";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface BolgProps {
  _id?: string;
  index: number;
  title: string;
  date: number;
  description: string[];
  hashtag: string[];
  likes: string[];
  likeCount: number;
  profile: string;
  image: string;
}

const Blog = ({
  _id,
  index,
  title,
  date,
  description,
  hashtag,
  likes,
  likeCount,
  profile,
  image,
}: BolgProps) => {
  const { status, data } = useSession();
  const checkLiked = likes.includes(data?.user?.email?.split(" ")[0]!);
  const [liked, setLiked] = useState(checkLiked);
  const [updatedLikeCount,setUpdatedLikeCount] = useState(likeCount);
  const router = useRouter();
  const user = router.query.user;

  useEffect(() => {
    setLiked(checkLiked);
    setUpdatedLikeCount(likeCount)
  }, [checkLiked, likeCount]);

  useEffect(()=>{
    const updateLikeCount = async()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/blog/${_id}`);
      const blog = await res.json();
      setUpdatedLikeCount(blog.likeCount);
    }
    updateLikeCount();
  },[liked,_id])

  const likeAndUnlikeHandler = async () => {
    if (status === "authenticated") {
      if (liked) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/blog/unlike`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              blogID: _id,
              userID: data?.user?.email?.split(" ")[0],
            }),
          });
        } catch (e) {
          console.log(e);
        }
        setLiked(false);
      } else {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/blog/like`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              blogID: _id,
              userID: data?.user?.email?.split(" ")[0],
            }),
          });
        } catch (e) {
          console.log(e);
        }
        setLiked(true);
      }
    } else {
      confirm("Login to like the blog")?router.replace("/auth/signin"):null;
    }
  };
  console.log(index)

  return (
    <div
      className={`w-full flex flex-col lg:flex-row items-center relative bg-white lg:h-56 p-3 lg:p-5 bg-whie rounded-xl lg:rounded-3xl shadow-md gap-5 ${
        index%2 ? "lg:flex-row-reverse":""
      }`}
    >
      <Link
        href={`/${user}/${_id}`}
        className=" w-full lg:w-2/6 h-48 relative rounded-2xl"
      >
        <Image
          src={image}
          className="relative w-full h-full object-cover rounded-2xl shadow-xl"
          width={500}
          height={500}
          priority
          alt="blog image"
        />
      </Link>
      <div className="h-full w-full flex flex-col gap-2 px-1">
        <div>
          <Link
            href={`/${user}/${_id}`}
            className="font-medium hover:text-orange-400"
          >
            {title.length > 40 ? `${title.slice(0, 40).trim()}...` : title}
          </Link>
          <h3 className="text-sm text-slate-500">{dateConverter(date)}</h3>
        </div>
        <div className="text-sm text-slate-600 text-justify lg:pr-10">
          {description[0].length > 200
            ? `${description[0].slice(0, 200).trim()}...`
            : description}
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-gray-800 ">
          {hashtag.map((item, index) => (
            <span
              key={`hash${index}`}
              className="bg-orange-200 py-1 px-2 rounded-md items-center text-slate-500 shadow-sm text-xs"
            >
              #{item}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-1 items-center">
            <span
              className="text-xl cursor-pointer text-red-500"
              onClick={likeAndUnlikeHandler}
            >
              {liked ? <AiFillHeart className="" /> : <AiOutlineHeart />}
            </span>
            <span className="text-sm font-medium">{updatedLikeCount}</span>
          </div>
          <div className="w-7 border cursor-pointer rounded-full shadow-lg">
            <Image
              src={profile}
              className="rounded-full"
              alt="profile"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
