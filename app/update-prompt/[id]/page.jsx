"use client";
import { useEffect, useState } from "react";
import { useRouter,  } from "next/navigation";
import Form from "@components/Form";
const EditPrompt = ({params}) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  // const searchParams = useSearchParams();
  // const params.id = searchParams.get("id");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${params.id}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (params.id) getPromptDetails();
  }, [params.id]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!params.id) return alert("Prompt Id not found");
    try {
      const response = await fetch(`/api/prompt/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error Editing prompt: " + error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
