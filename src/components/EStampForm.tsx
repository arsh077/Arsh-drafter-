import React, { useState } from 'react';
import { RotateCcw, ArrowLeftRight, Sparkles, RefreshCw, Calendar } from 'lucide-react';
import {
  EStampFormData,
  INDIAN_STATES,
  KARNATAKA_REFERENCE_DATA,
  ValidationErrors,
  generateAccountReference,
  generateCertificateNumber,
  generateUniqueDocReference,
  numberToIndianWords,
} from '../utils/estamp';

interface EStampFormProps {
  data: EStampFormData;
  errors: ValidationErrors;
  onChange: (updater: (prev: EStampFormData) => EStampFormData) => void;
  onStateChange: (nextState: string) => void;
  onReset: () => void;
}

const STAMP_DENOMINATIONS = [100, 500, 1000, 5000];

function formatCurrentDateTime(): string {
  const now = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(now.getDate()).padStart(2, '0');
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${day}-${month}-${year} ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

export const EStampForm: React.FC<EStampFormProps> = ({
  data,
  errors,
  onChange,
  onStateChange,
  onReset,
}) => {
  const isKnownState = INDIAN_STATES.some(
    (s) => s.name.toLowerCase() === data.state.trim().toLowerCase()
  );
  const [customStateMode, setCustomStateMode] = useState<boolean>(!isKnownState && data.state !== '');

  const updateField = <K extends keyof EStampFormData>(field: K, value: EStampFormData[K]) => {
    onChange((prev) => ({ ...prev, [field]: value }));
  };

  const handleSwapParties = () => {
    onChange((prev) => ({
      ...prev,
      firstParty: prev.secondParty,
      secondParty: prev.firstParty,
    }));
  };

  const handleInsertSampleClause = () => {
    const sample = `GENERAL AGREEMENT & AUTHORIZATION\n\nThis General Agreement is executed on ${data.certificateIssuedDate} at ${data.state}, between ${data.firstParty || 'First Party'} (hereinafter referred to as the "First Party") and ${data.secondParty || 'Second Party'} (hereinafter referred to as the "Second Party").\n\nWhereas the First Party hereby authorizes the Second Party to act and represent in matters pertaining to ${data.propertyDescription || 'Authorization'} on the terms mutually agreed herein.`;
    updateField('agreementBody', sample);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="divide-y divide-slate-200"
      noValidate
    >
      {/* SECTION 01: State & Party Details */}
      <section id="section-parties" className="px-6 py-6 space-y-5 scroll-mt-20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              01. State & Party Details
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Primary editable fields for jurisdiction, parties, purchaser, and duty payer.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setCustomStateMode(false);
                onChange(() => KARNATAKA_REFERENCE_DATA);
              }}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors whitespace-nowrap shrink-0"
              title="Load the Karnataka e-Stamp reference preset"
            >
              Karnataka Ref
            </button>
            <button
              type="button"
              onClick={handleSwapParties}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors whitespace-nowrap shrink-0"
              title="Swap First Party and Second Party"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
              Swap
            </button>
            <button
              type="button"
              onClick={() => {
                setCustomStateMode(false);
                onReset();
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        {/* State / Jurisdiction */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-state" className="block text-sm font-medium text-slate-800">
              State / Jurisdiction <span className="text-red-600">*</span>
            </label>
            <button
              type="button"
              onClick={() => setCustomStateMode((prev) => !prev)}
              className="text-xs font-medium text-blue-700 hover:text-blue-800 hover:underline whitespace-nowrap shrink-0"
            >
              {customStateMode ? 'Choose from list' : 'Enter custom state'}
            </button>
          </div>

          {customStateMode ? (
            <input
              id="field-state"
              type="text"
              value={data.state}
              onChange={(e) => onStateChange(e.target.value)}
              placeholder="e.g. Bihar"
              aria-invalid={Boolean(errors.state)}
              className={inputClassName(Boolean(errors.state))}
            />
          ) : (
            <select
              id="field-state"
              value={isKnownState ? INDIAN_STATES.find((s) => s.name.toLowerCase() === data.state.trim().toLowerCase())?.name : ''}
              onChange={(e) => onStateChange(e.target.value)}
              aria-invalid={Boolean(errors.state)}
              className={inputClassName(Boolean(errors.state))}
            >
              <option value="" disabled>
                Select Indian State / UT
              </option>
              {INDIAN_STATES.map((st) => (
                <option key={st.code + st.name} value={st.name}>
                  {st.name} ({st.code})
                </option>
              ))}
            </select>
          )}
          {errors.state ? <FieldError message={errors.state} /> : null}
        </div>

        {/* First Party & Second Party */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="field-first-party" className="block text-sm font-medium text-slate-800 mb-1.5">
              First Party <span className="text-red-600">*</span>
            </label>
            <input
              id="field-first-party"
              type="text"
              value={data.firstParty}
              onChange={(e) => updateField('firstParty', e.target.value)}
              placeholder="BAKHTAWAR ALI"
              aria-invalid={Boolean(errors.firstParty)}
              className={inputClassName(Boolean(errors.firstParty))}
            />
            {errors.firstParty ? <FieldError message={errors.firstParty} /> : null}
          </div>

          <div>
            <label htmlFor="field-second-party" className="block text-sm font-medium text-slate-800 mb-1.5">
              Second Party <span className="text-red-600">*</span>
            </label>
            <input
              id="field-second-party"
              type="text"
              value={data.secondParty}
              onChange={(e) => updateField('secondParty', e.target.value)}
              placeholder="FARHEEN MUSHIR"
              aria-invalid={Boolean(errors.secondParty)}
              className={inputClassName(Boolean(errors.secondParty))}
            />
            {errors.secondParty ? <FieldError message={errors.secondParty} /> : null}
          </div>
        </div>

        {/* Purchased By & Stamp Duty Paid By */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="field-purchased-by" className="block text-sm font-medium text-slate-800 mb-1.5">
              Purchased By <span className="text-red-600">*</span>
            </label>
            <input
              id="field-purchased-by"
              type="text"
              value={data.purchasedBy}
              onChange={(e) => updateField('purchasedBy', e.target.value)}
              placeholder="BAKHTAWAR ALI"
              aria-invalid={Boolean(errors.purchasedBy)}
              className={inputClassName(Boolean(errors.purchasedBy))}
            />
            {errors.purchasedBy ? <FieldError message={errors.purchasedBy} /> : null}
          </div>

          <div>
            <label htmlFor="field-stamp-duty-paid-by" className="block text-sm font-medium text-slate-800 mb-1.5">
              Stamp Duty Paid By <span className="text-red-600">*</span>
            </label>
            <input
              id="field-stamp-duty-paid-by"
              type="text"
              value={data.stampDutyPaidBy}
              onChange={(e) => updateField('stampDutyPaidBy', e.target.value)}
              placeholder="FARHEEN MUSHIR"
              aria-invalid={Boolean(errors.stampDutyPaidBy)}
              className={inputClassName(Boolean(errors.stampDutyPaidBy))}
            />
            {errors.stampDutyPaidBy ? <FieldError message={errors.stampDutyPaidBy} /> : null}
          </div>
        </div>
      </section>

      {/* SECTION 02: Stamp Denomination & Certificate Identifiers */}
      <section id="section-certificate" className="px-6 py-6 space-y-5 scroll-mt-20">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            02. Stamp Value & Certificate Details
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Denomination, SHCIL certificate number, references, and document classification.
          </p>
        </div>

        {/* Stamp Amount + Quick Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-stamp-amount" className="block text-sm font-medium text-slate-800">
              Stamp Duty Amount (INR) <span className="text-red-600">*</span>
            </label>
            <span className="text-xs text-slate-500 tabular-nums">
              {numberToIndianWords(data.stampAmount, true)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[140px]">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-mono">
                ₹
              </span>
              <input
                id="field-stamp-amount"
                type="number"
                min={1}
                step={1}
                value={Number.isFinite(data.stampAmount) ? data.stampAmount : ''}
                onChange={(e) =>
                  updateField('stampAmount', e.target.value === '' ? 0 : Number(e.target.value))
                }
                aria-invalid={Boolean(errors.stampAmount)}
                className={`${inputClassName(Boolean(errors.stampAmount))} pl-7 font-mono tabular-nums`}
              />
            </div>
            <div className="flex items-center gap-1.5">
              {STAMP_DENOMINATIONS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => updateField('stampAmount', amt)}
                  className={`px-2.5 py-2 text-xs font-medium rounded-md border transition-colors tabular-nums whitespace-nowrap shrink-0 ${
                    data.stampAmount === amt
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>
          {errors.stampAmount ? <FieldError message={errors.stampAmount} /> : null}
        </div>

        {/* Certificate Number & Issued Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="field-cert-number" className="block text-sm font-medium text-slate-800">
                Certificate No. <span className="text-red-600">*</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  updateField('certificateNumber', generateCertificateNumber(data.state))
                }
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 hover:underline whitespace-nowrap shrink-0"
              >
                <RefreshCw className="w-3 h-3" aria-hidden="true" />
                Regenerate
              </button>
            </div>
            <input
              id="field-cert-number"
              type="text"
              value={data.certificateNumber}
              onChange={(e) => updateField('certificateNumber', e.target.value)}
              aria-invalid={Boolean(errors.certificateNumber)}
              className={`${inputClassName(Boolean(errors.certificateNumber))} font-mono text-xs`}
            />
            {errors.certificateNumber ? <FieldError message={errors.certificateNumber} /> : null}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="field-issued-date" className="block text-sm font-medium text-slate-800">
                Certificate Issued Date <span className="text-red-600">*</span>
              </label>
              <button
                type="button"
                onClick={() => updateField('certificateIssuedDate', formatCurrentDateTime())}
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 hover:underline whitespace-nowrap shrink-0"
              >
                <Calendar className="w-3 h-3" aria-hidden="true" />
                Set now
              </button>
            </div>
            <input
              id="field-issued-date"
              type="text"
              value={data.certificateIssuedDate}
              onChange={(e) => updateField('certificateIssuedDate', e.target.value)}
              aria-invalid={Boolean(errors.certificateIssuedDate)}
              className={`${inputClassName(Boolean(errors.certificateIssuedDate))} font-mono text-xs`}
            />
            {errors.certificateIssuedDate ? (
              <FieldError message={errors.certificateIssuedDate} />
            ) : null}
          </div>
        </div>

        {/* Account Ref & Unique Doc Ref */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="field-account-ref" className="block text-sm font-medium text-slate-800">
                Account Reference
              </label>
              <button
                type="button"
                onClick={() =>
                  updateField('accountReference', generateAccountReference(data.state))
                }
                aria-label="Regenerate Account Reference"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 hover:underline whitespace-nowrap shrink-0"
              >
                <RefreshCw className="w-3 h-3" aria-hidden="true" />
                Regenerate
              </button>
            </div>
            <input
              id="field-account-ref"
              type="text"
              value={data.accountReference}
              onChange={(e) => updateField('accountReference', e.target.value)}
              className={`${inputClassName(false)} font-mono text-xs`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="field-unique-doc-ref" className="block text-sm font-medium text-slate-800">
                Unique Document Reference
              </label>
              <button
                type="button"
                onClick={() =>
                  updateField('uniqueDocumentReference', generateUniqueDocReference(data.state))
                }
                aria-label="Regenerate Unique Document Reference"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 hover:underline whitespace-nowrap shrink-0"
              >
                <RefreshCw className="w-3 h-3" aria-hidden="true" />
                Regenerate
              </button>
            </div>
            <input
              id="field-unique-doc-ref"
              type="text"
              value={data.uniqueDocumentReference}
              onChange={(e) => updateField('uniqueDocumentReference', e.target.value)}
              className={`${inputClassName(false)} font-mono text-xs`}
            />
          </div>
        </div>

        {/* Description, Property Description & Consideration Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="field-doc-desc" className="block text-sm font-medium text-slate-800 mb-1.5">
              Description of Document <span className="text-red-600">*</span>
            </label>
            <input
              id="field-doc-desc"
              type="text"
              value={data.descriptionOfDocument}
              onChange={(e) => updateField('descriptionOfDocument', e.target.value)}
              aria-invalid={Boolean(errors.descriptionOfDocument)}
              className={inputClassName(Boolean(errors.descriptionOfDocument))}
            />
            {errors.descriptionOfDocument ? (
              <FieldError message={errors.descriptionOfDocument} />
            ) : null}
          </div>

          <div>
            <label htmlFor="field-prop-desc" className="block text-sm font-medium text-slate-800 mb-1.5">
              Property Description
            </label>
            <input
              id="field-prop-desc"
              type="text"
              value={data.propertyDescription}
              onChange={(e) => updateField('propertyDescription', e.target.value)}
              className={inputClassName(false)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-consideration" className="block text-sm font-medium text-slate-800">
              Consideration Price (Rs.)
            </label>
            <span className="text-xs text-slate-500 tabular-nums">
              {numberToIndianWords(data.considerationPrice, true)}
            </span>
          </div>
          <input
            id="field-consideration"
            type="number"
            min={0}
            step={1}
            value={Number.isFinite(data.considerationPrice) ? data.considerationPrice : 0}
            onChange={(e) =>
              updateField('considerationPrice', e.target.value === '' ? 0 : Number(e.target.value))
            }
            aria-invalid={Boolean(errors.considerationPrice)}
            className={`${inputClassName(Boolean(errors.considerationPrice))} font-mono tabular-nums`}
          />
          {errors.considerationPrice ? (
            <FieldError message={errors.considerationPrice} />
          ) : null}
        </div>
      </section>

      {/* SECTION 03: Address, Side Margin & Agreement Body */}
      <section id="section-agreement" className="px-6 py-6 space-y-5 scroll-mt-20">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            03. Address, Margin Seal & Agreement Body
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Address details, side security margin text, and optional agreement text below the line.
          </p>
        </div>

        <div>
          <label htmlFor="field-address" className="block text-sm font-medium text-slate-800 mb-1.5">
            Address of First Party
          </label>
          <textarea
            id="field-address"
            rows={2}
            value={data.addressOfFirstParty}
            onChange={(e) => updateField('addressOfFirstParty', e.target.value)}
            className={inputClassName(false)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="field-designation" className="block text-sm font-medium text-slate-800 mb-1.5">
              Designation
            </label>
            <input
              id="field-designation"
              type="text"
              value={data.designation}
              onChange={(e) => updateField('designation', e.target.value)}
              className={inputClassName(false)}
            />
          </div>

          <div>
            <label htmlFor="field-side-text" className="block text-sm font-medium text-slate-800 mb-1.5">
              Side Margin Text
            </label>
            <input
              id="field-side-text"
              type="text"
              value={data.sideSecurityText}
              onChange={(e) => updateField('sideSecurityText', e.target.value)}
              className={inputClassName(false)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-agreement-body" className="block text-sm font-medium text-slate-800">
              Agreement Body (Optional — Blank by Default)
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleInsertSampleClause}
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 hover:underline whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                Insert sample
              </button>
              {data.agreementBody.trim() ? (
                <button
                  type="button"
                  onClick={() => updateField('agreementBody', '')}
                  className="text-xs font-medium text-slate-500 hover:text-slate-700 hover:underline whitespace-nowrap shrink-0"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
          <textarea
            id="field-agreement-body"
            rows={4}
            value={data.agreementBody}
            onChange={(e) => updateField('agreementBody', e.target.value)}
            placeholder="Leave blank to print a standard empty writing area below the security strip, or type your General Agreement / Authorization clauses here."
            className={inputClassName(false)}
          />
        </div>
      </section>
    </form>
  );
};

function inputClassName(hasError: boolean): string {
  return [
    'w-full px-3 py-2 text-sm text-slate-900 bg-white rounded-md border transition-colors',
    'placeholder:text-slate-400 focus:outline-none focus:ring-2',
    hasError
      ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
      : 'border-slate-300 focus:border-blue-700 focus:ring-blue-100',
  ].join(' ');
}

const FieldError: React.FC<{ message: string }> = ({ message }) => (
  <p role="alert" className="mt-1 text-xs font-medium text-red-600">
    {message}
  </p>
);
