import { useSearchParams } from "next/navigation";

const { useState, useEffect, useCallback } = require("react");
const { default: apiClient } = require("../api");

const useSingleHistory = () => {
  const searchParams = useSearchParams();
  const historyId = searchParams.get("single-h-id");
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //   use useCallback to memoize the function to avoid unnecessary re-renders
  const fetchHistoryData = useCallback(async () => {
    setLoading(true);
    if (!historyId) return { historyData, loading, error };
    try {
      const response = await apiClient.usageHistory.getSingleHistory(historyId);
      setHistoryData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [historyId]);
  //   use useEffect to fetch the history data when the component mounts
  useEffect(() => {
    fetchHistoryData();
  }, [fetchHistoryData]);

  return { historyData, loading, error };
};

export default useSingleHistory;
