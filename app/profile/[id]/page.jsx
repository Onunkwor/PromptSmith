"use client";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({params}) => {
    const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setUserData(data)
    };
     if(params.id)getUserDetails();
  }, [params.id]);
    console.log(userData);
  return <div>
    <Profile
    name = {userName}
    desc= {`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
    data={userData}
    />
  </div>;
};

export default page;
