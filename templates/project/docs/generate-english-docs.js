const bzconfig = require('../bz.config');
const styles = require('./doc-styles');
const inputsDescriptions = require('./inputs.d');
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const docx = require('docx');
const changeCase = require('change-case');

module.exports = () => {
  const doc = new docx.Document();

  doc.createParagraph(`Configuring and using the ${changeCase.titleCase(bzconfig.serviceName)} Connector`).heading2();
  doc.createParagraph();

  // Overview Section
  doc.createParagraph('Overview').heading3();
  doc.createParagraph(changeCase.upperCaseFirst(bzconfig['explanation-en'])).style('BzText');
  doc
    .createParagraph(`The ${changeCase.titleCase(bzconfig.serviceName)} connector for Bizagi is available for download at Bizagi Connectors Xchange. `)
    .style('BzText')
    .addRun(new docx.TextRun('Through this connector, you will be able to connect your Bizagi processes to ______'));
  doc.createParagraph().style('BzText');
  doc
    .createParagraph('For more information about this connector\'s capabilities, visit Bizagi Connectors Xchange.')
    .style('BzText');
  doc.createParagraph().style('BzText');

  // Before you start section
  doc.createParagraph('Before you start').heading3();
  doc.createParagraph('In order to test and use this connector you will need:').style('BzText');

  const numbering = new docx.Numbering();
  const abstractNum = numbering.createAbstractNumbering();
  abstractNum.createLevel(0, 'decimal', '%1', 'start');
  const concreteNumbering = numbering.createConcreteNumbering(abstractNum);

  doc.createParagraph('Bizagi Studio previously installed').setNumbering(concreteNumbering, 0).style('BzText');
  doc
    .createParagraph('This connector previously installed, via the Connectors Xchange as described at http://help.bizagi.com/bpmsuite/en/index.html?Connectors_Xchange.htm, or through a manual installation as described at http://help.bizagi.com/bpmsuite/en/index.html?Connectors_install.htm.')
    .setNumbering(concreteNumbering, 0)
    .style('BzText');
  doc.createParagraph('[Other steps users may need to follow]').setNumbering(concreteNumbering, 0).style('BzText');

  // Configuring the connector
  doc.createParagraph();
  doc.createParagraph('Configuring the connector').heading3();
  doc
    .createParagraph('In order to configure the connector (i.e its authentication parameters), follow the steps presented at the Configuration chapter in http://help.bizagi.com/bpmsuite/en/index.html?Connectors_install.htm.')
    .style('BzText');
  doc.createParagraph();
  doc.createParagraph('For this configuration, consider the following authentication parameters:').style('BzText');

  doc.createParagraph('Authentication method: ').addRun(new docx.TextRun('custom.').bold()).bullet().style('BzText');
  bzconfig.auth.forEach((authProp) => {
    const authPropertyParragraph = new docx.Paragraph();
    const authPropName = new docx.TextRun(`${authProp.name}: `).bold();
    const authPropDescription = new docx.TextRun(changeCase.upperCaseFirst(authProp['description-en']));
    authPropertyParragraph.addRun(authPropName).addRun(authPropDescription).bullet().style('BzText');
    doc.addParagraph(authPropertyParragraph);
  });
  doc.createParagraph();
  doc.createParagraph('[System Configuration Screenshot]').style('BzText');
  doc.createParagraph();

  // Using the connector
  doc.createParagraph('Using the connector').heading3();
  doc
    .createParagraph(`This connector features ${bzconfig.actions.length} methods of the ${bzconfig.serviceName}. `)
    .addRun(new docx.TextRun('When using the connector, ensure you consider the following details for the available method.'))
    .style('BzText');
  doc.createParagraph();
  doc
    .createParagraph('To learn overall how/where to configure the use of a connector, refer to http://help.bizagi.com/bpmsuite/en/index.html?Connectors_Studio.htm.')
    .style('BzText');
  doc.createParagraph();

  // Connector Actions
  bzconfig.actions.forEach((action) => {
    doc.createParagraph(changeCase.titleCase(action.name)).heading4();
    doc.createParagraph(changeCase.upperCaseFirst(action['description-en'])).indent({ start: 375 }).style('BzText');
    doc.createParagraph();
    doc.createParagraph(`[${changeCase.camelCase(action.name)} selected on grid screenshot]`).center().style('BzText');
    doc.createParagraph();

    if (action.inputs.length) {
      doc.createParagraph('To configure its inputs, consider mapping:').indent({ start: 375 }).style('BzText');
    } else {
      doc.createParagraph('These action requires no inputs:').indent({ start: 375 }).style('BzText');
    }

    action.inputs.forEach((input) => {
      const inputParragraph = new docx.Paragraph();
      const inputName = new docx.TextRun(`${input.name}: `).bold();

      const inputDescription =
      (inputsDescriptions[action.name] && inputsDescriptions[action.name][input.name] && inputsDescriptions[action.name][input.name].en)
        ? new docx.TextRun(inputsDescriptions[action.name][input.name].en)
        : new docx.TextRun('No description for this input yet.');

      inputParragraph.addRun(inputName).addRun(inputDescription).bullet().style('BzText');
      doc.addParagraph(inputParragraph);
    });
    doc.createParagraph();
    doc.createParagraph(`[${changeCase.camelCase(action.name)} inputs mapping screenshot]`).center().style('BzText');
    doc.createParagraph();
    doc
      .createParagraph('To configure its outputs when getting started and testing, you may map:')
      .indent({ start: 375 })
      .style('BzText');
    doc.createParagraph();
    doc.createParagraph(`[${changeCase.camelCase(action.name)} outputs mapping screenshot]`).center().style('BzText');
    doc.createParagraph();
    doc
      .createParagraph(`For more information about this method's use, refer to the ${changeCase.titleCase(bzconfig.serviceName)} official documentation at ${bzconfig.url}.`)
      .indent({ start: 375 })
      .style('BzText');
    doc.createParagraph();
  });

  const exporter = new docx.LocalPacker(doc, styles);

  exporter.pack('README - en.docx');
};
