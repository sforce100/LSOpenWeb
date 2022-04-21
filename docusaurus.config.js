const defaultConfig = require('./default.config')
const { handleConfig } = require('./modulesConfig')
const docusaurusConfig = handleConfig(JSON.parse(JSON.stringify(defaultConfig)))
console.log(JSON.stringify(docusaurusConfig))
module.exports = docusaurusConfig
