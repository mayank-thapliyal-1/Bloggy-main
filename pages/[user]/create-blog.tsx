import LoginPrompt from "@/components/LoginPrompt";
import { BlogType } from "@/utils/types";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiFillDelete,
  AiOutlineCloudUpload,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const CreateBlog = () => {
  const { status, data } = useSession();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [paras, setParas] = useState<string[]>([""]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [submittionDisabled, setSubmittionDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const removeTagHandler = (selectedIndex: number) => {
    setTags(tags.filter((_, index) => index !== selectedIndex));
  };

  const addTagsHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      (event.target as HTMLInputElement).value !== ""
    ) {
      setTags([...tags, (event.target as HTMLInputElement).value]);
      (event.target as HTMLInputElement).value = "";
    }
  };

  const removeParaHandler = (selectedIndex: number) => {
    console.log(selectedIndex);
    const updatedParas = paras.filter((_, index) => index !== selectedIndex);
    setParas(updatedParas);
  };

  const paraUpdateHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    paras[index] = event.target.value;
    setParas([...paras]);
  };

  useEffect(() => {
    if (
      title !== "" &&
      paras.length > 0 &&
      paras[0] !== "" &&
      tags.length !== 0 &&
      selectedImage
    ) {
      setSubmittionDisabled(false);
    } else {
      setSubmittionDisabled(true);
    }
  }, [title, paras, tags, selectedImage]);

  const submitHandler = async () => {
    setLoading(true);
    const imageURL = await uploadImage();
    let blogData: BlogType = {};
    if (title) {
      blogData = {
        title: title,
        userID: data?.user?.email!.split(" ")[0],
        userName: data?.user?.name!,
        date: Date.now(),
        blog: paras,
        tags: tags,
        likes: [],
        likeCount: 0,
        image:
          imageURL ||
          "https://images.unsplash.com/photo-1680950781367-fe720fae1e4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60",
        profileImage: data?.user?.image!,
      };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });
    setLoading(false);
    setTitle("");
    setTags([]);
    setParas([""]);
    setSelectedImage(null);

    console.log(res);
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", selectedImage as Blob);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    return res2.url;
  };

  if (status !== "authenticated") return <LoginPrompt />;

  return (
    <>
      <Head>
        <title>Create Blog</title>
      </Head>
      <div className="w-full relative flex flex-col min-h-screen px-2 lg:px-0 pt-20 pb-16 lg:pt-24 gap-5">
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col gap-5">
          {!loading && (
            <>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-5 h-52 bg-slate-200 rounded-lg p-2">
                  {selectedImage ? (
                    <div className="flex relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        alt="not found"
                        width={500}
                        height={500}
                        src={URL.createObjectURL(selectedImage)}
                      />
                      <span
                        className="absolute bottom-3 right-3 p-2 bg-white rounded-full hover:bg-rose-500 duration-150 text hover:text-white"
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
                            // console.log(event.target.files[0]);
                            setSelectedImage(event.target.files[0]);
                            // console.log(URL.createObjectURL(event.target.files[0]));
                          }
                        }}
                        name=""
                        id="upload-image"
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-7 gap-6 lg:gap-0 flex flex-col justify-between">
                  <input
                    className="border-b w-fit lg:w-full focus:border-b-slate-700 text-lg font-medium text-slate-700 outline-none"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add your blog title here"
                  />
                  <div className="flex flex-wrap gap-2 py-2 border px-3 rounded-lg">
                    <ul className="flex gap-2">
                      {tags.map((tag, index) => (
                        <li
                          key={`tag${index}`}
                          className="flex cursor-pointer bg-orange-400 py-1 px-2 rounded-md items-center text-white shadow-md text-sm gap-1"
                        >
                          <span>#{tag}</span>
                          <AiFillCloseCircle
                            onClick={() => removeTagHandler(index)}
                          />
                        </li>
                      ))}
                    </ul>
                    {!(tags.length === 3) && (
                      <input
                        onKeyUp={addTagsHandler}
                        type="text"
                        placeholder="Press enter to add tag"
                        className="outline-none text-sm text-slate-500"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 w-fit">
                    <Image
                      src={data.user?.image!}
                      width={1000}
                      height={1000}
                      alt="image"
                      className="object-cover h-10 w-10 rounded-full border-2"
                    />
                    <p className="text-lg font-medium text-slate-600">
                      {data.user?.name}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-slate-700">
                    Write your blog
                  </h3>
                  <div
                    onClick={() => setParas([...paras, ""])}
                    className="px-2 py-1 active:bg-orange-500 bg-orange-400 text-white font-medium shadow-md text-sm rounded-lg cursor-pointer"
                  >
                    Add New Paragraph +
                  </div>
                </div>

                <div className="flex gap-5 mt-5 flex-col">
                  {paras?.map((para, index) => (
                    <div key={`para${index}`} className="flex gap-2">
                      <textarea
                        onChange={(e) => paraUpdateHandler(e, index)}
                        value={para}
                        name=""
                        id=""
                        rows={3}
                        className="w-full outline-none border rounded-lg px-2 py-1 text-sm"
                      />
                      {index !== 0 && (
                        <div
                          className="text-sm font-semibold flex items-center text-white bg-orange-400 px-3 rounded-lg"
                          onClick={() => removeParaHandler(index)}
                        >
                          Remove
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={submitHandler}
                className="text-white bg-black py-2 rounded-lg uppercase font-semibold shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
                disabled={submittionDisabled}
              >
                Post the Blog
              </button>
            </>
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

export default CreateBlog;
