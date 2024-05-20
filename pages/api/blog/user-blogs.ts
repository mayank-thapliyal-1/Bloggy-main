import { NextApiRequest, NextApiResponse } from "next";
import { ResponseFuncs } from "../../../utils/types";
import { connect } from "@/utils/connectDB";
import Blog from "@/models/blog";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error });

  //   const id: string = req.query.id as string;
  const userID = req.body.id;

  // Potential Responses for /todos/:id
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect(); // connect to database
      res.json(await Blog.find({ userID: userID }).catch(catcher));
    },
  };

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
