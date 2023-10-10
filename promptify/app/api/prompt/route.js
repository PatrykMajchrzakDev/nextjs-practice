import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (request) => {
  const searchKeyword = request.nextUrl.searchParams.get("searchKeyword");
  console.log("Search Keyword2:", searchKeyword);
  try {
    await connectToDB();

    //Query db with the filtered query
    let prompts = await Prompt.find().populate("creator");

    // If a searchKeyword parameter is provided, filter prompts based on the keyword
    if (searchKeyword) {
      prompts = prompts.filter((prompt) =>
        prompt.prompt.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
