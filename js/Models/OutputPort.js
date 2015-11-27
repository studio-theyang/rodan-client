import BaseModel from './BaseModel';

/**
 * InputPort.
 */
class OutputPort extends BaseModel
{
///////////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * TODO docs
     */
    initialize()
    {
        this.routeName = 'outputports';
    }

    defaults()
    {
        return {label: null};
    }

    /**
     * Returns human-readable descriptive text.
     */
    getDescription()
    {
        return this.get('label');
    }

///////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
///////////////////////////////////////////////////////////////////////////////////////
}

export default OutputPort;