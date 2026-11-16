import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export interface PdfExportResult {
  ok: boolean;
  filename?: string;
  error?: string;
}

/**
 * Captures the A4 e-Stamp DOM node at high resolution and saves an exact A4 PDF.
 */
export async function exportCertificateToPdf(
  element: HTMLElement | null,
  certificateNumber: string
): Promise<PdfExportResult> {
  if (!element) {
    return { ok: false, error: 'Certificate preview element is not ready.' };
  }

  try {
    const safeName = (certificateNumber || 'e-stamp-certificate')
      .trim()
      .replace(/[^a-zA-Z0-9_-]+/g, '_');
    const filename = `${safeName}.pdf`;

    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2.5,
      backgroundColor: '#ffffff',
      width: 794,
      height: 1123,
      style: {
        transform: 'none',
        transformOrigin: 'top left',
      },
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    pdf.save(filename);

    return { ok: true, filename };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unable to generate PDF.';
    return { ok: false, error: message };
  }
}
