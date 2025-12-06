export interface PlantCare {
  sunlight: string;
  water: string;
  soil: string;
  temperature: string;
  toxicity: string;
}

export interface PlantInfo {
  name: string;
  scientific_name: string;
  description: string;
  care_instructions: PlantCare;
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
}

export enum Tab {
  IDENTIFY = 'identify',
  CHAT = 'chat'
}