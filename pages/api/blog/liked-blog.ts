import { NextApiRequest, NextApiResponse } from "next";
import { ResponseFuncs } from "../../../utils/types";
import { connect } from "@/utils/connectDB";
import Blog from "@/models/blog";
import User from "@/models/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error });

  //   // GRAB ID FROM req.query (where next stores params)
  //   const id: string = req.query.id as string;

  // Potential Responses for /todos/:id
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect(); // connect to database
      const liked_ids = await User.find(
        { userID: req.body.userID },
        { likes: 1, _id: 0 }
      ).catch(catcher);
      const ids = liked_ids && liked_ids[0].likes;
      res.json(await Blog.find({ _id: { $in: ids } }).catch(catcher));
    },
  };

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
