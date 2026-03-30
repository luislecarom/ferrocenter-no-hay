import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface Report {
  timestamp: string;
  producto: string;
  cantidad: string;
  local: string;
}

export interface AnalysisResult {
  topGlobal: { producto: string; conteo: number }[];
  porLocal: { local: string; producto: string; conteo: number }[];
  resumen: string;
}

export async function analyzeReports(reports: Report[]): Promise<AnalysisResult> {
  if (reports.length === 0) {
    return { topGlobal: [], porLocal: [], resumen: "No hay registros aún." };
  }

  const prompt = `Eres un analista de inventario para Ferrocenter, una cadena de ferreterías.
Aquí están los reportes de productos faltantes registrados por los locales:

${JSON.stringify(reports, null, 2)}

Por favor analiza estos datos y responde ÚNICAMENTE con un JSON válido (sin markdown, sin texto extra) con esta estructura exacta:
{
  "topGlobal": [
    {"producto": "nombre normalizado", "conteo": número}
  ],
  "porLocal": [
    {"local": "nombre del local", "producto": "producto más pedido", "conteo": número}
  ],
  "resumen": "Un párrafo ejecutivo de 2-3 oraciones sobre los hallazgos principales."
}

Reglas:
- topGlobal: top 10 productos más pedidos en todos los locales, normaliza nombres similares (ej: "cemento" y "Cemento gris" como "Cemento")
- porLocal: el producto más pedido por cada local
- Ordena topGlobal de mayor a menor conteo`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
  });

  const content = response.choices[0].message.content ?? "{}";
  return JSON.parse(content) as AnalysisResult;
}
