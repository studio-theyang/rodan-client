import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import Events from '../../../../../../../Shared/Events';
import ViewResourceAssignmentListItem from './ViewResourceAssignmentListItem';

/**
 * This class represents the collection view for resource assignment.
 */
class ViewResourceAssignmentList extends Marionette.CompositeView
{
///////////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * TODO docs
     */
    initialize()
    {
        this.modelEvents = {
            'all': 'render'
        };
        this._initializeRadio();
        this.childViewContainer = 'tbody';
        this.template = '#template-main_workflowbuilder_control_resourceassignment_list';
        this.childView = ViewResourceAssignmentListItem;
        var project = this.rodanChannel.request(Events.REQUEST__PROJECT_ACTIVE);
        this.collection = this.rodanChannel.request(Events.REQUEST__COLLECTION_RESOURCE);
        this.rodanChannel.command(Events.COMMAND__LOAD_RESOURCES, {project: project.id});
    }

    /**
     * Initially show the list.
     */
    onBeforeShow()
    {
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
}

export default ViewResourceAssignmentList;