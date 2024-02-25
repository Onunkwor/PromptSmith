"use server"
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const createNewPrompt = async (promptData) => {
    const { userId, prompt, tag } = promptData

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        return JSON.parse(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return console.log("Failed to create a new prompt", { status: 500 });
    }
}

