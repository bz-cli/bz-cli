const bzconfig = require('../bz.config');
const styles = require('./doc-styles');
const inputsDescriptions = require('./inputs.d');
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const docx = require('docx');
const changeCase = require('change-case');

module.exports = () => {
  const doc = new docx.Document();

  doc.createParagraph(`Configurar y usar el conector de ${changeCase.titleCase(bzconfig.serviceName)}`).heading2();
  doc.createParagraph();

  // Overview Section
  doc.createParagraph('Overview').heading3();
  doc.createParagraph(changeCase.upperCaseFirst(bzconfig['explanation-es'])).style('BzText');
  doc
    .createParagraph(`El conector de ${changeCase.titleCase(bzconfig.serviceName)} se encuentra disponible para descargarse de Bizagi Connectors Xchange.`)
    .style('BzText')
    .addRun(new docx.TextRun('Con este conector, usted será capaz de conectar sus procesos de Bizagi a ______'));
  doc.createParagraph().style('BzText');
  doc
    .createParagraph('Para más información sobre la capacidad de este conector, visite Bizagi Connectors Xchange.')
    .style('BzText');
  doc.createParagraph().style('BzText');

  // Before you start section
  doc.createParagraph('Antes de empezar').heading3();
  doc.createParagraph('Para probar y usar este conector, usted necesitará:').style('BzText');

  const numbering = new docx.Numbering();
  const abstractNum = numbering.createAbstractNumbering();
  abstractNum.createLevel(0, 'decimal', '%1', 'start');
  const concreteNumbering = numbering.createConcreteNumbering(abstractNum);

  doc.createParagraph('Bizagi Studio instalado previamente').setNumbering(concreteNumbering, 0).style('BzText');
  doc
    .createParagraph('Este conector previamente instalado, a través del Connectors Xchange así cómo se describe en http:// help.bizagi.com/bpmsuite/en/index.html?Connectors_Xchange.htm, or a través de una instalación manual cómo se describe en http://help.bizagi.com/bpmsuite/en/index.html?Connectors_install.htm.')
    .setNumbering(concreteNumbering, 0)
    .style('BzText');
  doc.createParagraph('[Otros pasos que necesiten hacer los usuarios]').setNumbering(concreteNumbering, 0).style('BzText');

  // Configuring the connector
  doc.createParagraph();
  doc.createParagraph('Configurando el conector').heading3();
  doc
    .createParagraph('Para configurar el conector (es decir, sus parámetros de autenticación), siga los pasos presentados en el capítulo de configuración en http://help.bizagi.com/bpmsuite/en/index.html?Connectors_install.htm.')
    .style('BzText');
  doc.createParagraph();
  doc.createParagraph('Para esta configuración, considere los siguientes parámetros de autenticación:').style('BzText');

  doc.createParagraph('Authentication method: ').addRun(new docx.TextRun('custom.').bold()).bullet().style('BzText');
  bzconfig.auth.forEach((authProp) => {
    const authPropertyParragraph = new docx.Paragraph();
    const authPropName = new docx.TextRun(`${authProp.name}: `).bold();
    const authPropDescription = new docx.TextRun(changeCase.upperCaseFirst(authProp['description-es']));
    authPropertyParragraph.addRun(authPropName).addRun(authPropDescription).bullet().style('BzText');
    doc.addParagraph(authPropertyParragraph);
  });
  doc.createParagraph();
  doc.createParagraph('[Pantallazo de la configuración del Sistema]').style('BzText');
  doc.createParagraph();

  // Using the connector
  doc.createParagraph('Usando el conector').heading3();
  doc
    .createParagraph(`Este conector posee ${bzconfig.actions.length} métodos disponibles de ${bzconfig.serviceName}.`)
    .addRun(new docx.TextRun('When using the connector, ensure you consider the following details for the available method.'))
    .style('BzText');
  doc.createParagraph();
  doc
    .createParagraph('Para aprender el cómo/donde de configurar el conector, refiérase a http://help.bizagi.com/ bpmsuite/en/index.html?Connectors_Studio.htm.')
    .style('BzText');
  doc.createParagraph();

  // Connector Actions
  bzconfig.actions.forEach((action) => {
    doc.createParagraph(changeCase.titleCase(action.name)).heading4();
    doc.createParagraph(changeCase.upperCaseFirst(action['description-es'])).indent({ start: 375 }).style('BzText');
    doc.createParagraph();
    doc.createParagraph(`[Pantallazo con la acción ${changeCase.camelCase(action.name)} seleccionada en la grilla]`).center().style('BzText');
    doc.createParagraph();

    if (action.inputs.length) {
      doc.createParagraph('Para configurar sus entradas, considere:').indent({ start: 375 }).style('BzText');
    } else {
      doc.createParagraph('Esta acción no requiere entradas:').indent({ start: 375 }).style('BzText');
    }

    action.inputs.forEach((input) => {
      const inputParragraph = new docx.Paragraph();
      const inputName = new docx.TextRun(`${input.name}: `).bold();

      const inputDescription =
      (inputsDescriptions[action.name] && inputsDescriptions[action.name][input.name] && inputsDescriptions[action.name][input.name].en)
        ? new docx.TextRun(inputsDescriptions[action.name][input.name].es)
        : new docx.TextRun('No hay descripción para este input.');

      inputParragraph.addRun(inputName).addRun(inputDescription).bullet().style('BzText');
      doc.addParagraph(inputParragraph);
    });
    doc.createParagraph();
    doc.createParagraph(`[Pantallazo con las entradas de ${changeCase.camelCase(action.name)}]`).center().style('BzText');
    doc.createParagraph();
    doc
      .createParagraph('Para configurar las salidas cuando esté usándolo y probándolo, considere:')
      .indent({ start: 375 })
      .style('BzText');
    doc.createParagraph();
    doc.createParagraph(`[Pantallazo con las salidas de ${changeCase.camelCase(action.name)}]`).center().style('BzText');
    doc.createParagraph();
    doc
      .createParagraph(`Para más información sobre el uso de este método, refiérase a la API REST oficial en ${bzconfig.url}.`)
      .indent({ start: 375 })
      .style('BzText');
    doc.createParagraph();
  });

  const exporter = new docx.LocalPacker(doc, styles);

  exporter.pack('README - es.docx');
};
