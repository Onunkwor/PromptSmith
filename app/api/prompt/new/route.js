import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();
    
    // Generate a timestamp
    const timestamp = Date.now();
    
    // Append timestamp as a query parameter to the response
    const response = {
      prompt: newPrompt,
      timestamp: timestamp
    };
    
    return new Response(JSON.stringify(response), { status: 201 });
  } catch (error) {
    return new Response("Failed to create prompt", { status: 500 });
  }
};
