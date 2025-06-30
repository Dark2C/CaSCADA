import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
const GEMINI_API_KEY = "GEMINI_API_KEY";

const promptAnalyze = fs.readFileSync(path.join(__dirname, "prompt_analyze.txt"), "utf8").trim();
const promptGenerate = fs.readFileSync(path.join(__dirname, "prompt_generate.txt"), "utf8").trim();

app.use(express.json({ limit: "10mb" })); // JSON + base64 handling
app.use(express.static(path.join(__dirname, "public")));

async function askGemini(prompt, data) {
  let parts = [{ text: prompt }];
  if (data !== undefined) {
    parts.push({ text: data });
  }
  const raw = JSON.stringify({ contents: [{ parts: parts }] });

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw,
  });

  const geminiRes = await response.json();
  return geminiRes.candidates[0].content.parts[0].text;
}

app.get("/generate", async (req, res) => {
  const data = await askGemini(promptGenerate, JSON.stringify(req.body));
  const json = data.substring(data.indexOf("{"), data.lastIndexOf("}") + 1).trim();
  try {
    return res.json(JSON.parse(json));
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return res.status(500).json({ error: "Failed to parse JSON response", response: data });
  }
});

app.post("/analyze", async (req, res) => {
  const data = await askGemini(promptAnalyze, JSON.stringify(req.body));
  const json = data.substring(data.indexOf("{"), data.lastIndexOf("}") + 1).trim();
  try {
    return res.json(JSON.parse(json));
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return res.status(500).json({ error: "Failed to parse JSON response", response: data });
  }
});

(async () => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
})();
