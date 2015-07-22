import BaseModel from './BaseModel';

/**
 * WorkflowRun model.
 */
class WorkflowRun extends BaseModel
{
///////////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initialize.
     */
    initialize(aParameters)
    {
        this.routeName = 'workflowruns';
        this.set('statusText', this._getStatusText(this.get('status')));
    }

///////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Return text based on status.
     */
    _getStatusText(aStatus)
    {
        switch(aStatus)
        {
            case -1:
            {
                return 'Failed';
            }

            case 0:
            {
                return 'Scheduled';
            }

            case 1:
            {
                return 'Processing';
            }

            case 2:
            {
                return 'Waiting for input';
            }

            case 4:
            {
                return 'Finished';
            }

            case 8:
            {
                return 'Expired';
            }

            case 9:
            {
                return 'Cancelled';
            }

            case 11:
            {
                return 'Retrying';
            }

            default:
            {
                return 'Unknown status';
            }
        }
    }
}

export default WorkflowRun;