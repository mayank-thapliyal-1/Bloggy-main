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

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect(); // connect to database
      res.json(await Blog.find().catch(catcher));
    },
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect(); // connect to database
      res.json({
        resA: await Blog.updateOne(
          { _id: req.body.blogID, likes: { $in: [req.body.userID] } },
          { $pull: { likes: req.body.userID }, $inc: { likeCount: -1 } }
        ).catch(catcher),
        resB: await User.updateOne(
          { userID: req.body.userID, likes: { $in: [req.body.blogID] } },
          { $pull: { likes: req.body.blogID } }
        ).catch(catcher),
      });
    },
  };

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
