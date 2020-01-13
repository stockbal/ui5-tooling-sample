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