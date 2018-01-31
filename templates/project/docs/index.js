const generateEnglishDocs = require('./generate-english-docs');
const generateSpanishDocs = require('./generate-spanish-docs');

if (process.env.lan.toLowerCase() === 'en') {
  generateEnglishDocs();
} else if (process.env.lan.toLowerCase() === 'es') {
  generateSpanishDocs();
}
