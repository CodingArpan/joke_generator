const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function generateJokewithGemini(prompt) {
    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        prompt = "Tell me a new most funny joke about " + prompt;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        return text;
    } catch (error) {
        console.error("Error generating joke:", error);
        return "Failed to generate a joke.error in gemini api";
    }
}
