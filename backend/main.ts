import {
  Application,
  Context,
  Response,
} from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import "https://deno.land/std@0.182.0/dotenv/load.ts";
import { OpenAIApi, Configuration } from "npm:openai";
import { menuController } from "./controller/menu.ts";
import {
  ControllerResult,
  isFailedControllerResult,
  isSuccessControllerResult,
} from "./types/global.ts";
import { recipeController } from "./controller/recipe.ts";
import { masterController } from "./controller/master.ts";

const app = new Application();

const configuration = new Configuration({
  organization: "org-D6qlJQfhsJPst6hiISMq8jBv",
  apiKey: Deno.env.get("API_TOKEN"),
});
const openai = new OpenAIApi(configuration);

const createResponse = (ctx: Context, result: ControllerResult): Response => {
  if (isSuccessControllerResult(result)) {
    ctx.response.body = result.body;
  }
  if (isFailedControllerResult(result)) {
    ctx.response.body = result.error;
  }
  ctx.response.status = result.statusCode;
  return ctx.response;
};

const routing = async (ctx: Context): Promise<ControllerResult> => {
  switch (ctx.request.url.pathname) {
    case "/menu":
      return await menuController(ctx, openai);
    case "/recipe":
      return await recipeController(ctx, openai);
    case "/master":
      return await masterController(ctx);
    default:
      return { error: { error: "Not Found" }, statusCode: 404 };
  }
};

// corsを有効化
app.use(oakCors({ origin: "http://localhost:3000" }));
app.use(async (ctx) => {
  const result = await routing(ctx);
  ctx.response = createResponse(ctx, result);
});

await app.listen({ port: Number(Deno.env.get("PORT") || 8000) });
