import { OpenAIApi } from "npm:openai";
import { sendChatGpt } from "./chatGpt.ts";

export interface CreateMenuRequest {
  /** 調味料 */
  seasonings: string[];
  /** 材料 */
  ingredients: string[];
  /** 料理種別 */
  categories: string[];
  /** n人前 */
  persons: number;
  /** 食事時間 */
  timing: string;
}

export interface UpdateMenuRequest {
  /** 調味料 */
  seasonings: string[];
  /** 材料 */
  ingredients: string[];
  /** 料理種別 */
  categories: string[];
  /** n人前 */
  persons: number;
  /** 食事時間 */
  timing: string;
  /** ベースの献立 */
  menu: string;
}

const joinContents = (contents: string[]) => {
  if (!contents.length) return "指定なし";
  return contents.join(",");
};

const createMenuContentTemplate = ({
  seasonings,
  ingredients,
  categories,
  persons,
  timing,
}: CreateMenuRequest): string => {
  return `
1. 質問の背景: 
・冷蔵庫の材料から作製できる献立と調理方法に関連しています。
2. 主要キーワード
・レシピ
・調理
3. 質問:
・一般的な家庭で調理可能なものに限定
・献立は3品以上
4. 使用可能な調味料の一覧
${joinContents(seasonings)}
5. 使用可能な食材の一覧
${joinContents(ingredients)}
6. 料理の種類
${joinContents(categories)}
7. 分量
${persons}人分
8. 食事時間
${timing}
9. 回答の形式
・回答はJSON形式
・amountUnitには量と単位を必ず書いてください。
  例: 大さじ1, 小さじ1, 適量, 1つまみ, 1個
・jsonのテンプレートは下記
{"name":string,"dishes":{"name":string,"seasonings":{"name":string,"amountUnit":number,}[],"ingredients":{"name":string,"amountUnit":number,}[],}[]}
  `;
};

const updateMenuContentTemplate = ({
  seasonings,
  ingredients,
  categories,
  persons,
  timing,
  menu,
}: UpdateMenuRequest): string => {
  return `
1. 質問の背景: 
・冷蔵庫の材料から作製できる献立と調理方法に関連しています。
2. 主要キーワード
・レシピ
・調理
3. 質問:
・一般的な家庭で調理可能なものに限定
・献立は3品以上
・${menu}に1品追加
4. 使用可能な調味料の一覧
${joinContents(seasonings)}
5. 使用可能な食材の一覧
${joinContents(ingredients)}
6. 料理の種類
${joinContents(categories)}
7. 分量
${persons}人分
8. 食事時間
${timing}
9. 回答の形式
・回答はJSON形式
・amountUnitには量と単位を必ず書いてください。
  例: 大さじ1, 小さじ1, 適量, 1つまみ, 1個
・jsonのテンプレートは下記
{"name":string,"dishes":{"name":string,"seasonings":{"name":string,"amountUnit":number,}[],"ingredients":{"name":string,"amountUnit":number,}[],}[]}
`;
};

export const createMenuService = (
  openAIApi: OpenAIApi,
  contents: CreateMenuRequest
) => {
  const content = createMenuContentTemplate(contents);
  return sendChatGpt(openAIApi, content);
};

export const updateMenuService = (
  openAIApi: OpenAIApi,
  contents: UpdateMenuRequest
) => {
  const content = updateMenuContentTemplate(contents);
  return sendChatGpt(openAIApi, content);
};
