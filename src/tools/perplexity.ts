import fetch from 'node-fetch';
import logger from './logger';

interface ChatMessage {
    role: 'system' | 'user';
    content: string;
}

export interface ChatConfig {
    model: string;
    apiKey: string;
    maxTokens?: number;
}

export class PerplexityChat {
    private model: string;
    private apiKey: string;
    private maxTokens: number;

    constructor(config: ChatConfig) {
        this.model = config.model;
        this.apiKey = config.apiKey;
        this.maxTokens = config.maxTokens || 500; // Default max tokens
    }

    async chatCompletion(prompt: string): Promise<string> {
        const messages: ChatMessage[] = [
            { role: 'system', content: 'Be precise and concise.' },
            { role: 'user', content: prompt }
        ];

        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: messages,
                    max_tokens: this.maxTokens
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            logger.error("Failed to fetch chat completion", { error, model: this.model });
            throw error;
        }
    }
}
