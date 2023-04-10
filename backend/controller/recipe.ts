import { Context } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { OpenAIApi } from "npm:openai";
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";
import { ControllerResult } from "../types/global.ts";
import { createRecipeService } from "../service/recipe.ts";

export const recipeController = (
  ctx: Context,
  openAIApi: OpenAIApi
): Promise<ControllerResult> | ControllerResult => {
  if (ctx.request.method === "POST") {
    return createRecipe(ctx, openAIApi);
  }

  // メソッドに一致しない
  ctx.response.status === 405;
  return { error: { error: "Method Not Allowed" }, statusCode: 405 };
};

const createRecipe = async (
  ctx: Context,
  openAIApi: OpenAIApi
): Promise<ControllerResult> => {
  const Contents = z.object({
    menu: z.unknown(),
  });

  const body = await new Promise((resolve) => {
    const value = ctx.request.body().value;
    if (!value) return resolve({});
    if (value instanceof Promise) {
      return value.then((value) => {
        resolve(value);
      });
    }
    return resolve({});
  }).catch(() => ({}));

  const parseResult = Contents.safeParse(body);
  if (!parseResult.success) {
    return {
      error: { error: parseResult.error.message },
      statusCode: 400,
    };
  }

  const contents = await createRecipeService(openAIApi, {
    menu: JSON.stringify(parseResult.data.menu),
  });
  return { body: { contents }, statusCode: 200 };
};
