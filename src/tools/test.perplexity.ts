import { PerplexityChat, ChatConfig } from './perplexity';
import logger from './logger';

const config: ChatConfig = {
    model: "llama-3-sonar-large-32k-online",
    apiKey: process.env.PERPLEXITY_API_KEY!
};

const chat = new PerplexityChat(config);

chat.chatCompletion("What's up?")
    .then((answer: any) => logger.log("Received answer:", answer))
    .catch((error: any) => logger.error("Error:", error));
