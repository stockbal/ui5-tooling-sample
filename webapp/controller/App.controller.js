import Controller from 'sap/ui/core/mvc/Controller';
import JSONModel from 'sap/ui/model/json/JSONModel';

/**
 * @name phoenix.starter.controller.App
 */
export default class AppController extends Controller {
    onInit() {
		const oModel = new JSONModel({
			HTML:
				'<h2>Starter Kit for your UI5 app</h2>' +
				'<p>If you start your project use the <strong>init-project</strong> <em>grunt</em> task.</p>' +
				'<p>Additionally please have a look at the <strong>Readme</strong>. ' +
				'This file lists available tasks, this project setup can perform.' +
				'</p>' +
				'<p>If you are not familiar with grunt please have a look at ' +
				'<a href="https://gruntjs.com/getting-started">Grunt getting started</a>.' +
				'</p>'
		});
		this.getView().setModel(oModel);
    }
    /*test(oEvent) {
		console.log('test');
		this.getView().getModel('birds').read("/Volery", {
			success: function(oResult) {
				sap.m.MessageToast.show('The mockserver call worked!');
			},
			error: function(oError) {
				sap.m.MessageToast.show('An error occured, while using the mockserver.');
			}
		});
	} //<- Test call for the MockServer if started with Mockserver.
*/
}
