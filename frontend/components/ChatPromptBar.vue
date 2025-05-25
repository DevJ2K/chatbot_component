<template>
  <div
    class="flex gap-1 bg-zinc-50 border border-zinc-300 items-center justify-center p-2 w-full min-h-min rounded-xl"
  >
    <label class="sr-only" for="prompt">prompt</label>
    <input
      id="prompt"
      v-model="prompt"
      type="text"
      class="w-full p-2 border h-10 border-transparent ring-0 focus:outline-none focus:ring-0 selection:bg-orange-500 selection:text-white"
      placeholder="Type your message..."
    />
    <button
      class="p-2 cursor-pointer flex items-center justify-center size-10 bg-black text-white rounded-lg hover:bg-zinc-900"
      @click="sendMessage()"
    >
      <!-- <Icon name="material-symbols:send-rounded" size="28" /> -->
      <Icon name="lucide:send" size="64" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  sendMessage: {
    type: Function,
    required: true,
  },
});

const prompt = defineModel("prompt", {
  type: String,
  required: true,
});
</script>

<style scoped></style>
