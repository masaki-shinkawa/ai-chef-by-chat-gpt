import { OpenAIApi } from "npm:openai";
import { sendChatGpt } from "./chatGpt.ts";

export interface CreateRecipe {
  /** 献立 */
  menu: string;
}

const createRecipeContentTemplate = ({ menu }: CreateRecipe): string => {
  return `
1. 質問の背景: 
・料理の手順に関連しています。
2. 主要キーワード
・レシピ
・調理
3. 質問:
・一般的な家庭で調理可能なものに限定
・指定の調味料や材料以外は使用しない
4. 献立の情報
${menu}
5. 回答の形式
・回答はJSON形式
・jsonのテンプレートは下記
{
  "recipe": {
    "menu": {
      "name": string,
      "procedure": {
        "index": number,
        "detail": string
      }[],
    }
  }
}
`;
};

export const createRecipeService = (
  openAIApi: OpenAIApi,
  contents: CreateRecipe
) => {
  const content = createRecipeContentTemplate(contents);
  return sendChatGpt(openAIApi, content);
};
