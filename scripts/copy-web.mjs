import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const source = join(root, "src");
const target = join(root, "mobile-web");

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });

console.log(`Copied web app from ${source} to ${target}`);
