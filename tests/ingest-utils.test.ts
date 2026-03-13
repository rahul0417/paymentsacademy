import test from 'node:test';
import assert from 'node:assert/strict';

import { sanitizeOutputName } from '../scripts/ingest-utils.mjs';

test('sanitizeOutputName keeps source type in extracted filenames', () => {
  assert.equal(sanitizeOutputName('guide.pdf'), 'guide.pdf.txt');
  assert.equal(sanitizeOutputName('guide.docx'), 'guide.docx.txt');
});

test('sanitizeOutputName strips unsafe filesystem characters', () => {
  assert.equal(
    sanitizeOutputName('bad:name?.pptx'),
    'bad_name_.pptx.txt',
  );
});
