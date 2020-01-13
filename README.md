# ui5-tooling-sample
UI5-Tooling Sample App

This is a sample app with a ui5-tooling project setup. The following features are supported

- Proxies (e.g. to On-Premise systems for odata service)
- Deployment to On-Premise system 
- ES6 Javascript
- SASS Support (only file ending .scss at the moment)

## Supported npm commands

- `build` - Performs a build via `ui5 build`
- `start` - Serves the sources in the `dist` folder via `ui5 serve`
- `start:dist` - Runs first the task `build` and then `start`
- `dev` - starts a server in `webapp` with live-reload and live-transpilation support
- `upload` - Uploads the sources in the `dist` folder to the specified ABAP system in `gruntDeploy`
- `deploy` - Runs first the task `build` and then `upload`

### Sample Controller
The following code snippet shows how a controller can be written via this project setup

```js
import Controller from 'sap/ui/core/mvc/Controller';
import JSONModel from 'sap/ui/model/json/JSONModel';

/**
 * @name phoenix.starter.controller.App
 */
export default class AppController extends Controller {
	onInit() {
		const sTag = 'h2';
		const oModel = new JSONModel({
			HTML: `<${sTag}>A Sample Heading</${sTag}>`
		});
		this.getView().setModel(oModel);
	}
}
```
For more information about babel see here [babel-plugin-transform-modules-ui5](https://github.com/r-murphy/babel-plugin-transform-modules-ui5/blob/master/README.md)
