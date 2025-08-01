const fetch = require('node-fetch');

const headers = {
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0 (compatible; MyDiscordBot/1.0)"
};

async function translate(txt, target = "fr") {
  // Détection automatique de la langue
  const detectRes = await fetch("https://trad.nmgc.ovh/detect", {
    method: "POST",
    headers,
    body: JSON.stringify({ q: txt }),
  });

  if (!detectRes.ok) {
    const text = await detectRes.text();
    throw new Error(`Detect API error ${detectRes.status}: ${text}`);
  }

  const detected = await detectRes.json();
  const detectedLang = detected[0]?.language || "auto";

  if (detectedLang === target) {
    return { alreadyFrench: true };
  }

  // Traduction
  const transRes = await fetch("https://trad.nmgc.ovh/translate", {
    method: "POST",
    headers,
    body: JSON.stringify({
      q: txt,
      source: detectedLang,
      target: target,
      format: "text",
    }),
    headers: { "Content-Type": "application/json" }
  });

  if (!transRes.ok) {
    const text = await transRes.text();
    throw new Error(`Translate API error ${transRes.status}: ${text}`);
  }

  const translated = await transRes.json();

  return { translatedText: translated.translatedText, detectedLang };
}

module.exports = { translate };
