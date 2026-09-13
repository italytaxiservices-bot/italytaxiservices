import "server-only";

import { renderToBuffer } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import { NextResponse } from "next/server";

export async function pdfResponse(element: ReactElement, filename: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buffer = await renderToBuffer(element as any);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
