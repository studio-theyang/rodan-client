import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import VISRC_Events from '../../../../../Shared/VISRC_Events'
import VISRC_ViewWorkflowListItem from './VISRC_ViewWorkflowListItem'

/**
 * This class represents the view (and controller) for the workflow list.
 */
class VISRC_ViewWorkflowList extends Marionette.CompositeView
{
///////////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * TODO docs
     */
    initialize(aParameters)
    {
        this._initializeRadio();

        this.modelEvents = {
            "all": "render"
        };
        this.childViewContainer = 'tbody';
        this.template = "#template-main_workflow_list";
        this.childView = VISRC_ViewWorkflowListItem;
        this.collection = this.rodanChannel.request(VISRC_Events.REQUEST__COLLECTION_WORKFLOW);
    }

///////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initialize Radio.
     */
    _initializeRadio()
    {
        this.rodanChannel = Radio.channel("rodan");
    }
}

export default VISRC_ViewWorkflowList;