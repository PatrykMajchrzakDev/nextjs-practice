import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

//params get populated if one pass dynamic variables such as id in /profile/page.jsx
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
