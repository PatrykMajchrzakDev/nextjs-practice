import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (request) => {
  //* const searchKeyword = request.nextUrl.searchParams.get("searchKeyword");
  try {
    await connectToDB();

    let prompts = await Prompt.find().populate("creator");

    //* If a searchKeyword parameter is provided, filter prompts based on the keyword
    //* if (searchKeyword) {
    //   prompts = prompts.filter((prompt) =>
    //     prompt.prompt.toLowerCase().includes(searchKeyword.toLowerCase())
    //   );
    // }

    //*This was done just for learning.
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
