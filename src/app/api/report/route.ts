import { NextRequest, NextResponse } from "next/server";
import { callWebhook } from "@/lib/n8n";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { producto, cantidad, local } = body;

    if (!producto || !local) {
      return NextResponse.json(
        { error: "Producto y local son requeridos" },
        { status: 400 }
      );
    }

    await callWebhook(process.env.N8N_WEBHOOK_SAVE!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ producto, cantidad: cantidad || 1, local }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error guardando reporte:", err);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
