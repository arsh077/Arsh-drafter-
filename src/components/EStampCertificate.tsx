import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  EStampFormData,
  STATUTORY_ALERTS,
  buildQrVerificationPayload,
  formatCurrencyINR,
  numberToIndianWords,
} from '../utils/estamp';
import {
  AshokaEmblemSvg,
  AshokaWatermarkSvg,
  CornerOrnamentSvg,
  ShcilHeaderRibbon,
  VerticalScrollChainSvg,
  WavySecurityStrip,
} from './CertificateArtwork';

interface EStampCertificateProps {
  data: EStampFormData;
  sheetRef?: React.RefObject<HTMLDivElement | null>;
}

export const EStampCertificate: React.FC<EStampCertificateProps> = ({ data, sheetRef }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [watermarkFailed, setWatermarkFailed] = useState<boolean>(false);
  const [emblemFailed, setEmblemFailed] = useState<boolean>(false);
  const [leftBorderFailed, setLeftBorderFailed] = useState<boolean>(false);
  const [rightBorderFailed, setRightBorderFailed] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    const payload = buildQrVerificationPayload(data);
    QRCode.toDataURL(payload, {
      width: 240,
      margin: 0,
      color: {
        dark: '#111827',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (active) setQrDataUrl(url);
      })
      .catch(() => {
        if (active) setQrDataUrl('');
      });
    return () => {
      active = false;
    };
  }, [data]);

  const sideUnit = data.sideSecurityText.trim() || 'FARHEEN MUSHIR (ADV)';
  const sideTextRepeated = Array.from({ length: 6 })
    .map(() => sideUnit)
    .join('\u00A0\u00A0\u00A0');

  const stampDutyNumeric = `${Math.floor(data.stampAmount || 0)}`;
  const stampDutyWords = `(${numberToIndianWords(data.stampAmount || 0, true)})`;
  const considerationNumeric = `${Math.floor(data.considerationPrice || 0)}`;
  const considerationWords = `(${numberToIndianWords(data.considerationPrice || 0, true)})`;
  const stateDisplay = (data.state.trim() || 'Bihar').toUpperCase();
  const formattedCurrency = formatCurrencyINR(data.stampAmount);

  return (
    <div
      ref={sheetRef}
      id="estamp-certificate-sheet"
      data-testid="estamp-certificate-sheet"
      style={{
        width: '794px',
        height: '1123px',
        backgroundColor: '#ffffff',
        color: '#111827',
        fontFamily: '"Plus Jakarta Sans", Arial, sans-serif',
        boxSizing: 'border-box',
      }}
      className="relative flex items-stretch justify-between px-4 py-4 overflow-hidden select-text"
    >
      {/* LEFT ORNAMENTAL COLUMN */}
      <div className="relative w-[44px] shrink-0 flex flex-col justify-between overflow-visible">
        {leftBorderFailed ? (
          <>
            <CornerOrnamentSvg />
            <div className="flex-1 min-h-0">
              <VerticalScrollChainSvg side="left" />
            </div>
            <CornerOrnamentSvg flipY />
          </>
        ) : (
          <img
            src="/assets/aistudio/Mirrored_Celtic_Corner_Border_0c41a20c.png"
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setLeftBorderFailed(true)}
            className="pointer-events-none select-none absolute top-0 h-full max-w-none"
            style={{
              width: '296px',
              left: '-126px',
              mixBlendMode: 'multiply',
            }}
          />
        )}
      </div>

      {/* LEFT VERTICAL REPEATED SIDE TEXT */}
      <div className="w-[20px] shrink-0 mt-[118px] mb-[132px] flex items-center justify-center overflow-hidden">
        <div
          className="whitespace-nowrap uppercase font-black tracking-[0.03em]"
          style={{
            transform: 'rotate(-90deg)',
            fontSize: '10.5px',
            fontWeight: 900,
            color: '#000000',
            WebkitTextStroke: '0.35px #000000',
          }}
        >
          {sideTextRepeated}
        </div>
      </div>

      {/* CENTER CERTIFICATE CONTENT AREA */}
      <div className="relative flex-1 flex flex-col px-2.5 pt-1 pb-2 min-w-0">
        {/* Central Circular Security Watermark */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[195px] flex justify-center z-0"
          aria-hidden="true"
        >
          {watermarkFailed ? (
            <AshokaWatermarkSvg className="w-[410px] h-[410px] opacity-70" />
          ) : (
            <img
              src="/assets/aistudio/Ashoka_Lion_Capital_Guilloche_Watermark_7cd4757c.png"
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setWatermarkFailed(true)}
              className="w-[410px] h-[410px] object-contain opacity-60 select-none"
              style={{ mixBlendMode: 'multiply' }}
            />
          )}
        </div>

        {/* SECTION 1: National Emblem, INDIA NON JUDICIAL, Government of STATE, & Denomination */}
        <header className="relative z-10 flex items-end justify-between pb-1.5">
          {/* Upper Left: Lion Capital of Ashoka Emblem */}
          <div className="w-[96px] shrink-0 flex justify-center">
            {emblemFailed ? (
              <AshokaEmblemSvg className="w-[88px] h-[126px]" strokeColor="#111827" fillColor="#ffffff" />
            ) : (
              <img
                src="/assets/aistudio/karnataka_stamp_emblem_95322b12.png"
                alt="Lion Capital of Ashoka"
                referrerPolicy="no-referrer"
                onError={() => setEmblemFailed(true)}
                className="w-[84px] h-[132px] object-contain select-none"
                style={{ mixBlendMode: 'multiply' }}
              />
            )}
          </div>

          {/* Upper Center: INDIA NON JUDICIAL + Underlined Government of STATE */}
          <div className="flex-1 flex flex-col items-center justify-center pb-5 px-2">
            <div
              className="font-bold tracking-[0.04em] uppercase text-center"
              style={{
                fontSize: '17.5px',
                lineHeight: 1.2,
                color: '#111827',
              }}
            >
              INDIA NON JUDICIAL
            </div>
            <div className="mt-5 inline-flex flex-col items-center">
              <div
                className="font-extrabold text-center tracking-tight"
                style={{
                  fontSize: '23px',
                  lineHeight: 1.15,
                  fontWeight: 800,
                  color: '#000000',
                  WebkitTextStroke: '0.25px #000000',
                }}
                data-testid="cert-government-heading"
              >
                Government of {stateDisplay}
              </div>
              <span
                className="mt-1 block w-full h-[2.5px]"
                style={{ backgroundColor: '#000000' }}
              />
            </div>
          </div>

          {/* Upper Right: Stamp Denomination (Clean bold ₹500, no outer box) */}
          <div className="w-[96px] shrink-0 flex justify-end pb-1 pr-1">
            <div
              className="font-bold tabular-nums whitespace-nowrap mr-[19px]"
              style={{
                fontSize: '23px',
                lineHeight: 1.1,
                color: '#111827',
              }}
              data-testid="cert-stamp-denomination"
            >
              {formattedCurrency}
            </div>
          </div>
        </header>

        {/* SECTION 2: Full-width SHCIL Micro-Text Bar + Guilloché e-Stamp Ribbon */}
        <div className="relative z-10 mb-3">
          <ShcilHeaderRibbon />
        </div>

        {/* SECTION 3, 4 & 5: Certificate Identification, Party Details & Address Table */}
        <section className="relative z-10 text-[12px] leading-[1.36] px-1">
          <table className="w-full border-collapse">
            <tbody>
              <CertRow
                label="Certificate No."
                value={data.certificateNumber}
                testId="cert-number-value"
              />
              <CertRow label="Certificate Issued Date" value={data.certificateIssuedDate} />
              <CertRow label="Account Reference" value={data.accountReference} />
              <CertRow label="Unique Doc. Reference" value={data.uniqueDocumentReference} />
              <CertRow
                label="Purchased by"
                value={data.purchasedBy}
                uppercase
                testId="cert-purchased-by"
              />
              <CertRow label="Description of Document" value={data.descriptionOfDocument} />
              <CertRow label="Property Description" value={data.propertyDescription} />
              <CertRow
                label="Consideration Price (Rs.)"
                value={considerationNumeric}
                subValue={considerationWords}
              />
              <CertRow
                label="First Party"
                value={data.firstParty}
                uppercase
                testId="cert-first-party"
              />
              <CertRow
                label="Second Party"
                value={data.secondParty}
                uppercase
                testId="cert-second-party"
              />
              <CertRow
                label="Stamp Duty Paid By"
                value={data.stampDutyPaidBy}
                uppercase
                testId="cert-stamp-duty-paid-by"
              />
              <CertRow
                label="Stamp Duty Amount (Rs.)"
                value={stampDutyNumeric}
                subValue={stampDutyWords}
                testId="cert-stamp-duty-amount"
              />
              <CertRow
                label="Address of First Party"
                value={data.addressOfFirstParty}
                uppercase
              />
              {data.designation.trim() ? (
                <CertRow label="Designation:" value={data.designation} uppercase />
              ) : null}
            </tbody>
          </table>
        </section>

        {/* SECTION 6: Vertical ₹500 + Lower-Left QR Code + Shaded Grey Wavy Security Pattern */}
        <section className="relative z-10 mt-[58px] px-1 flex items-center gap-3">
          {/* Vertical Stamp Value beside QR */}
          <div className="w-5 shrink-0 flex items-center justify-center">
            <span
              className="whitespace-nowrap font-bold tabular-nums"
              style={{
                transform: 'rotate(-90deg)',
                fontSize: '18px',
                color: '#111827',
              }}
            >
              {formattedCurrency}
            </span>
          </div>

          {/* Crisp Raw QR Matrix */}
          <div className="shrink-0" style={{ backgroundColor: '#ffffff' }}>
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`Verification QR code for ${data.certificateNumber}`}
                className="w-[108px] h-[108px] block"
                data-testid="cert-qr-image"
              />
            ) : (
              <div
                className="w-[108px] h-[108px] flex items-center justify-center text-[9px] border border-[#e5e7eb]"
                style={{ color: '#6b7280' }}
              >
                QR Code
              </div>
            )}
          </div>

          {/* Grey Shaded Rectangular Wavy Security Strip */}
          <div className="flex-1 min-w-0">
            <WavySecurityStrip className="w-full h-[108px] block" />
          </div>
        </section>

        {/* SECTION 7: Dotted Signature Divider with Grey Dots + Right-Aligned Certificate No. + Writing Area */}
        <section className="relative z-10 mt-4 px-1 flex-1 flex flex-col min-h-0">
          {/* Top label row right above the right dotted line */}
          <div className="relative flex items-center gap-2">
            {/* Left dotted rule */}
            <div
              className="flex-1 h-0"
              style={{ borderBottom: '1.5px dotted #6b7280' }}
            />
            {/* Left light-grey circle marker */}
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: '#d4d4d8' }}
              aria-hidden="true"
            />
            {/* Center instruction */}
            <span
              className="shrink-0 font-medium"
              style={{ fontSize: '10.2px', color: '#111827' }}
            >
              {data.signatureInstruction || 'Please write or type below this line'}
            </span>
            {/* Right light-grey circle marker */}
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: '#d4d4d8' }}
              aria-hidden="true"
            />
            {/* Right dotted rule + Certificate No. resting directly above */}
            <div className="relative flex-1 flex flex-col justify-end">
              <span
                className="text-right font-medium pb-0.5 whitespace-nowrap"
                style={{ fontSize: '10.8px', color: '#111827' }}
              >
                {data.certificateNumber}
              </span>
              <div
                className="w-full h-0"
                style={{ borderBottom: '1.5px dotted #6b7280' }}
              />
            </div>
          </div>

          {/* Blank or Typed Agreement Area */}
          <div
            className="flex-1 mt-3 overflow-hidden"
            style={{
              fontFamily: '"Source Serif 4", Georgia, serif',
              fontSize: '11.5px',
              lineHeight: 1.55,
              color: '#111827',
              whiteSpace: 'pre-wrap',
            }}
            data-testid="cert-agreement-body"
          >
            {data.agreementBody.trim() ? data.agreementBody : null}
          </div>
        </section>

        {/* SECTION 8: Statutory Alert Footer (Unboxed clean text on white background) */}
        <footer className="relative z-10 mt-2 mb-[19px] pl-[23px] pr-[24px] pt-1">
          <div
            className="font-bold mb-0.5"
            style={{ fontSize: '10px', color: '#111827' }}
          >
            Statutory Alert:
          </div>
          <ol
            className="list-decimal pl-4 space-y-[1.5px]"
            style={{ fontSize: '8.8px', lineHeight: 1.32, color: '#111827' }}
          >
            {STATUTORY_ALERTS.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ol>
        </footer>
      </div>

      {/* RIGHT VERTICAL REPEATED SIDE TEXT */}
      <div className="w-[20px] shrink-0 mt-[118px] mb-[132px] flex items-center justify-center overflow-hidden">
        <div
          className="whitespace-nowrap uppercase font-black tracking-[0.03em]"
          style={{
            transform: 'rotate(-90deg)',
            fontSize: '10.5px',
            fontWeight: 900,
            color: '#000000',
            WebkitTextStroke: '0.35px #000000',
          }}
        >
          {sideTextRepeated}
        </div>
      </div>

      {/* RIGHT ORNAMENTAL COLUMN */}
      <div className="relative w-[44px] shrink-0 flex flex-col justify-between overflow-visible">
        {rightBorderFailed ? (
          <>
            <CornerOrnamentSvg flipX />
            <div className="flex-1 min-h-0">
              <VerticalScrollChainSvg side="right" />
            </div>
            <CornerOrnamentSvg flipX flipY />
          </>
        ) : (
          <img
            src="/assets/aistudio/Monochrome_Celtic_Ornamental_Border_592d0096.png"
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setRightBorderFailed(true)}
            className="pointer-events-none select-none absolute top-0 h-full max-w-none"
            style={{
              width: '296px',
              right: '-118px',
              mixBlendMode: 'multiply',
            }}
          />
        )}
      </div>
    </div>
  );
};

interface CertRowProps {
  label: string;
  value: string;
  subValue?: string;
  uppercase?: boolean;
  testId?: string;
}

const CertRow: React.FC<CertRowProps> = ({
  label,
  value,
  subValue,
  uppercase = false,
  testId,
}) => (
  <tr className="align-top">
    <td
      className="py-[3.5px] pr-2 whitespace-nowrap font-medium"
      style={{ width: '205px', color: '#000000', fontWeight: 500 }}
    >
      {label}
    </td>
    <td
      className="py-[3.5px] px-1.5 font-medium"
      style={{ width: '16px', color: '#000000', fontWeight: 500 }}
    >
      :
    </td>
    <td
      className={`py-[3.5px] pl-1 break-words font-medium ${uppercase ? 'uppercase' : ''}`}
      style={{ color: '#000000', fontWeight: 500 }}
      data-testid={testId}
    >
      <div>{value.trim() || '—'}</div>
      {subValue ? <div>{subValue}</div> : null}
    </td>
  </tr>
);
