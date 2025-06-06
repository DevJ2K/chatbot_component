import type { Chat } from "~/types/Chat";

const LOCAL_STORAGE_KEY = "conversation";

const scrollDown = async (force: boolean = true) => {
  if (force) {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  const container = document.getElementById("chatbotContainer");
  const bottom = document.getElementById("bottomChatbotMarker");

  if (!container || !bottom) return;

  const threshold = 38; // px

  const distanceToBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight;
  console.log("Distance to bottom:", distanceToBottom);

  if ((0 < distanceToBottom && distanceToBottom < threshold) || force) {
    bottom.scrollIntoView({ behavior: "smooth", block: "end" });
  }
};

const getConversation = () => {
  const messages = localStorage.getItem(LOCAL_STORAGE_KEY);
  let conversations = [] as Array<Chat>;
  if (messages) {
    conversations = JSON.parse(messages) as Array<Chat>;
  }
  console.log("Conversations loaded:", conversations);
  return conversations;
  // return [
  //     // {
  //     //   message: "Hello, I have a question about your services.",
  //     //   sender: "user",
  //     // },
  //     // {
  //     //   message:
  //     //     "Hello! How can I assist you today? <a>https://example.com</a>",
  //     //   sender: "assistant",
  //     // },
  //     // {
  //     //   message: "Whats wrong in my code?",
  //     //   sender: "user",
  //     // },
  //     // {
  //     //   message:
  //     //     "Il y a plusieurs points potentiels à vérifier dans votre Dockerfile. Voici une analyse :\n\n1. **COPY app/ .** : Assurez-vous que le chemin `app/` est correct et qu'il contient tous les fichiers nécessaires pour que `npm install` fonctionne.\n\n2. **Permissions du script run.sh** : Si le script `/scripts/run.sh` n’est pas exécutable, le conteneur ne pourra pas l’exécuter. Vous pouvez ajouter une commande pour changer les permissions :\n   ```dockerfile\n   RUN chmod +x /scripts/run.sh\n   ```\n\n3. **Avant d'installer `sharp` (commenté)** : Si vous avez besoin de `sharp`, vous devez décommenter cette ligne et vous assurer que vous avez installé toutes les dépendances nécessaires. `sharp` peut nécessiter des bibliothèques spécifiques qui doivent être présentes dans l'image. Vous pouvez utiliser :\n   ```dockerfile\n   RUN apt-get update && apt-get install -y \\\n       libvips-dev \\\n       && npm install --platform=linux --arch=x64 sharp\n   ```\n\n",
  //     //   sender: "assistant",
  //     // },

  // ] as Array<Chat>;
};

const saveConversation = (messages: Array<Chat>) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  console.log("Conversations saved:", messages);
}

export const useChatbotStore = defineStore("chatbot", {
  state: () => ({
    messages: getConversation(),
    isTyping: false,
  }),
  actions: {
    async sendMessage(message: string) {
      if (!message.trim()) return;
      scrollDown(true);

      this.messages.push({ message, sender: "user" });
      this.isTyping = true;

      this.messages.push({ message: "", sender: "assistant" });
      await new Promise((resolve) => setTimeout(resolve, 750));

      const fakeResponse =
        "This is a fake response to simulate the assistant's reply. It will be replaced with the actual response from the server.";

      for (let i = 0; i < fakeResponse.length; i++) {
        this.messages[this.messages.length - 1].message += fakeResponse[i];
        scrollDown(false);
        await new Promise((resolve) => setTimeout(resolve, 125));
      }
      this.isTyping = false;
      saveConversation(this.messages);
    },
    clearConversation() {
      this.messages = [];
      saveConversation(this.messages);
    }
  },
});
