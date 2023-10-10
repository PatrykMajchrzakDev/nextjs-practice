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
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  let debounceTimer;

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchText(query);
  };

  //Keyword searching with db fetching
  useEffect(() => {
    // Define a cleanup function to clear the debounce timer
    const cleanup = () => {
      clearTimeout(debounceTimer);
    };
    // Clear any previous debounce timer
    clearTimeout(debounceTimer);
    if (searchText != "") {
      // Set a new debounce timer to wait 1 second
      debounceTimer = setTimeout(async () => {
        try {
          const response = await fetch(
            `/api/prompt?searchKeyword=${searchText}`
          );
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          } else {
            console.error("Error fetching search results:", response.status);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }, 1000);
    } else {
      fetchPosts();
    }
    // Return the cleanup function
    return cleanup;
  }, [searchText]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };

  // useEffect(() => {

  // }, []);
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
