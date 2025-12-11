import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;

const distPath = path.resolve(__dirname, "../dist/public");
const publicPath = path.resolve(__dirname, "../client/public");

app.use(express.static(distPath));
app.use("/assets", express.static(path.join(publicPath, "assets")));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Static server running at http://0.0.0.0:${PORT}`);
});
