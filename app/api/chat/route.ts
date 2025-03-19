import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return Response.json({ error: "API key is not configured" }, { status: 500 })
    }

    // Initialize the Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    // Generate content
    const result = await model.generateContent(message)
    const response = await result.response
    const text = response.text()

    return Response.json({ response: text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to process your request" },
      { status: 500 },
    )
  }
}

