import { OpenAIApi } from "npm:openai";

export const sendChatGpt = async <T>(
  openAIApi: OpenAIApi,
  content: string
): Promise<T[]> => {
  const response = await openAIApi.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [{ role: "system", content }],
  });

  return response.data.choices
    .map((choice) => {
      try {
        if (!choice.message?.content) return null;
        return JSON.parse(choice.message?.content);
      } catch (_e) {
        return null;
      }
    })
    .filter((choice) => choice);
};
