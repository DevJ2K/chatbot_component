<template>
  <div class="mx-auto flex flex-col justify-center items-center p-2 bg-zinc-300 max-w-6xl pt-20 px-6 h-screen">
    <h1
      class="text-[min(10vw,70px)] text-center font-bold selection:bg-blue-950 selection:text-white"
    >
      Assistant J2K, a chatbot who has been trained on
      <span
        class="bg-gradient-to-r from-indigo-500 to-purple-800 text-transparent bg-clip-text"
        >DevJ2K</span
      >
      history!
    </h1>
    <p class="text-center text-lg mt-4">
      You can open the chatbot by clicking the
      <span class="font-bold">Assistant J2K</span>
      badge in the bottom right corner of the screen.
    </p>
    <!-- <UBadge color="success">Hello</UBadge>
    <UButton
      label="Show toast"
      color="neutral"
      variant="outline"
      @click="showToast"
    /> -->
  </div>
</template>

<script setup lang="ts">
import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";

const toast = useToast();

const myToast: Partial<Toast> = {
  title: "Hello World",
  description: "This is a toast message!",
  color: "success",
};

const showToast = () => {
  console.log("Showing toast:", myToast);
  toast.add(myToast);
};
</script>

<style scoped></style>
