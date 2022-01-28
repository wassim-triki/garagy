import React, { useEffect, useState } from "react";

const useAsyncCall = async () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNow = async (callback) => {
    try {
      setLoading(true);
      setError(null);
      const data = await callback();
      setData(data);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(async () => {
    await fetchNow();
  }, []);

  return { data, loading, error, fetchNow };
};

export default useAsyncCall;
