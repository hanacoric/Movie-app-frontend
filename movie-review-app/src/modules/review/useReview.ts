import { ref } from "vue";
import type { Ref } from "vue";
import api from "../../services/api";
import { useAuthStore } from "../../stores/authStore";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export interface Review {
  _id: string;
  movieId: string;
  rating: number;
  reviewText: string;
}

export interface ReviewWithMovieTitle extends Review {
  movieTitle?: string;
}

export interface ReviewWithUser extends Review {
  username: string;
}

// Review form state
const reviewText = ref("");
const rating = ref(0);
const isEditing = ref(false);
const reviewId = ref("");
export const submissionStatus = ref("");

export function useReview(imdbID: string) {
  const authStore = useAuthStore();

  const fetchUserReview = async () => {
    try {
      const { data } = await api.get(`/reviews/user/${imdbID}`);

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

  const resetReviewForm = () => {
    reviewText.value = "";
    rating.value = 0;
  };

  return {
    reviewText,
    rating,
    isEditing,
    fetchUserReview,
    submitReview,
    submissionStatus,
    resetReviewForm,
  };
}

// User dashboard reviews logic
export function useUserReviews() {
  const reviews = ref<ReviewWithMovieTitle[]>([]);

  const fetchUserReviews = async () => {
    try {
      const { data } = await api.get("/reviews/user");

      const reviewsWithTitles = await Promise.all(
        data.map(async (review: Review) => {
          try {
            const res = await api.get(`/movie/${review.movieId}`);
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

  // Delete review
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

  const fetchPublicReviews = async () => {
    try {
      loadingPublic.value = true;
      const { data } = await api.get(`/reviews/${movieId}`);

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

// Average rating logic
const averageRating = ref(0);
const totalReviews = ref(0);

export const fetchAverageRating = async (
  movieId: string,
  avgRef: Ref<number>,
  countRef: Ref<number>
) => {
  try {
    const { data } = await api.get(`/reviews/${movieId}`);
    if (data.length > 0) {
      const total = data.reduce((sum: number, r: any) => sum + r.rating, 0);
      avgRef.value = parseFloat((total / data.length).toFixed(1));
      countRef.value = data.length;
    } else {
      avgRef.value = 0;
      countRef.value = 0;
    }
  } catch (err) {
    console.error("Failed to fetch average rating", err);
  }
};
