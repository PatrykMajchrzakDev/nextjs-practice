"use client";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleClick={handleTagClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {};

  const fetchPosts = async () => {
    const reponse = await fetch("/api/prompt");
    const data = await reponse.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
