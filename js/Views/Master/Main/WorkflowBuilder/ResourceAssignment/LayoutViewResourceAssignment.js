import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import RODAN_EVENTS from '../../../../../Shared/RODAN_EVENTS';

/**
 * ResourceAssignment view.
 */
export default class LayoutViewResourceAssignment extends Marionette.LayoutView
{
///////////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initializes the instance.
     *
     * @param {object} options Marionette.View options object; 'options.viewavailableresources' and 'options.viewassignedresources' must be provided (each being Marionette.Views); also required is 'options.workflow' (Workflow) and 'options.inputport' (InputPort)
     */
    initialize(options)
    {
        this.addRegions({
            regionAvailableResources: '#region-main_workflowbuilder_resourceassignment_availableresources',
            regionAssignedResources: '#region-main_workflowbuilder_resourceassignment_assignedresources'
        });
        this._viewAvailableResources = options.viewavailableresources;
        this._viewAssignedResources = options.viewassignedresources;
        this._workflow = options.workflow;
        this._inputPort = options.inputport;
    }

    /**
     * Unbind from events.
     */
    onDestroy()
    {
        Radio.channel('rodan').off(null, null, this);
        Radio.channel('rodan').stopReplying(null, null, this);
    }

    /**
     * Before the view shows we make sure the subviews are shown.
     */
    onBeforeShow()
    {
        this.regionAvailableResources.show(this._viewAvailableResources);
        this.regionAssignedResources.show(this._viewAssignedResources);
    }

    /**
     * Handle button add all.
     */
    _handleButtonAddAll()
    {
    }

    /**
     * Handle button add selected.
     */
    _handleButtonAddSelected()
    {
        $(this.regionAvailableResources.el).find('tr.active').trigger('dblclick');
    }

    /**
     * Handle button remove all.
     */
    _handleButtonRemoveAll()
    {
    }

    /**
     * Handle button remove selected.
     */
    _handleButtonRemoveSelected()
    {
        $(this.regionAssignedResources.el).find('tr.active').trigger('dblclick');
    }
}
LayoutViewResourceAssignment.prototype.template = '#template-main_workflowbuilder_resourceassignment';
LayoutViewResourceAssignment.prototype.ui = {
    buttonAddAll: '#button-add_all',
    buttonAddSelected: '#button-add_selected',
    buttonRemoveAll: '#button-remove_all',
    buttonRemoveSelected: '#button-remove_selected'
};
LayoutViewResourceAssignment.prototype.events = {
    'click @ui.buttonAddAll': '_handleButtonAddAll',
    'click @ui.buttonAddSelected': '_handleButtonAddSelected',
    'click @ui.buttonRemoveAll': '_handleButtonRemoveAll',
    'click @ui.buttonRemoveSelected': '_handleButtonRemoveSelected'
};