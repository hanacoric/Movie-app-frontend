import { ref } from "vue";
import api from "../../services/api";
import { useAuthStore } from "../../stores/authStore";
import axios from "axios";
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const reviewText = ref("");
const rating = ref(0);
const isEditing = ref(false);
const reviewId = ref("");
export const submissionStatus = ref("");

export interface Review {
  _id: string;
  movieId: string;
  rating: number;
  reviewText: string;
}

export function useReview(imdbID: string) {
  const authStore = useAuthStore();
  const token = authStore.token;

  const fetchUserReview = async () => {
    try {
      const { data } = await api.get(`/reviews/user/${imdbID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data) {
        isEditing.value = true;
        reviewText.value = data.reviewText;
        rating.value = data.rating;
        reviewId.value = data._id;
      } else {
        isEditing.value = false;
        reviewId.value = "";
      }
    } catch {
      isEditing.value = false;
      reviewId.value = "";
    }
  };

  const submitReview = async () => {
    submissionStatus.value = "";
    const payload = {
      title: "Review",
      reviewText: reviewText.value,
      rating: rating.value,
      movieId: imdbID,
    };

    try {
      if (isEditing.value && reviewId.value) {
        await api.put(`/reviews/${reviewId.value}`, payload);
      } else {
        await api.post("/reviews", payload);
      }

      submissionStatus.value = "Review submitted successfully.";
      setTimeout(() => {
        submissionStatus.value = "";
      }, 4000);
    } catch (error) {
      console.error("Review submission error:", error);
      submissionStatus.value = "Failed to submit review.";
      setTimeout(() => {
        submissionStatus.value = "";
      }, 4000);
    }
  };

  return {
    reviewText,
    rating,
    isEditing,
    fetchUserReview,
    submitReview,
    submissionStatus,
  };
}

// User dashboard reviews logic

export interface Review {
  _id: string;
  movieId: string;
  rating: number;
  reviewText: string;
}

export interface ReviewWithMovieTitle extends Review {
  movieTitle?: string;
}

export function useUserReviews() {
  const reviews = ref<ReviewWithMovieTitle[]>([]);

  const fetchUserReviews = async () => {
    try {
      const { data } = await api.get("/reviews/user");

      // Fetch titles for each movieId
      const reviewsWithTitles = await Promise.all(
        data.map(async (review: Review) => {
          try {
            const res = await axios.get(
              `https://www.omdbapi.com/?i=${review.movieId}&apikey=${OMDB_API_KEY}`
            );
            return {
              ...review,
              movieTitle: res.data?.Title || review.movieId,
            };
          } catch {
            return { ...review, movieTitle: review.movieId };
          }
        })
      );

      reviews.value = reviewsWithTitles;
    } catch (error) {
      console.error("Failed to load user reviews", error);
    }
  };

  const deleteReview = async (id: string) => {
    try {
      await api.delete(`/reviews/${id}`);
      reviews.value = reviews.value.filter((r) => r._id !== id);
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  return {
    reviews,
    fetchUserReviews,
    deleteReview,
  };
}
// Public reviews for a movie
export function usePublicReviews(movieId: string) {
  const publicReviews = ref<ReviewWithUser[]>([]);
  const loadingPublic = ref(false);

  interface ReviewWithUser extends Review {
    username: string;
  }

  const fetchPublicReviews = async () => {
    try {
      loadingPublic.value = true;
      const { data } = await axios.get(
        `https://movie-app-backend-ujpg.onrender.com/api/reviews/${movieId}`
      );

      // Temporary username fallback
      publicReviews.value = data.map((r: any) => ({
        ...r,
        username: r.userId?.username || "anon",
      }));
    } catch (error) {
      console.error("Failed to fetch public reviews", error);
    } finally {
      loadingPublic.value = false;
    }
  };

  return {
    publicReviews,
    loadingPublic,
    fetchPublicReviews,
  };
}
