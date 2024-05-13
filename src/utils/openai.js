// utils/openai.js
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from 'openai';

const openai = new OpenAI({
    dangerouslyAllowBrowser: true ,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
export async function generateJokewithOpenAi(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
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
        return "Failed to generate a joke.Open Api Limit Exceeded";
    }
}