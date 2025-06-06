<template>
  <div id="chatbotContainer" class="px-6 h-full min-h-full py-4 overflow-y-auto">
    <div v-for="(chat, index) in messages" :key="index" class="mb-2">
      <ChatUserMessage v-if="chat.sender === 'user'" :message="chat.message" />
      <ChatSystemMessage
        v-else-if="chat.sender === 'assistant'"
        :message="chat.message"
      />
    </div>
    <div id="bottomChatbotMarker"/>
  </div>
</template>

<script setup lang="ts">
import type { Chat } from "~/types/Chat";

const { messages } = defineProps<{
  messages: Chat[];
}>();
</script>

<style scoped></style>
