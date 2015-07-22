import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import Events from '../../../../../Shared/Events';

/**
 * This class represents the basic data for a Workflow.
 */
class ViewWorkflowRunData extends Marionette.ItemView
{
///////////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * TODO docs
     */
    initialize(aParameters)
    {
        this.modelEvents = {
            'all': 'render'
        };
        this._initializeRadio();
        this._workflow = aParameters.workflow;
        this._initializeRadio();
        this.template = '#template-main_workflowrun_newworkflowrun_data';
        this.ui = {
            buttonRun: '#button-workflowrun_run',
            textName: '#text-workflowrun_name',
            textDescription: '#text-workflowrun_description'
        };
        this.events = {
            'click @ui.buttonRun': '_handleButtonRun'
        };
    }

///////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initialize Radio.
     */
    _initializeRadio()
    {
        this.rodanChannel = Radio.channel('rodan');
    }

    /**
     * Handle run button.
     */
    _handleButtonRun()
    {
        this.rodanChannel.command(Events.COMMAND__WORKFLOWRUNCREATOR_CREATE_WORKFLOWRUN, {name: this.ui.textName.val(), description: this.ui.textDescription.val()});
    }
}

export default ViewWorkflowRunData;