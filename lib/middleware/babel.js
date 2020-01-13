const babel = require('@babel/core');
const parseurl = require('parseurl');
const log = require('@ui5/logger').getLogger('server:custommiddleware:livetranspile');

let fileNotFoundError = new Error('file not found!');
fileNotFoundError.code = 404;
fileNotFoundError.file = '';

/**
 * Custom UI5 Server middleware example
 *
 * @param {Object} parameters Parameters
 * @param {Object} parameters.resources Resource collections
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.all Reader or Collection to read resources of the
 *                                        root project and its dependencies
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.rootProject Reader or Collection to read resources of
 *                                        the project the server is started in
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.dependencies Reader or Collection to read resources of
 *                                        the projects dependencies
 * @param {Object} parameters.options Options
 * @param {string} [parameters.options.configuration] Custom server middleware configuration if given in ui5.yaml
 * @returns {function} Middleware function to use
 */
module.exports = ({ resources, options }) => {
    const { debug = false, excludePatterns = [] } = options.configuration;
    return async (req, res, next) => {
        if (
            req.path.endsWith('.js') &&
            !req.path.includes('resources/') &&
            !excludePatterns.some(pattern => req.path.includes(pattern))
        ) {
            const pathname = parseurl(req).pathname;
            if (debug) {
                log.info(`handling ${req.path}...`);
            }
            // check if the file exists
            const resource = await resources.rootProject.byPath(pathname);
            if (!resource) {
                if (debug) {
                    log.warn(`...file not found: ${pathname}`);
                }
                next();
                return;
            }
            const fullFilePath = `${process.cwd()}/webapp${pathname}`;
            if (debug) {
                log.info(`...${pathname} transpiled!`);
            }
            try {
                const result = await babel.transformFileAsync(fullFilePath, {
                    sourceMaps: 'inline'
                });
                // send out transpiled source + source map
                res.type('.js');
                res.end(result.code);
            } catch (error) {
                log.error(error);
                next();
            }
        } else {
            next();
        }
    };
};
