import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Download, FileText, Eye } from 'lucide-react';
import {
  DEFAULT_ESTAMP_DATA,
  EStampFormData,
  ValidationErrors,
  syncStateChange,
  validateEStampForm,
} from './utils/estamp';
import { exportCertificateToPdf } from './utils/pdfExport';
import { EStampForm } from './components/EStampForm';
import { CertificatePreviewPane } from './components/CertificatePreviewPane';

const STORAGE_KEY = 'estamp_studio_draft_v1';

function loadInitialDraft(): EStampFormData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ESTAMP_DATA;
    const parsed = JSON.parse(raw) as Partial<EStampFormData>;
    return {
      ...DEFAULT_ESTAMP_DATA,
      ...parsed,
      stampAmount:
        typeof parsed.stampAmount === 'number' && Number.isFinite(parsed.stampAmount)
          ? parsed.stampAmount
          : DEFAULT_ESTAMP_DATA.stampAmount,
      considerationPrice:
        typeof parsed.considerationPrice === 'number' && Number.isFinite(parsed.considerationPrice)
          ? parsed.considerationPrice
          : DEFAULT_ESTAMP_DATA.considerationPrice,
    };
  } catch {
    return DEFAULT_ESTAMP_DATA;
  }
}

export default function App() {
  const [formData, setFormData] = useState<EStampFormData>(loadInitialDraft);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // Ignore storage quota errors
    }
  }, [formData]);

  const handleFormUpdate = useCallback(
    (updater: (prev: EStampFormData) => EStampFormData) => {
      setFormData((prev) => {
        const next = updater(prev);
        if (hasAttemptedSubmit) {
          setErrors(validateEStampForm(next));
        }
        return next;
      });
      setExportMessage(null);
    },
    [hasAttemptedSubmit]
  );

  const handleStateChange = useCallback(
    (nextState: string) => {
      setFormData((prev) => {
        const next = syncStateChange(prev, nextState);
        if (hasAttemptedSubmit) {
          setErrors(validateEStampForm(next));
        }
        return next;
      });
      setExportMessage(null);
    },
    [hasAttemptedSubmit]
  );

  const handleReset = useCallback(() => {
    setFormData(DEFAULT_ESTAMP_DATA);
    setErrors({});
    setHasAttemptedSubmit(false);
    setExportMessage(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleDownloadPdf = useCallback(async () => {
    setHasAttemptedSubmit(true);
    const validation = validateEStampForm(formData);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setExportMessage({
        type: 'error',
        text: 'Please complete all required certificate fields highlighted in red before exporting.',
      });
      setMobileTab('form');
      return;
    }

    setIsExporting(true);
    setExportMessage(null);

    if (mobileTab !== 'preview') {
      setMobileTab('preview');
      await new Promise((resolve) => setTimeout(resolve, 120));
    }

    const result = await exportCertificateToPdf(sheetRef.current, formData.certificateNumber);
    setIsExporting(false);

    if (result.ok && result.filename) {
      setExportMessage({
        type: 'success',
        text: `Downloaded ${result.filename} (A4 Portrait PDF).`,
      });
    } else {
      setExportMessage({
        type: 'error',
        text: result.error || 'Failed to generate PDF. Please try Print A4 instead.',
      });
    }
  }, [formData, mobileTab]);

  const handlePrint = useCallback(() => {
    setHasAttemptedSubmit(true);
    const validation = validateEStampForm(formData);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setExportMessage({
        type: 'error',
        text: 'Please complete all required certificate fields before printing.',
      });
      setMobileTab('form');
      return;
    }

    window.print();
  }, [formData]);

  const scrollToSection = (sectionId: string, targetTab: 'form' | 'preview') => {
    setMobileTab(targetTab);
    requestAnimationFrame(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar: Strict 3-zone contract */}
      <header className="no-print sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#section-parties"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('section-parties', 'form');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          e-Stamp Studio
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a
            href="#section-parties"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('section-parties', 'form');
            }}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Parties & State
          </a>
          <a
            href="#section-certificate"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('section-certificate', 'form');
            }}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Certificate
          </a>
          <a
            href="#section-agreement"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('section-agreement', 'form');
            }}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Agreement
          </a>
          <a
            href="#section-preview"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('section-preview', 'preview');
            }}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Preview
          </a>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            {isExporting ? 'Generating…' : 'Download PDF'}
          </button>
        </div>
      </header>

      {/* Mobile Tab Switcher (only visible below lg breakpoint) */}
      <div className="no-print lg:hidden px-4 py-2.5 bg-white border-b border-slate-200">
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setMobileTab('form')}
            className={`inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              mobileTab === 'form'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            Edit Details
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              mobileTab === 'preview'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            Preview Certificate
          </button>
        </div>
      </div>

      {/* Main Split Workspace */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[490px_1fr] xl:grid-cols-[520px_1fr] min-h-0">
        {/* Left Column: Form Composer */}
        <aside
          className={`no-print bg-white border-r border-slate-200 lg:h-[calc(100vh-61px)] lg:overflow-y-auto ${
            mobileTab === 'form' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Quiet Context Header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>India Non-Judicial</span>
              <span aria-hidden="true">·</span>
              <span>e-Stamp Certificate</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">A4 Portrait</span>
            </div>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
              Certificate Details & PDF Composer
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Edit state, first & second party, purchaser, duty payer, or agreement text. Changes reflect live on the certificate.
            </p>

            {exportMessage && mobileTab === 'form' ? (
              <div
                role="status"
                aria-live="polite"
                className={`mt-3 px-3 py-2 text-xs font-medium rounded-md border ${
                  exportMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                {exportMessage.text}
              </div>
            ) : null}
          </div>

          <EStampForm
            data={formData}
            errors={errors}
            onChange={handleFormUpdate}
            onStateChange={handleStateChange}
            onReset={handleReset}
          />
        </aside>

        {/* Right Column: Live A4 Certificate Stage */}
        <section
          className={`lg:h-[calc(100vh-61px)] lg:overflow-hidden ${
            mobileTab === 'preview' ? 'block min-h-[70vh]' : 'hidden lg:block'
          }`}
        >
          <CertificatePreviewPane
            data={formData}
            sheetRef={sheetRef}
            isExporting={isExporting}
            exportMessage={exportMessage}
            onDownloadPdf={handleDownloadPdf}
            onPrint={handlePrint}
          />
        </section>
      </main>
    </div>
  );
}
