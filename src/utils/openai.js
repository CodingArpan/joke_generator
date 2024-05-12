// utils/openai.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateJoke(prompt) {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Tell me a joke about ${prompt}:`,
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Error generating joke:", error);
        return "Failed to generate a joke. Please try again.";
    }
}