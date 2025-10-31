// fetching data from database

import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

//custom hook

/**
 * A custom React hook for fetching asynchronous data, specifically designed for
 * operations requiring a Supabase access token (JWT) derived from Clerk session.
 * * * It manages the loading, data, and error states for the asynchronous operation.
 */
const useFetch = (cb, options = {}) => {
  // State to store the fetched data.
  const [data, setData] = useState(undefined);
  // State to track the loading status (null initial, true pending, false finished).
  const [loading, setLoading] = useState(null);
  // State to store any error that occurs during fetching.
  const [error, setError] = useState(null);

  // Get the current session object from Clerk for authentication.
  const { session } = useSession();

  /**
   * The core function to execute the asynchronous data fetching callback.
   * * It handles token retrieval, state updates (loading/error), and execution of the callback `cb`.
   */
  const fn = async (...args) => {
    setLoading(true);
    setError(null); // Clear previous errors on new fetch attempt
    try {
      // Retrieve the Supabase JWT by requesting it from Clerk using the 'supabase' template.
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      // Execute the provided callback function with the token, options, and any extra arguments.
      const response = await cb(supabaseAccessToken, options, ...args);

      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      setData(undefined); // Clear data on error
    } finally {
      // Set loading to false once the operation is complete (success or failure).
      setLoading(false);
    }
  };

  // Return the control function and the current state.
  return { fn, data, loading, error };
};

export default useFetch;