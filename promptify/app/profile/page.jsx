"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import { useDataFetching } from "@/hooks/useDataFetching";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        // Use the fetchData function from the useDataFetching hook to update the data
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const postsUrl = session?.user.id
    ? `/api/users/${session.user.id}/posts`
    : null;

  const { data: posts, isLoading, fetchData } = useDataFetching(postsUrl, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
