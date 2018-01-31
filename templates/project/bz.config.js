const logo = require('./logo');
const outputs = require('./outputs');
const inputs = require('./inputs');

module.exports = {
  name: 'Your connector name',
  serviceName: 'Service Name',
  description: 'What you connector is.',
  'explanation-en': 'Shot summary about what the service is about.',
  'explanation-es': 'Breve explicación de lo que es el servicio.',
  url: 'URL to the service',
  icon: logo,
  author: 'John Doe',
  version: '14.5.1',
  actions: [
    {
      name: 'create-users',
      'description-en': 'Creates a new user.',
      'description-es': 'Crea un nuevo usuario.',
      inputs: [...inputs.createUsers],
      outputs: [...outputs.createUsers]
    }
  ],
  auth: [
    {
      name: 'host',
      required: true,
      hide: false,
      'description-en': 'Host to connect to.',
      'description-es': 'Dirección IP del host.'
    },
    {
      name: 'port',
      required: true,
      hide: false,
      'description-en': 'Port available to make the connection.',
      'description-es': 'Puerto disponible que usa el host para escuchar.'
    }
  ]
};
