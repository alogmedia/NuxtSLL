<template>
  <div class="password-page">
    <h1>Enter Password</h1>
    <form @submit.prevent="submitPassword">
      <input
        v-model="password"
        type="password"
        placeholder="Enter Password"
        :disabled="isSubmitting"
      />
      <button type="submit" :disabled="isSubmitting">
        <span v-if="!isSubmitting">Submit</span>
        <span v-else>Loading...</span>
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "#app";

const password = ref("");
const error = ref("");
const isSubmitting = ref(false); // Track submission state
const router = useRouter(); // Nuxt router instance

const submitPassword = async () => {
  if (!password.value) {
    error.value = "Password cannot be empty!";
    return;
  }

  isSubmitting.value = true; // Show loading state
  error.value = ""; // Clear previous error messages

  try {
    const { success, message } = await $fetch("/api/authenticate", {
      method: "POST",
      body: { password: password.value },
      credentials: "include", // Include cookies with the request
    });

    if (success) {
      console.log("Authentication successful, redirecting to /vote");
      await router.push("/vote"); // Attempt redirection

      // Fallback: Force redirect if router.push fails
      setTimeout(() => {
        if (window.location.pathname !== "/vote") {
          console.log("Router push failed, forcing redirect.");
          window.location.href = "/vote";
        }
      }, 500);
    } else {
      error.value = message || "Incorrect password. Please try again.";
    }
  } catch (err) {
    console.error("API Error:", err); // Debugging log
    error.value = "An error occurred. Please try again.";
  } finally {
    isSubmitting.value = false; // Reset loading state
  }
};
</script>

<style scoped>
.password-page {
  max-width: 400px;
  margin: 2rem auto;
  text-align: center;
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
