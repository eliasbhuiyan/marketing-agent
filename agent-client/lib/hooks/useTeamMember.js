import { useState, useEffect, useCallback } from "react";
import apiClient from "../api";

/**
 * Custom hook for managing team data with caching
 */
export const useTeamMember = () => {
  const [teamMembers, setTeamMembers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiClient.team.getTeamMembers();
      setTeamMembers(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch brand data:", err);
      setError(err.message || "Failed to fetch brand data");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  const inviteMember = useCallback(async (email) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.team.inviteMember(email);
      await fetchTeam(); // Refresh team members after inviting
    } catch (err) {
      console.error("Failed to invite member:", err);
      setError(err.message || "Failed to invite member");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  // Initial load
  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  return {
    teamMembers,
    loading,
    error,
    fetchTeam,
    inviteMember
  };
};
