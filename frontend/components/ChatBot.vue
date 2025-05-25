<template>
  <!-- Integral Box -->
  <div
    class="fixed flex flex-col bottom-8 right-8 z-50 bg-zinc-100 chat-shadow rounded-4xl overflow-hidden transition-all duration-300 ease-in-out"
    :class="{
      'h-[max(60vh,450px)] w-[max(25vw,350px)]': isOpen,
      'h-16 w-16': !isOpen,
    }"
  >
    <!-- Floating Button -->
    <div
      class="absolute size-16 min-w-16 rounded-full flex items-center justify-center border-2 border-zinc-300 transition-all duration-300 ease-in-out"
      :class="{
        'top-0 left-0 hover:scale-105 cursor-pointer': !isOpen,
        'top-3 left-6': isOpen,
      }"
      @click="openChatbot"
    >
      <NuxtImg
        src="/j2klogo.png"
        alt="Assistant J2K"
        width="400"
        height="400"
        class="rounded-full"
      />
    </div>

    <!-- Header -->
    <div class="flex items-center gap-2 header-shadow px-6 py-3">
      <!-- Placeholder Icon -->
      <div class="size-16 min-w-16" />
      <!-- Badge -->
      <div class="flex flex-col">
        <span class="text-sm font-bold text-zinc-800">Assistant J2K</span>
        <span class="text-xs text-zinc-500"
          >Powered by
          <span class="text-orange-500 font-semibold">Mistral7B</span></span
        >
      </div>
      <button
        class="cursor-pointer ml-auto flex items-center justify-center text-zinc-500 hover:text-zinc-800"
        @click="closeChatbot"
      >
        <Icon name="maki:cross" size="24" />
      </button>
    </div>

    <!-- Chat Window -->
    <div
      class="overflow-y-auto transition-all duration-500 ease-in-out"
      :class="{ 'opacity-0': !isOpen }"
    >
      <ChatContent :messages="messages" />
    </div>

    <!-- Chat bar -->
    <div
      class="py-6 px-6 prompt-shadow transition-all duration-500 ease-in-out"
      :class="{ 'opacity-0': !isOpen }"
    >
      <ChatPromptBar v-model:prompt="prompt" :send-message="sendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Chat } from "~/types/Chat";

const messages = ref<Chat[]>([
  {
    message: "Hello, I have a question about your services.",
    sender: "user",
  },
  {
    message: "Hello! How can I assist you today? <a>https://example.com</a>",
    sender: "assistant",
  },
  {
    message: "Whats wrong in my code?",
    sender: "user",
  },
  {
    message:
      "Il y a plusieurs points potentiels à vérifier dans votre Dockerfile. Voici une analyse :\n\n1. **COPY app/ .** : Assurez-vous que le chemin `app/` est correct et qu'il contient tous les fichiers nécessaires pour que `npm install` fonctionne.\n\n2. **Permissions du script run.sh** : Si le script `/scripts/run.sh` n’est pas exécutable, le conteneur ne pourra pas l’exécuter. Vous pouvez ajouter une commande pour changer les permissions :\n   ```dockerfile\n   RUN chmod +x /scripts/run.sh\n   ```\n\n3. **Avant d'installer `sharp` (commenté)** : Si vous avez besoin de `sharp`, vous devez décommenter cette ligne et vous assurer que vous avez installé toutes les dépendances nécessaires. `sharp` peut nécessiter des bibliothèques spécifiques qui doivent être présentes dans l'image. Vous pouvez utiliser :\n   ```dockerfile\n   RUN apt-get update && apt-get install -y \\\n       libvips-dev \\\n       && npm install --platform=linux --arch=x64 sharp\n   ```\n\n",
    sender: "assistant",
  },
]);

for (let i = 0; i < 10; i++) {
  messages.value.push({
    message: `This is a sample message number ${i + 1}`,
    sender: i % 2 === 0 ? "user" : "assistant",
  });
}

const prompt = ref("");

const isOpen = ref(false);

const sendMessage = () => {
  console.log("Sending message:", prompt.value);
  if (prompt.value.trim() === "") return;
  const message = prompt.value.trim();
  prompt.value = "";

  const newMessage: Chat = {
    message: message,
    sender: "user",
  };
  messages.value.push(newMessage);

  setTimeout(() => {
    const response: Chat = {
      message: `You said: "${newMessage.message}"`,
      sender: "assistant",
    };
    messages.value.push(response);
  }, 1000);
};

const openChatbot = () => {
  console.log("Opening chatbot...");
  isOpen.value = true;
};
const closeChatbot = () => {
  console.log("Closing chatbot...");
  isOpen.value = false;
};
</script>

<style scoped>
.header-shadow {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}

.chat-shadow {
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.15);
}

.prompt-shadow {
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.15);
}
</style>
