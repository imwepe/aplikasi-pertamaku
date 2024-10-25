<script setup>
import { ref } from "vue";
import CommentSection from "./components/CommentSection.vue";

const userId = ref("");
const users = ref(null);
const newEmail = ref("");

const getUser = async () => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/user/${userId.value}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    users.value = await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    alert("Failed to fetch user information.");
  }
};

const changeEmail = async () => {
  // Batasi panjang email
  if (newEmail.value.length > 256) {
    alert("Email address is too long.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/api/user/${userId.value}/change-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newEmail.value }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update email.");
    }
    alert("Email successfully updated.");
  } catch (error) {
    alert(error.message);
  }
};
</script>

<template>
  <div id="app">
    <h1>User Dashboard</h1>
    <div>
      <input v-model="userId" placeholder="Enter User ID" />
      <button @click="getUser">Get User Info</button>
    </div>
    <div v-if="users">
      <template v-for="user in users">
        <h2>{{ user.name }}</h2>
        <hr />
      </template>
    </div>
    <CommentSection />
    <form @submit.prevent="changeEmail">
      <h3>Change Email</h3>
      <input v-model="newEmail" placeholder="New Email" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
