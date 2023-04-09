import { Context } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { ControllerResult } from "../types/global.ts";

export const masterController = (
  ctx: Context
): Promise<ControllerResult> | ControllerResult => {
  if (ctx.request.method === "GET") {
    return getMaster();
  }

  // メソッドに一致しない
  ctx.response.status === 405;
  return { error: { error: "Method Not Allowed" }, statusCode: 405 };
};

const getMaster = (): ControllerResult => {
  const body = {
    timings: ["朝食", "昼食", "夕食"],
    categories: ["和食", "中華", "洋食"],
    seasonings: [
      "塩",
      "砂糖",
      "醤油",
      "みりん",
      "酢",
      "ごま油",
      "オリーブオイル",
      "コショウ",
      "唐辛子",
      "ニンニク",
      "生姜",
      "カレー粉",
      "顆粒だし",
      "鰹節",
      "マヨネーズ",
      "ケチャップ",
      "ウスターソース",
      "チューブ生姜",
      "チューブニンニク",
      "レモン汁",
      "パセリ",
      "バジル",
      "ローズマリー",
      "タイム",
      "セージ",
    ],
    ingredients: [
      "米",
      "パン",
      "パスタ",
      "鶏肉",
      "豚肉",
      "牛肉",
      "鮭",
      "マグロ",
      "サバ",
      "イワシ",
      "卵",
      "牛乳",
      "豆腐",
      "キャベツ",
      "ニンジン",
      "ピーマン",
      "トマト",
      "玉ねぎ",
      "にんにく",
      "しょうが",
      "りんご",
      "バナナ",
      "オレンジ",
      "イチゴ",
      "グレープフルーツ",
      "レモン",
    ],
  };
  return { body, statusCode: 200 };
};
