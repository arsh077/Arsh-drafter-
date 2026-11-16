import React, { useEffect, useRef, useState } from 'react';
import { Download, Printer, ZoomIn, ZoomOut } from 'lucide-react';
import { EStampFormData } from '../utils/estamp';
import { EStampCertificate } from './EStampCertificate';

interface CertificatePreviewPaneProps {
  data: EStampFormData;
  sheetRef: React.RefObject<HTMLDivElement | null>;
  isExporting: boolean;
  exportMessage: { type: 'success' | 'error'; text: string } | null;
  onDownloadPdf: () => void;
  onPrint: () => void;
}

type ZoomMode = 'fit' | '75' | '100';

export const CertificatePreviewPane: React.FC<CertificatePreviewPaneProps> = ({
  data,
  sheetRef,
  isExporting,
  exportMessage,
  onDownloadPdf,
  onPrint,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoomMode, setZoomMode] = useState<ZoomMode>('fit');
  const [fitScale, setFitScale] = useState<number>(0.72);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const availableWidth = Math.max(containerRef.current.clientWidth - 48, 280);
      const computed = Math.min(availableWidth / 794, 0.92);
      setFitScale(Number(computed.toFixed(3)));
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const scale = zoomMode === 'fit' ? fitScale : zoomMode === '75' ? 0.75 : 1;
  const scaledWidth = Math.round(794 * scale);
  const scaledHeight = Math.round(1123 * scale);

  return (
    <div id="section-preview" className="flex flex-col h-full bg-slate-100">
      {/* Workspace Toolbar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span className="font-semibold text-slate-900">A4 Certificate Preview</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">210 × 297 mm</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{Math.round(scale * 100)}%</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Segmented Zoom Control */}
          <div
            className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-md"
            role="group"
            aria-label="Preview zoom"
          >
            <button
              type="button"
              onClick={() => setZoomMode('fit')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                zoomMode === 'fit'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fit
            </button>
            <button
              type="button"
              onClick={() => setZoomMode('75')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                zoomMode === '75'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ZoomOut className="w-3 h-3" aria-hidden="true" />
              75%
            </button>
            <button
              type="button"
              onClick={() => setZoomMode('100')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                zoomMode === '100'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ZoomIn className="w-3 h-3" aria-hidden="true" />
              100%
            </button>
          </div>

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            Print A4
          </button>

          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={isExporting}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            {isExporting ? 'Generating PDF…' : 'Export PDF'}
          </button>
        </div>
      </div>

      {/* Inline Export Feedback Banner (only visible after user triggers PDF export / validation) */}
      {exportMessage ? (
        <div
          role="status"
          aria-live="polite"
          className={`no-print px-6 py-2.5 text-xs font-medium border-b ${
            exportMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {exportMessage.text}
        </div>
      ) : null}

      {/* Scrollable A4 Desk Surface */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-6 flex justify-center items-start"
      >
        <div
          className="print-only-sheet-wrapper relative bg-white shadow-lg border border-slate-300/80 shrink-0"
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
          }}
        >
          <div
            style={{
              width: '794px',
              height: '1123px',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <EStampCertificate data={data} sheetRef={sheetRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
