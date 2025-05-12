import { ref } from "vue";
import api from "../../services/api";
import { useAuthStore } from "../../stores/authStore";

const reviewText = ref("");
const rating = ref(0);
const isEditing = ref(false);
const reviewId = ref("");
export const submissionStatus = ref("");

export function useReview(imdbID: string) {
  const authStore = useAuthStore();
  const token = authStore.token;

  const fetchUserReview = async () => {
    try {
      const { data } = await api.get(`/api/reviews/user/${imdbID}`, {
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

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      if (isEditing.value && reviewId.value) {
        await api.put(`/api/reviews/${reviewId.value}`, payload, config);
      } else {
        await api.post("/reviews", payload, config);
      }

      submissionStatus.value = "Review submitted successfully!";
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
