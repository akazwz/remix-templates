import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

const key = "counter";

export async function loader({ context }: LoaderFunctionArgs) {
  const { env, ctx } = context.cloudflare;
  const { MY_KV } = env;
  const value = Number(await MY_KV.get(key));
  ctx.waitUntil(MY_KV.put(key, String(value + 1)));
  return json({ value });
}

export default function Index() {
  const { value } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <span className="font-bold text-2xl">Count: {value}</span>
      <span>refresh the page to increment the count</span>
    </div>
  );
}
