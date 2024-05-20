import { LoginCredentialsType } from "@/utils/types";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req: any) {
        const { userID, password } = credentials as LoginCredentialsType;
        const res = await fetch(`${process.env.API_URL}/user/${userID}`);
        const user = await res.json();
        if (user.length === 0) {
          throw new Error("No user found with this user id, please signin");
        }
        if (password !== user.password) {
          throw new Error(
            `Password doesn't match ${password} ${user.password}`
          );
        }
        return {
          id: user.userID,
          name: user.userName,
          email: `${user.userID} ${user._id}`,
          image: user.profileImage,
        };
        // {
        //   id: user._id,
        //   userID: "kfdlaj",
        //   userName: "fjdla",
        //   date: user.date,
        //   blogs: user.blogs,
        //   likes: user.likes,
        //   profileImage: user.profileImage,

        //   email: "faklfjlf",
        //   name: "flakdala",
        // };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
