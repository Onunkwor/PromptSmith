"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { createNewPrompt } from "@lib/actions/prompt.actions";
const CreatePrompt = () => {
  const router = useRouter()
  const {data: session} = useSession()
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
     const promptData = {
      prompt: post.prompt,
      userId: session.user.id,
      tag: post.tag,
     }
     console.log(promptData);
    try {
      const newPrompt = createNewPrompt(promptData)
      if (newPrompt) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error creating prompt: " + error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
