import BaseViewListItem from 'js/Views/Master/Main/BaseViewListItem';
import RODAN_EVENTS from 'js/Shared/RODAN_EVENTS';
import Radio from 'backbone.radio';

/**
 * Project list item view.
 */
export default class ViewProjectCollectionItem extends BaseViewListItem
{
///////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Handles double click.
     */
    _handleDoubleClick()
    {
        Radio.channel('rodan').trigger(RODAN_EVENTS.EVENT__PROJECT_SELECTED, {project: this.model});
    }
}
ViewProjectCollectionItem.prototype.template = '#template-main_project_list_item';
ViewProjectCollectionItem.prototype.tagName = 'tr';
ViewProjectCollectionItem.prototype.events = {
    'dblclick': '_handleDoubleClick'
};