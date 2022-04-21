const defaultConfig = require('./default.config')
const { handleConfig } = require('./modulesConfig')
const docusaurusConfig = handleConfig(JSON.parse(JSON.stringify(defaultConfig)))
module.exports = docusaurusConfig
