import { NextResponse } from "next/server";
import { callWebhook } from "@/lib/n8n";
import { analyzeReports, Report } from "@/lib/analysis";

export async function GET() {
  try {
    const raw = await callWebhook(process.env.N8N_WEBHOOK_REPORTS!);
    const reports: Report[] = Array.isArray(raw) ? raw : [];
    const result = await analyzeReports(reports);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Error en análisis:", err);
    return NextResponse.json({ error: "Error al analizar" }, { status: 500 });
  }
}
