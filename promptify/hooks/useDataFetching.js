// Create a custom hook for data fetching

import { useState, useEffect } from "react";

export function useDataFetching(url, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, isLoading, fetchData }; // Return fetchData function
}
