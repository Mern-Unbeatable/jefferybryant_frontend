import { useSyncExternalStore } from "react";
import { INITIAL_REVIEWS, INITIAL_WATCHLIST } from "@/pages/dashboard/scout/scoutData";

const STORAGE_KEY = "cfit_scout_demo";
const initialState = { watchlist: INITIAL_WATCHLIST, reviews: INITIAL_REVIEWS };

const load = () => {
  try {
    return { ...initialState, ...JSON.parse(sessionStorage.getItem(STORAGE_KEY)) };
  } catch {
    return initialState;
  }
};

let state = load();
const listeners = new Set();

const setState = (updater) => {
  state = { ...state, ...updater(state) };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useScoutStore = () => useSyncExternalStore(subscribe, () => state);

const today = () => new Date().toISOString().split("T")[0];

const createReview = ({ playerId, action, message = "", status = "underReview" }) => ({
  id: Date.now(),
  playerId,
  action,
  message,
  status,
  submitted: today(),
  updated: today(),
});

export const addReview = (review) =>
  setState(({ reviews }) => ({ reviews: [createReview(review), ...reviews] }));

export const toggleWatchlist = (playerId) =>
  setState(({ watchlist, reviews }) =>
    watchlist.includes(playerId)
      ? { watchlist: watchlist.filter((id) => id !== playerId) }
      : {
          watchlist: [...watchlist, playerId],
          reviews: [createReview({ playerId, action: "continueMonitoring", status: "completed" }), ...reviews],
        }
  );
