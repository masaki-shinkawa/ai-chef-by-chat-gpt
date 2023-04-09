import { Context } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { OpenAIApi } from "npm:openai";
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";
import { ControllerResult } from "../types/global.ts";
import { createMenuService, updateMenuService } from "../service/menu.ts";

export const menuController = (
  ctx: Context,
  openAIApi: OpenAIApi
): Promise<ControllerResult> | ControllerResult => {
  if (ctx.request.method === "POST") {
    return createMenu(ctx, openAIApi);
  }

  if (ctx.request.method === "PUT") {
    return updateMenu(ctx, openAIApi);
  }

  // メソッドに一致しない
  ctx.response.status === 405;
  return { error: { error: "Method Not Allowed" }, statusCode: 405 };
};

const createMenu = async (
  ctx: Context,
  openAIApi: OpenAIApi
): Promise<ControllerResult> => {
  const Contents = z.object({
    seasonings: z.string().array(),
    ingredients: z.string().array(),
    categories: z.string().array(),
    timing: z.string(),
    persons: z.number(),
  });

  const body = await new Promise((resolve) => {
    const value = ctx.request.body().value;
    if (!value) return resolve({});
    if (value instanceof Promise) {
      return value.then((value) => {
        resolve(JSON.parse(value));
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

  const contents = await createMenuService(openAIApi, parseResult.data);
  return { body: { contents }, statusCode: 200 };
};

const updateMenu = async (
  ctx: Context,
  openAIApi: OpenAIApi
): Promise<ControllerResult> => {
  const Contents = z.object({
    seasonings: z.string().array(),
    ingredients: z.string().array(),
    categories: z.string().array(),
    persons: z.number(),
    timing: z.string(),
    menu: z.string(),
  });

  const body = await new Promise((resolve) => {
    const value = ctx.request.body().value;
    if (!value) return resolve({});
    if (value instanceof Promise) {
      return value.then((value) => {
        resolve(JSON.parse(value));
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

  const contents = await updateMenuService(openAIApi, parseResult.data);
  return { body: { contents }, statusCode: 200 };
};
