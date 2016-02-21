import BaseController from './BaseController';
import Events from '../Shared/Events';
import LayoutViewRunJob from '../Views/Master/Main/RunJob/LayoutViewRunJob';
import ViewRunJob from '../Views/Master/Main/RunJob/Individual/ViewRunJob';
import ViewRunJobList from '../Views/Master/Main/RunJob/List/ViewRunJobList';
import ViewRunJobListItem from '../Views/Master/Main/RunJob/List/ViewRunJobListItem';

/**
 * Controller for RunJob views.
 */
class ControllerRunJob extends BaseController
{
///////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initialize Radio.
     */
    _initializeRadio()
    {
        this.rodanChannel.reply(Events.REQUEST__RUNJOB_SHOWLAYOUTVIEW, options => this._handleCommandShowLayoutView(options));
        this.rodanChannel.on(Events.EVENT__RUNJOB_SELECTED, options => this._handleEventItemSelected(options));
   }

///////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Handle show LayoutView.
     */
    _handleCommandShowLayoutView(options)
    {
        this._layoutView = options.layoutView;
    }

    /**
     * Handle item selection.
     */
    _handleEventItemSelected(options)
    {
        this._layoutView.showItem(new ViewRunJob(options));
    }
}

export default ControllerRunJob;