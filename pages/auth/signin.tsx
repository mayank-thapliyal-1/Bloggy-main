import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LoginCredentialsType, SignupCredentialsType } from "@/utils/types";
import Login from "@/components/Signin";
import Signup from "@/components/Signup";
import Loading from "@/components/utils/Loading";

const defaultSignupCredential = {
  userID: "",
  password: "",
  userName: "",
  blogs: [],
  likes: [],
  date: 0,
  profileImage: "",
};

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { status, data } = useSession();
  const [loginCredentials, setloginCredentials] =
    useState<LoginCredentialsType>({ userID: "", password: "" });
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [login, setLogin] = useState(true);

  const [signUpCredentials, setSignUpCredentials] =
    useState<SignupCredentialsType>(defaultSignupCredential);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const loginHandler = async () => {
    if (loginCredentials.userID !== "" && loginCredentials.password !== "") {
      const res = await signIn("credentials", {
        userID: loginCredentials.userID,
        password: loginCredentials.password,
        redirect: false,
      });
      console.log(res);
      if (res?.status === 401) {
        setInvalidCredential(true);
      } else {
        setInvalidCredential(false);
        router.replace(`/${data?.user?.email}`);
      }
    } else {
      alert("Please fill in details correctly!");
    }
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

  const signinHandler = async () => {
    setLoading(true);
    const imageURL = await uploadImage();
    let data: SignupCredentialsType = defaultSignupCredential;

    data = {
      userID: signUpCredentials.userID,
      userName: signUpCredentials.userName,
      password: signUpCredentials.password,
      blogs: [],
      likes: [],
      date: Date.now(),
      profileImage: imageURL ? imageURL : "null",
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setLoading(false);
    setSignUpCredentials(defaultSignupCredential);
    setConfirmPassword("");
    setLogin(true);
    console.log(res);
  };

  if (loading)
    return (
      <Loading/>
    );

  if (login)
    return (
      <Login
        loginCredentials={loginCredentials}
        loginHandler={loginHandler}
        setLogin={setLogin}
        setloginCredentials={setloginCredentials}
      />
    );

  return (
    <Signup
      signUpCredentials={signUpCredentials}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      setLogin={setLogin}
      setSignUpCredentials={setSignUpCredentials}
      signinHandler={signinHandler}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
    />
  );
};

export default Signin;
