export interface IndianStateOption {
  name: string;
  code: string;
  capitalCity: string;
}

export const INDIAN_STATES: IndianStateOption[] = [
  { name: 'Andaman and Nicobar Islands', code: 'AN', capitalCity: 'PORT BLAIR' },
  { name: 'Andhra Pradesh', code: 'AP', capitalCity: 'AMARAVATI' },
  { name: 'Arunachal Pradesh', code: 'AR', capitalCity: 'ITANAGAR' },
  { name: 'Assam', code: 'AS', capitalCity: 'GUWAHATI' },
  { name: 'Bihar', code: 'BH', capitalCity: 'PATNA' },
  { name: 'Chandigarh', code: 'CH', capitalCity: 'CHANDIGARH' },
  { name: 'Chhattisgarh', code: 'CG', capitalCity: 'RAIPUR' },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', code: 'DN', capitalCity: 'DAMAN' },
  { name: 'Delhi', code: 'DL', capitalCity: 'NEW DELHI' },
  { name: 'Goa', code: 'GA', capitalCity: 'PANAJI' },
  { name: 'Gujarat', code: 'GJ', capitalCity: 'GANDHINAGAR' },
  { name: 'Haryana', code: 'HR', capitalCity: 'CHANDIGARH' },
  { name: 'Himachal Pradesh', code: 'HP', capitalCity: 'SHIMLA' },
  { name: 'Jammu and Kashmir', code: 'JK', capitalCity: 'SRINAGAR' },
  { name: 'Jharkhand', code: 'JH', capitalCity: 'RANCHI' },
  { name: 'Karnataka', code: 'KA', capitalCity: 'BENGALURU' },
  { name: 'Kerala', code: 'KL', capitalCity: 'THIRUVANANTHAPURAM' },
  { name: 'Ladakh', code: 'LA', capitalCity: 'LEH' },
  { name: 'Madhya Pradesh', code: 'MP', capitalCity: 'BHOPAL' },
  { name: 'Maharashtra', code: 'MH', capitalCity: 'MUMBAI' },
  { name: 'Manipur', code: 'MN', capitalCity: 'IMPHAL' },
  { name: 'Meghalaya', code: 'ML', capitalCity: 'SHILLONG' },
  { name: 'Mizoram', code: 'MZ', capitalCity: 'AIZAWL' },
  { name: 'Nagaland', code: 'NL', capitalCity: 'KOHIMA' },
  { name: 'Odisha', code: 'OD', capitalCity: 'BHUBANESWAR' },
  { name: 'Puducherry', code: 'PY', capitalCity: 'PUDUCHERRY' },
  { name: 'Punjab', code: 'PB', capitalCity: 'CHANDIGARH' },
  { name: 'Rajasthan', code: 'RJ', capitalCity: 'JAIPUR' },
  { name: 'Sikkim', code: 'SK', capitalCity: 'GANGTOK' },
  { name: 'Tamil Nadu', code: 'TN', capitalCity: 'CHENNAI' },
  { name: 'Telangana', code: 'TS', capitalCity: 'HYDERABAD' },
  { name: 'Tripura', code: 'TR', capitalCity: 'AGARTALA' },
  { name: 'Uttar Pradesh', code: 'UP', capitalCity: 'LUCKNOW' },
  { name: 'Uttarakhand', code: 'UK', capitalCity: 'DEHRADUN' },
  { name: 'West Bengal', code: 'WB', capitalCity: 'KOLKATA' },
];

export interface EStampFormData {
  state: string;
  firstParty: string;
  secondParty: string;
  purchasedBy: string;
  stampDutyPaidBy: string;
  stampAmount: number;
  certificateNumber: string;
  certificateIssuedDate: string;
  accountReference: string;
  uniqueDocumentReference: string;
  descriptionOfDocument: string;
  propertyDescription: string;
  considerationPrice: number;
  addressOfFirstParty: string;
  designation: string;
  sideSecurityText: string;
  signatureInstruction: string;
  agreementBody: string;
}

export const STATUTORY_ALERTS: readonly string[] = [
  'The authenticity of this Stamp certificate should be verified at (www.shcilestamp.com) or using a Stamp Mobile App of Stock Holding.',
  'Any denomination in the details of this Certificate and as available on the website / Mobile App renders it invalid.',
  'The ease of disclosing the legibility is or the issue of the certificate.',
  'In case of any discrepancy please inform the Competent Authority.',
];

export const DEFAULT_ESTAMP_DATA: EStampFormData = {
  state: 'Bihar',
  firstParty: 'BAKHTAWAR ALI',
  secondParty: 'FARHEEN MUSHIR',
  purchasedBy: 'BAKHTAWAR ALI',
  stampDutyPaidBy: 'FARHEEN MUSHIR',
  stampAmount: 500,
  certificateNumber: 'IN-BH973620071458236X',
  certificateIssuedDate: '16-Nov-2026 12:45 PM',
  accountReference: 'IMPACC (IV)/ tn428973/ CHENNAI/ TN-NCT',
  uniqueDocumentReference: 'IMPACC (IV)/ BH028970p/ PATNA/ BR',
  descriptionOfDocument: 'Article 5 General Agreement',
  propertyDescription: 'Authorization',
  considerationPrice: 0,
  addressOfFirstParty:
    'MOGALPURA NAWDHAL, HAIDARY COLONY, PATNA CITY, PATNA SADAR, DISTRICT PATNA, BIHAR - 800008',
  designation: 'OWNER',
  sideSecurityText: 'FARHEEN MUSHIR (ADV)',
  signatureInstruction: 'Please write or type below this line',
  agreementBody: '',
};

export const KARNATAKA_REFERENCE_DATA: EStampFormData = {
  state: 'Karnataka',
  firstParty: 'KHAJA MAINUDDIN GANGAVALI',
  secondParty: 'FARHEEN MUSHIR',
  purchasedBy: 'KHAJA MAINUDDIN GANGAVALI',
  stampDutyPaidBy: 'KHAJA MAINUDDIN GANGAVALI',
  stampAmount: 500,
  certificateNumber: 'IN-KAR973620071458236X',
  certificateIssuedDate: '16-Nov-2026 12:45 PM',
  accountReference: 'IMPACC (IV)/ KR428973/ KARNATAKA/ TN-NCT',
  uniqueDocumentReference: 'IMPACC (IV)/ BH028970p/ PATNA/ BR',
  descriptionOfDocument: 'Article 5 General Agreement',
  propertyDescription: 'Authorization',
  considerationPrice: 0,
  addressOfFirstParty: '239/4, TAGGARAGOD JALI, BHATKAL, JALI, UTTARA KANNADA, KARNATAKA - 581320',
  designation: 'OWNER',
  sideSecurityText: 'FARHEEN MUSHIR (ADV)',
  signatureInstruction: 'Please write or type below this line',
  agreementBody: '',
};

const ONES = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
];

const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function twoDigitsToWords(n: number): string {
  if (n < 20) return ONES[n];
  const ten = Math.floor(n / 10);
  const one = n % 10;
  return one > 0 ? `${TENS[ten]} ${ONES[one]}` : TENS[ten];
}

function threeDigitsToWords(n: number): string {
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  if (hundred > 0 && rest > 0) {
    return `${ONES[hundred]} Hundred ${twoDigitsToWords(rest)}`;
  }
  if (hundred > 0) {
    return `${ONES[hundred]} Hundred`;
  }
  return twoDigitsToWords(rest);
}

/**
 * Converts a non-negative integer into Indian English currency words.
 * E.g. 0 -> "Zero", 500 -> "Five Hundred only", 125000 -> "One Lakh Twenty Five Thousand only".
 */
export function numberToIndianWords(amount: number, withOnlySuffix = true): string {
  if (!Number.isFinite(amount) || amount < 0) {
    return 'Zero';
  }
  const integer = Math.floor(amount);
  if (integer === 0) {
    return 'Zero';
  }

  const crore = Math.floor(integer / 10000000);
  const lakh = Math.floor((integer % 10000000) / 100000);
  const thousand = Math.floor((integer % 100000) / 1000);
  const remainder = integer % 1000;

  const parts: string[] = [];
  if (crore > 0) parts.push(`${numberToIndianWords(crore, false)} Crore`);
  if (lakh > 0) parts.push(`${twoDigitsToWords(lakh)} Lakh`);
  if (thousand > 0) parts.push(`${twoDigitsToWords(thousand)} Thousand`);
  if (remainder > 0) parts.push(threeDigitsToWords(remainder));

  const joined = parts.join(' ').trim();
  return withOnlySuffix ? `${joined} only` : joined;
}

export function formatCurrencyINR(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) return '₹0';
  return `₹${Math.floor(amount).toLocaleString('en-IN')}`;
}

export function getStateCode(stateName: string): string {
  const normalized = stateName.trim().toLowerCase();
  const match = INDIAN_STATES.find((s) => s.name.toLowerCase() === normalized);
  if (match) return match.code;
  const letters = stateName.replace(/[^a-zA-Z]/g, '').toUpperCase();
  return letters.slice(0, 2).padEnd(2, 'X');
}

function randomDigits(length: number, seed?: number): string {
  if (seed !== undefined) {
    let value = Math.abs(Math.floor(seed * 7919 + 104729));
    let out = '';
    while (out.length < length) {
      value = (value * 1103515245 + 12345) & 0x7fffffff;
      out += String(value).padStart(6, '3');
    }
    return out.slice(0, length);
  }
  let out = '';
  while (out.length < length) {
    out += String(Math.floor(Math.random() * 10));
  }
  return out.slice(0, length);
}

export function generateCertificateNumber(stateName: string, randomSeed?: number): string {
  const code = getStateCode(stateName);
  const digits = randomDigits(14, randomSeed);
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const index =
    randomSeed !== undefined
      ? Math.abs(Math.floor(randomSeed)) % letters.length
      : Math.floor(Math.random() * letters.length);
  const checkChar = letters[index];
  return `IN-${code}${digits}${checkChar}`;
}

export function generateAccountReference(stateName: string, randomSeed?: number): string {
  const code = getStateCode(stateName);
  const stateUpper = stateName.trim().toUpperCase() || 'BIHAR';
  const digits = randomDigits(6, randomSeed);
  return `IMPACC (IV)/ ${code}${digits}/ ${stateUpper}/ ${code}-NCT`;
}

export function generateUniqueDocReference(stateName: string, randomSeed?: number): string {
  const normalized = stateName.trim().toLowerCase();
  const match = INDIAN_STATES.find((s) => s.name.toLowerCase() === normalized);
  const code = getStateCode(stateName);
  const city = match?.capitalCity || stateName.trim().toUpperCase() || 'PATNA';
  const digits = randomDigits(6, randomSeed);
  const letters = 'abcdefghjkmnpqrstuvwxyz';
  const index =
    randomSeed !== undefined
      ? Math.abs(Math.floor(randomSeed)) % letters.length
      : Math.floor(Math.random() * letters.length);
  const suffixChar = letters[index];
  return `IMPACC (IV)/ ${code}${digits}${suffixChar}/ ${city}/ ${code}`;
}

export function syncStateChange(prev: EStampFormData, nextState: string): EStampFormData {
  const prevCode = getStateCode(prev.state);
  const nextCode = getStateCode(nextState);
  let nextCertNo = prev.certificateNumber;

  if (prev.certificateNumber.startsWith('IN-KAR') && nextCode !== 'KA') {
    nextCertNo = `IN-${nextCode}${prev.certificateNumber.slice(6)}`;
  } else if (prev.certificateNumber.startsWith(`IN-${prevCode}`) && prev.certificateNumber.length >= 6) {
    nextCertNo = `IN-${nextCode}${prev.certificateNumber.slice(5)}`;
  }

  return {
    ...prev,
    state: nextState,
    certificateNumber: nextCertNo,
  };
}

export function buildQrVerificationPayload(data: EStampFormData): string {
  return [
    `CERT:${data.certificateNumber.trim()}`,
    `STATE:${data.state.trim()}`,
    `AMT:INR ${Math.floor(data.stampAmount || 0)}`,
    `DATE:${data.certificateIssuedDate.trim()}`,
    `FP:${data.firstParty.trim()}`,
    `SP:${data.secondParty.trim()}`,
    `PB:${data.purchasedBy.trim()}`,
    `SDP:${data.stampDutyPaidBy.trim()}`,
  ].join('|');
}

export type ValidationErrors = Partial<Record<keyof EStampFormData, string>>;

export function validateEStampForm(data: EStampFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.state.trim()) {
    errors.state = 'State / Jurisdiction is required.';
  }
  if (!data.firstParty.trim()) {
    errors.firstParty = 'First Party name is required.';
  }
  if (!data.secondParty.trim()) {
    errors.secondParty = 'Second Party name is required.';
  }
  if (!data.purchasedBy.trim()) {
    errors.purchasedBy = 'Purchased By name is required.';
  }
  if (!data.stampDutyPaidBy.trim()) {
    errors.stampDutyPaidBy = 'Stamp Duty Paid By name is required.';
  }
  if (!data.certificateNumber.trim()) {
    errors.certificateNumber = 'Certificate Number is required.';
  }
  if (!data.certificateIssuedDate.trim()) {
    errors.certificateIssuedDate = 'Certificate Issued Date is required.';
  }
  if (!data.descriptionOfDocument.trim()) {
    errors.descriptionOfDocument = 'Description of Document is required.';
  }
  if (!Number.isFinite(data.stampAmount) || data.stampAmount <= 0) {
    errors.stampAmount = 'Stamp Duty Amount must be greater than ₹0.';
  }
  if (!Number.isFinite(data.considerationPrice) || data.considerationPrice < 0) {
    errors.considerationPrice = 'Consideration Price cannot be negative.';
  }

  return errors;
}
