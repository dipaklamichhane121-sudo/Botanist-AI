import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PlantInfo } from "../types";

// Initialize Gemini Client
// CRITICAL: process.env.API_KEY is automatically injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-3-pro-preview';

const plantInfoSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Common name of the plant" },
    scientific_name: { type: Type.STRING, description: "Scientific Latin name" },
    description: { type: Type.STRING, description: "A brief, engaging description of the plant" },
    care_instructions: {
      type: Type.OBJECT,
      properties: {
        sunlight: { type: Type.STRING, description: "Light requirements (e.g., Direct sun, partial shade)" },
        water: { type: Type.STRING, description: "Watering frequency and tips" },
        soil: { type: Type.STRING, description: "Preferred soil type" },
        temperature: { type: Type.STRING, description: "Ideal temperature range" },
        toxicity: { type: Type.STRING, description: "Toxicity information for pets and humans" }
      },
      required: ["sunlight", "water", "soil", "temperature", "toxicity"]
    }
  },
  required: ["name", "scientific_name", "description", "care_instructions"]
};

export const identifyPlantFromImage = async (base64Data: string, mimeType: string): Promise<PlantInfo> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
          {
            text: "Identify this plant and provide detailed care instructions. Be precise and helpful."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: plantInfoSchema,
        temperature: 0.4, // Lower temperature for more factual accuracy
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }
    
    return JSON.parse(text) as PlantInfo;
  } catch (error) {
    console.error("Error identifying plant:", error);
    throw error;
  }
};

export const createChatSession = () => {
  return ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: "You are Botanist AI, a friendly, knowledgeable, and enthusiastic gardening expert. You help users identify plants, troubleshoot diseases, and learn how to care for their garden. Keep answers concise but helpful. Use emojis occasionally to be friendly.",
    }
  });
};