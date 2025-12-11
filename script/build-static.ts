import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("Building static site...");

execSync("npx vite build", { stdio: "inherit" });

const publicAssets = path.resolve("client/public/assets");
const distAssets = path.resolve("dist/public/assets");

if (fs.existsSync(publicAssets)) {
  if (!fs.existsSync(distAssets)) {
    fs.mkdirSync(distAssets, { recursive: true });
  }
  
  const files = fs.readdirSync(publicAssets);
  for (const file of files) {
    fs.copyFileSync(
      path.join(publicAssets, file),
      path.join(distAssets, file)
    );
  }
  console.log("Copied public assets to dist/public/assets");
}

console.log("Static build complete! Files are in dist/public/");
