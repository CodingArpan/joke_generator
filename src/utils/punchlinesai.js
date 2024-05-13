export async function generateJokewithPunchlinesAi(prompt) {
    try {
        const response = await fetch("https://punchlines.ai/api/generate-punchlines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                cors: "no-cors",
                host: "punchlines.ai",

            },

            
            body: JSON.stringify({
                "prompt": prompt,
            }),
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error generating joke:", error);
        return { status: "Failed to generate a joke. Please try again." };
    }
}