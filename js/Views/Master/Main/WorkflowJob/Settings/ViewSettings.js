import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import JSONEditor from 'json-editor';

import Events from '../../../../../Shared/Events';

/**
 * This represents settings for a workflow job.
 */
class ViewSettings extends Marionette.ItemView
{
///////////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initialize.
     */
    initialize(aParameters)
    {
        this.model = aParameters.workflowjob;
        this._initializeRadio();
    }

    onRender()
    {
        this._initializeSettingsDisplay();
    }

///////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initialize Radio.
     */
    _initializeRadio()
    {
        this._rodanChannel = Radio.channel('rodan');
    }

    /**
     * Handle button save settings.
     */
    _handleButtonSaveSettings()
    {
        this._rodanChannel.request(Events.REQUEST__WORKFLOWJOB_SAVE, {'job_settings': this._editor.getValue()});
    }

    /**
     * Initializes settings display.
     */
    _initializeSettingsDisplay()
    {
        // Initially hide.
        var element = $(this.$el.find('#workflowjob-settings')[0])[0];
        $(element).hide();

        // Check if we have settings.
        var startValues = this.model.get('job_settings');
        startValues = $.isEmptyObject(startValues) ? null : startValues;
        if (startValues !== null)
        {
            $(element).show();
            var jobUuid = this.model.getJobUuid();
            var collection = this._rodanChannel.request(Events.REQUEST__COLLECTION_JOB);
            var job = collection.get(jobUuid);
            var settingsSchema = { 
                schema: job.get('settings'),
                theme: 'bootstrap3',
                disable_collapse: true,
                disable_edit_json: true,
                disable_properties: false,
                no_additional_properties: true,
                show_errors: 'always',
                startval: startValues
            };
            this._editor = new JSONEditor.JSONEditor(element, settingsSchema); 
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
///////////////////////////////////////////////////////////////////////////////////////
ViewSettings.prototype.modelEvents = {
    'all': 'render'
};
ViewSettings.prototype.template = '#template-main_workflowbuilder_control_settings';
ViewSettings.prototype.ui = {
    buttonSaveSettings: '#button-save_settings'
};
ViewSettings.prototype.events = {
    'click @ui.buttonSaveSettings': '_handleButtonSaveSettings'
};

export default ViewSettings;