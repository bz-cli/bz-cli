module.exports = {
	name: 'Your connector name',
	description: 'What you connector is.',
	url: 'URL to the service',
  icon: 'Base 64 icon',
  author: 'John Doe',
  version: '14.5.1',
	actions: [
		{
			name: 'get-tenant-root-site',
			description: 'Access the root SharePoint site within a tenant.',
			inputs: [
				{
					name: 'ResponseProp',
					type: 'object',
					qty: 'list',
					props: [
						{
							name: 'SingleNesteProp',
							type: 'integer',
							qty: 'single'
						},
						{
							name: 'NestedStringList',
							type: 'string',
							qty: 'list'
						},
						{
							name: 'DoubleNestedObjectList',
							type: 'object',
							qty: 'list',
							props: [
								{
									name: 'DoubleNestedObjectPropList',
									type: 'string',
									qty: 'list'
								}
							]
						}
					]
				}
			],
			outputs: [
				{
					name: 'createdDateTime',
					type: 'string',
					qty: 'single'
				},
				{
					name: 'description',
					type: 'string',
					qty: 'single'
				},
				{
					name: 'id',
					type: 'string',
					qty: 'single'
				},
				{
					name: 'lastModifiedDateTime',
					type: 'string',
					qty: 'single'
				},
				{
					name: 'name',
					type: 'string',
					qty: 'single'
				},
				{
					name: 'displayName',
					type: 'string',
					qty: 'single'
				},
				{
					name: 'webUrl',
					type: 'string',
					qty: 'single'
				}
			]
		}
	],
	auth: [
		{
			name: 'client_id',
			required: true,
			hide: false
		},
		{
			name: 'client_secret',
			required: true,
			hide: true
		},
		{
			name: 'scope',
			required: true,
			hide: true
		},
		{
			name: 'code',
			required: true,
			hide: true
		},
		{
			name: 'redirect_url',
			required: true,
			hide: false
		},
		{
			name: 'access_token',
			required: true,
			hide: false
		},
		{
			name: 'refresh_token',
			required: true,
			hide: false
		}
	]
};
