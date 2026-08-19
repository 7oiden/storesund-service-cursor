"use client";

import { Printer } from "lucide-react";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function PrintQrButton({ signupUrl }: { signupUrl: string }) {
  function printQr() {
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(signupUrl)}`;
    const win = window.open("", "_blank", "width=480,height=640");
    if (!win) return;

    win.document.write(`<!doctype html>
<html lang="nb">
  <head>
    <meta charset="utf-8" />
    <title>QR til serviceavtale</title>
    <style>
      body {
        margin: 0;
        padding: 2.5rem 1.5rem;
        font-family: Georgia, serif;
        color: #132017;
        text-align: center;
      }
      h1 { margin: 0; font-size: 1.5rem; font-weight: 600; }
      p { margin: 0.75rem 0 0; font-family: system-ui, sans-serif; font-size: 0.9rem; color: #4a5a50; }
      img { display: block; width: 280px; height: 280px; margin: 1.5rem auto 0; }
      .url { word-break: break-all; font-size: 0.75rem; }
      @media print { body { padding: 1rem; } }
    </style>
  </head>
  <body>
    <h1>Storesund Service</h1>
    <p>Scan koden for å starte serviceavtale</p>
    <img src="${escapeHtml(qrSrc)}" alt="QR-kode til serviceavtale" width="280" height="280" />
    <p class="url">${escapeHtml(signupUrl)}</p>
    <script>
      const img = document.querySelector("img");
      const printPage = () => { window.print(); window.close(); };
      if (img.complete) printPage();
      else img.addEventListener("load", printPage);
      img.addEventListener("error", printPage);
    </script>
  </body>
</html>`);
    win.document.close();
  }

  return (
    <button
      type="button"
      onClick={printQr}
      aria-label="Skriv ut QR-kode"
      title="Skriv ut QR-kode"
      className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-ink/30 hover:bg-paper hover:text-ink"
    >
      <Printer size={16} />
    </button>
  );
}
