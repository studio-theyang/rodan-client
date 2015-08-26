import ViewNavigationNode from './ViewNavigationNode';
import ViewNavigationNodeProject from './ViewNavigationNodeProject';

/**
 * This class represents a navigation menu node.
 */
class ViewNavigationNodeRoot extends ViewNavigationNode
{
///////////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initially hide everything.
     */
    onRender()
    {
        this._showSubviews();
    }

///////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initialize radio.
     */
    _initializeRadio()
    {
    }

    /**
     * Send click events.
     */
    _sendClickEvents()
    {
        this._rodanChannel.trigger(Events.EVENT__PROJECTS_SELECTED);
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
///////////////////////////////////////////////////////////////////////////////////////
ViewNavigationNodeRoot.prototype.ui = {
    text: '#node_text'
};
ViewNavigationNodeRoot.prototype.events = {
    'click @ui.text': '_handleClick'
};
ViewNavigationNodeRoot.prototype.template = '#template-navigation_root';
ViewNavigationNodeRoot.prototype.childView = ViewNavigationNodeProject;

export default ViewNavigationNodeRoot;