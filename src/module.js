import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk'; // will be resolved to app/plugins/sdk

import './css/panel.base.scss';
// Remove next imports if you don't need separate styles for light and dark themes
import './css/panel.dark.scss';
import './css/panel.light.scss';
// Remove up to here

class Ctrl extends MetricsPanelCtrl {

    constructor($scope, $injector) {
        super($scope, $injector);
        console.log('hello from console');
        this.events.on('data-received', this._onDataReceived.bind(this));
        this.message = 'hello!';
        this.image_link = 'https://camo.githubusercontent.com/d010ea19c70677a0bfd8a64fc01d2b0948e1ffc1/687474703a2f2f646f63732e67726166616e612e6f72672f6173736574732f696d672f66656174757265732f64617368626f6172645f6578312e706e67';
    }

    _onDataReceived(data) {
        console.log('test')
        console.log(data[0].datapoints[0]);
        this.image_link = data[0].datapoints[0].signedUrl;
    }

    link(scope, element) {
        this.initStyles();
    }

    initStyles() {
        window.System.import(this.panelPath + 'css/panel.base.css!');
        // Remove next lines if you don't need separate styles for light and dark themes
        if (grafanaBootData.user.lightTheme) {
            window.System.import(this.panelPath + 'css/panel.light.css!');
        } else {
            window.System.import(this.panelPath + 'css/panel.dark.css!');
        }
        // Remove up to here
    }

    get panelPath() {
        if (this._panelPath === undefined) {
            this._panelPath = `/public/plugins/${this.pluginId}/`;
        }
        return this._panelPath;
    }

}

Ctrl.templateUrl = 'partials/template.html';

export { Ctrl as PanelCtrl }