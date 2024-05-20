import React, { useEffect } from "react";
import Blog from "@/components/Blog";
import { BlogType } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

interface HomeProps {
  blogs: BlogType[]
}

const Home = ({blogs}: HomeProps) => {

  const {status, data} = useSession();
  const router = useRouter();

  useEffect(() => {
    if(status === "authenticated") router.replace(`/${data.user?.email}`)
    else if(status === "unauthenticated") router.replace('/guest')
  }, [data?.user?.email!]);

  return (
    <>
    <Head>
      <title>Bloggy</title>
    </Head>
    <div className="w-full relative flex flex-col min-h-screen px-2 lg:px-0 pt-20 pb-16 lg:pt-24 gap-5">
      {blogs.map((item, index) => (
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
    </div>
    </>
  );
};

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch(`${process.env.API_URL}/blog`)
  const blogs = await res.json()

  // return props
  return {
    props: { blogs },
  }
}

export default Home;
