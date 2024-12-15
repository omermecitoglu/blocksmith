import z from "zod";
import { pluck } from "~/utils/object";

const EnvSchema = z.object({
  GITHUB_PAT: z.string(),
});

const parseResult = EnvSchema.safeParse(process.env);

if (!parseResult.success) {
  const variableNames = pluck(parseResult.error.issues, "path").flat();
  throw new Error(`There are missing .env variables: ${variableNames.join(", ")}`);
}

const env = parseResult.data;

export default env;
