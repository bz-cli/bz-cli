/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const Styles = require('docx').Styles;

const styles = new Styles();
styles.createParagraphStyle('Heading2', 'Heading 2')
  .font('Segoe UI')
  .color('A6A6A6')
  .size(18 * 2)
  .bold()
  .quickFormat();

styles.createParagraphStyle('Heading3', 'Heading 3')
  .font('Segoe UI')
  .color('A6A6A6')
  .size(13 * 2)
  .bold()
  .quickFormat();

styles.createParagraphStyle('Heading4', 'Heading 4')
  .font('Segoe UI')
  .color('A6A6A6')
  .size(13 * 2)
  .bold()
  .italics()
  .quickFormat()
  .indent({ start: 375 });

styles.createParagraphStyle('BzText', 'Text')
  .font('Segoe UI')
  .color('808080')
  .size(10 * 2)
  .quickFormat();


module.exports = styles;
