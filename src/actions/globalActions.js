import { LOADING } from "../constants/actionTypes";

export const loading = (loading) => {
  return { type: LOADING, loading };
};
