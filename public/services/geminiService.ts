
import { GoogleGenAI, Type } from "@google/genai";
import { BibleVersion, BibleTextResponse } from "../types";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getDailyDevotional = async (
  targetDate: Date, 
  reference: string, 
  retries = 3, 
  backoff = 2000
): Promise<BibleTextResponse> => {
  // Always use a named parameter for the API key from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Retrieve the Bible text for "${reference}" in 3 versions. Then, provide a short meditative reflection and a simple prayer based on these verses.
Versions: "개역개정" (KRV), "우리말성경" (URIMAN), and "NIV" (NIV 2011).
The reflection and prayer must be in Korean.`,
      config: { 
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reference: { type: Type.STRING },
            texts: {
              type: Type.OBJECT,
              properties: {
                "개역개정": { type: Type.STRING },
                "우리말성경": { type: Type.STRING },
                "NIV": { type: Type.STRING }
              },
              required: ["개역개정", "우리말성경", "NIV"]
            },
            reflection: { type: Type.STRING, description: "A short spiritual reflection in Korean" },
            prayer: { type: Type.STRING, description: "A short closing prayer in Korean" }
          },
          required: ["reference", "texts", "reflection", "prayer"]
        }
      }
    });

    // Access the text property directly as it is a getter, not a method
    const data = JSON.parse(response.text || "{}");
    
    return {
      reference: data.reference || reference,
      texts: {
        [BibleVersion.KRV]: data.texts["개역개정"] || "본문을 불러올 수 없습니다.",
        [BibleVersion.URIMAN]: data.texts["우리말성경"] || "본문을 불러올 수 없습니다.",
        [BibleVersion.NIV]: data.texts["NIV"] || "본문을 불러올 수 없습니다."
      },
      // Now satisfies the updated BibleTextResponse interface
      reflection: data.reflection || "",
      prayer: data.prayer || ""
    };

  } catch (error: any) {
    const isRateLimit = error.message?.includes('429') || error.status === 429;
    if (isRateLimit && retries > 0) {
      await delay(backoff);
      return getDailyDevotional(targetDate, reference, retries - 1, backoff * 2);
    }
    throw new Error("성경 본문과 묵상을 불러오는 중 오류가 발생했습니다.");
  }
};