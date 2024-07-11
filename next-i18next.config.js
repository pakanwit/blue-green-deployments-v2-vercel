const path = require('path')

module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'de', 'fr', 'es', 'it', 'nl', 'ja', 'sv', 'fi', 'da', 'no'],
	},
	localePath: path.resolve('./public/locales'),
	localeStructure: '{{lng}}/{{ns}}',
}