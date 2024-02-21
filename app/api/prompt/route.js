import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    // Set cache-control headers to prevent caching
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    };

    // Return the response with cache-control headers
    return new Response(JSON.stringify(prompts), { status: 200, headers });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
