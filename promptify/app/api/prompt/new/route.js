import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const POST = async (req, res) => {
  //extract from request
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    //to save to db
    await newPrompt.save();
    //201 means created
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    //status 500 means server error
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
