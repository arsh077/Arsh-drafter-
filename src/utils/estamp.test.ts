import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_ESTAMP_DATA,
  KARNATAKA_REFERENCE_DATA,
  buildQrVerificationPayload,
  formatCurrencyINR,
  generateAccountReference,
  generateCertificateNumber,
  generateUniqueDocReference,
  getStateCode,
  numberToIndianWords,
  syncStateChange,
  validateEStampForm,
} from './estamp';

test('default data matches requested party and state configuration', () => {
  assert.equal(DEFAULT_ESTAMP_DATA.state, 'Bihar');
  assert.equal(DEFAULT_ESTAMP_DATA.firstParty, 'BAKHTAWAR ALI');
  assert.equal(DEFAULT_ESTAMP_DATA.secondParty, 'FARHEEN MUSHIR');
  assert.equal(DEFAULT_ESTAMP_DATA.purchasedBy, 'BAKHTAWAR ALI');
  assert.equal(DEFAULT_ESTAMP_DATA.stampDutyPaidBy, 'FARHEEN MUSHIR');
  assert.equal(DEFAULT_ESTAMP_DATA.stampAmount, 500);
  assert.equal(DEFAULT_ESTAMP_DATA.certificateNumber, 'IN-BH973620071458236X');
  assert.equal(KARNATAKA_REFERENCE_DATA.state, 'Karnataka');
  assert.equal(KARNATAKA_REFERENCE_DATA.certificateNumber, 'IN-KAR973620071458236X');
});

test('numberToIndianWords formats zero, hundreds, thousands, and lakhs properly', () => {
  assert.equal(numberToIndianWords(0), 'Zero');
  assert.equal(numberToIndianWords(500), 'Five Hundred only');
  assert.equal(numberToIndianWords(100), 'One Hundred only');
  assert.equal(numberToIndianWords(1250), 'One Thousand Two Hundred Fifty only');
  assert.equal(numberToIndianWords(150000), 'One Lakh Fifty Thousand only');
});

test('formatCurrencyINR formats Indian currency strings', () => {
  assert.equal(formatCurrencyINR(500), '₹500');
  assert.equal(formatCurrencyINR(100000), '₹1,00,000');
  assert.equal(formatCurrencyINR(0), '₹0');
});

test('syncStateChange updates state and certificate state code prefix cleanly', () => {
  const updated = syncStateChange(DEFAULT_ESTAMP_DATA, 'Delhi');
  assert.equal(updated.state, 'Delhi');
  assert.equal(updated.certificateNumber, 'IN-DL973620071458236X');

  const maharashtra = syncStateChange(updated, 'Maharashtra');
  assert.equal(maharashtra.state, 'Maharashtra');
  assert.equal(maharashtra.certificateNumber, 'IN-MH973620071458236X');

  const fromKarnataka = syncStateChange(KARNATAKA_REFERENCE_DATA, 'Bihar');
  assert.equal(fromKarnataka.certificateNumber, 'IN-BH973620071458236X');
});

test('getStateCode and generator helpers produce valid state-specific formats', () => {
  assert.equal(getStateCode('Bihar'), 'BH');
  assert.equal(getStateCode('Uttar Pradesh'), 'UP');
  const cert = generateCertificateNumber('Karnataka', 123456);
  assert.match(cert, /^IN-KA\d{14}[A-Z]$/);

  const acct = generateAccountReference('Maharashtra', 424242);
  assert.match(acct, /^IMPACC \(IV\)\/ MH\d{6}\/ MAHARASHTRA\/ MH-NCT$/);

  const uniq = generateUniqueDocReference('Karnataka', 998877);
  assert.match(uniq, /^IMPACC \(IV\)\/ KA\d{6}[a-z]\/ BENGALURU\/ KA$/);
});

test('buildQrVerificationPayload encodes key party, state, and certificate details', () => {
  const payload = buildQrVerificationPayload(DEFAULT_ESTAMP_DATA);
  assert.match(payload, /CERT:IN-BH973620071458236X/);
  assert.match(payload, /STATE:Bihar/);
  assert.match(payload, /FP:BAKHTAWAR ALI/);
  assert.match(payload, /SP:FARHEEN MUSHIR/);
  assert.match(payload, /PB:BAKHTAWAR ALI/);
  assert.match(payload, /SDP:FARHEEN MUSHIR/);
});

test('validateEStampForm catches missing required fields and passes on defaults', () => {
  assert.deepEqual(validateEStampForm(DEFAULT_ESTAMP_DATA), {});

  const invalid = validateEStampForm({
    ...DEFAULT_ESTAMP_DATA,
    firstParty: '   ',
    state: '',
    stampAmount: 0,
  });
  assert.ok(invalid.firstParty);
  assert.ok(invalid.state);
  assert.ok(invalid.stampAmount);
});
