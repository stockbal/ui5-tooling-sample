import UIComponent from 'sap/ui/core/UIComponent';
import models from 'phoenix/starter/model/models';

/**
 * @name phoenix.starter.Component
 */
export default class Component extends UIComponent {
    metadata = {
        manifest: 'json'
    };
    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once
     * @public
     * @override
     */
    init() {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);
        // set the device model
        this.setModel(models.createDeviceModel(), 'device');
    }
}
