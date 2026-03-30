import { NextResponse } from "next/server";
import { callWebhook } from "@/lib/n8n";

export async function GET() {
  try {
    const data = await callWebhook(process.env.N8N_WEBHOOK_LOCALES!);
    // n8n devuelve un array de objetos con odoo_team_name
    const locales: string[] = Array.isArray(data)
      ? data.map((row: Record<string, string>) => row.odoo_team_name).filter(Boolean)
      : [];
    return NextResponse.json(locales);
  } catch (err) {
    console.error("Error obteniendo locales:", err);
    return NextResponse.json([], { status: 500 });
  }
}
