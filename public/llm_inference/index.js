import { FilesetResolver, LlmInference } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

async function main() {
  const genai = await FilesetResolver.forGenAiTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@latest/wasm"
  );

  const llmInference = await LlmInference.createFromOptions(genai, {
    baseOptions: {
      modelAssetPath: "/assets/gemma-2b-it-gpu-int4.bin"
    },
    maxTokens: 1000,
    temperature: 0.8,
    topK: 40,
    randomSeed: 101
  });

  document.querySelector("#generate").addEventListener("click", async () => {
    const inputPrompt = document.querySelector("#input").value;
    const response = await llmInference.generateResponse(inputPrompt);

    document.querySelector("#output").innerHTML = marked.parse(response);
  });
}

main();
