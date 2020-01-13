const path = require('path');
const babel = require('@babel/core');
const log = require('@ui5/logger').getLogger('builder:customTasks:babel');

/**
 * Task to transpiles ES6 code into ES5 code.
 *
 * @param {Object} parameters Parameters
 * @param {DuplexCollection} parameters.workspace DuplexCollection to read and write files
 * @param {AbstractReader} parameters.dependencies Reader or Collection to read dependency files
 * @param {Object} parameters.options Options
 * @param {string} parameters.options.projectName Project name
 * @param {string} [parameters.options.configuration] Task configuration if given in ui5.yaml
 * @returns {Promise} Promise resolving with undefined once data has been written
 */
module.exports = async ({ workspace, dependencies, options }) => {
    const resources = await workspace.byGlob('/**/*.js');
    const { debug = false, excludePatterns = [], nameSpace, appFolder } = options.configuration;
    if (!nameSpace) {
        log.error(`'namespace' was not defined in the configuration`);
        return Promise.reject();
    }
    if (!appFolder) {
        log.error(`'appFolder' was not defined in the configuration`);
        return Promise.reject();
    }
    return Promise.all(
        resources.map(async resource => {
            if (!excludePatterns.some(pattern => resource.getPath().includes(pattern))) {
                const value = await resource.getString();
                if (debug) {
                    log.info('Transpiling file ' + resource.getPath());
                }

                const fullFilePath = resource
                    .getPath()
                    .replace(`/resources/${nameSpace}`, `${process.cwd()}/${appFolder}`);
                try {
                    const result = await babel.transformFileAsync(fullFilePath);
                    resource.setString(result.code);
                    workspace.write(resource);
                } catch (error) {
                    log.error(error);
                }
            } else {
                return Promise.resolve();
            }
        })
    );
};
