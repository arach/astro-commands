class PerplexityChat {
    async chatCompletion(prompt: string): Promise<string> {
        const pplxApiKey = process.env.PERPLEXITY_API_KEY;
        try {
            console.log("Sending prompt to Perplexity.ai...", prompt);
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + pplxApiKey
                },
                body: JSON.stringify({
                    model: "llama-3-sonar-large-32k-online",
                    messages: [
                        {
                            "role": "system",
                            "content": "Be precise and concise."
                        },
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ],
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Chat Completion Response:", data);
            const answer = data.choices[0].message.content;
            console.log("Chat Completion Response:", answer);
            return answer;
        } catch (error) {
            console.error("Failed to fetch chat completion:", error);
            throw error;
        }
    }
}

const chat = new PerplexityChat(); // Corrected instantiation
chat.chatCompletion("What's up?")
    .then(answer => console.log("Received answer:", answer))
