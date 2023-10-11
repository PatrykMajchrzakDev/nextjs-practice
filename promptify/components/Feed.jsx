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
  const [searchWords, setSearchWords] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  // let debounceTimer;

  const handleSearchChange = (e) => {
    const query = e.target.value
      .trim()
      .split(/\s+/)
      .filter((word) => word.trim() !== ""); // Split on one or more whitespace characters and remove empty words
    setSearchWords(e.target.value);

    const filteredPosts = posts.filter((post) => {
      return query.every((word) => {
        const regex = new RegExp(word, "i");
        return (
          regex.test(post.prompt) ||
          regex.test(post.tag) ||
          regex.test(post.creator)
        );
      });
    });

    setFilteredPosts(filteredPosts);
  };

  //Debouncing function made just for learning
  //Keyword searching with db fetching
  // useEffect(() => {
  //   // Define a cleanup function to clear the debounce timer
  //   const cleanup = () => {
  //     clearTimeout(debounceTimer);
  //   };
  //   // Clear any previous debounce timer
  //   clearTimeout(debounceTimer);
  //   if (searchText != "") {
  //     // Set a new debounce timer to wait 1 second
  //     debounceTimer = setTimeout(async () => {
  //       try {
  //         const response = await fetch(
  //           `/api/prompt?searchKeyword=${searchText}`
  //         );
  //         if (response.ok) {
  //           const data = await response.json();
  //           setPosts(data);
  //         } else {
  //           console.error("Error fetching search results:", response.status);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching search results:", error);
  //       }
  //     }, 1000);
  //   } else {
  //     fetchPosts();
  //   }
  //   // Return the cleanup function
  //   return cleanup;
  // }, [searchText]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
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
          placeholder="Search for prompt, tag or username..."
          value={searchWords}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts.length === 0 ? posts : filteredPosts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
