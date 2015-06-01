import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import VISRC_Events from '../../../Shared/VISRC_Events'
import VISRC_ViewProjectController from './Project/VISRC_ViewProjectController'
import VISRC_ViewScoreController from './Score/VISRC_ViewScoreController'
import VISRC_ViewWorkflowController from './Workflow/VISRC_ViewWorkflowController'
import VISRC_ViewWorkflowRunController from './WorkflowRun/VISRC_ViewWorkflowRunController'

/**
 * Layout view for main work area. This is responsible for loading views within the main region.
 */
class VISRC_LayoutViewMain extends Marionette.LayoutView
{
///////////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * TODO docs
     */
    initialize(aOptions)
    {
        this.el = "#app";
        this.template = "#template-empty";
        this.addRegions({
            region: "#region-main"
        });
        this._initializeViews();
        this._initializeRadio();
    }

    /**
     * Show the appropriate view.
     */
    onRender()
    {
        // Initial show. We need to force a particular view.
        this.rodanChannel.command(VISRC_Events.COMMAND__SHOW_PROJECTS);
    }

///////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initialize views.
     */
    _initializeViews()
    {
        this.viewProjectController = new VISRC_ViewProjectController();
        this.viewScoreController = new VISRC_ViewScoreController();
        this.viewWorkflowController = new VISRC_ViewWorkflowController();
        this.viewWorkflowRunController = new VISRC_ViewWorkflowRunController();
    }

    /**
     * Initialize Radio.
     */
    _initializeRadio()
    {
        this.rodanChannel = Radio.channel("rodan");
    }
}

export default VISRC_LayoutViewMain;