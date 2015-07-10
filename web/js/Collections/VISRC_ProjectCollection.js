import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import VISRC_Events from '../Shared/VISRC_Events'
import VISRC_Project from '../Models/VISRC_Project'

class VISRC_ProjectCollection extends Backbone.Collection
{
///////////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * TODO docs
     */
    initialize(aParameters)
    {
        this.model = VISRC_Project;
        this._initializeRadio();
    }

    /**
     * TODO docs
     */
    parse(resp, options)
    {
        return resp.results;
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
        this.rodanChannel.comply(VISRC_Events.COMMAND__LOAD_PROJECTS, aQueryParameters => this._retrieveList(aQueryParameters));
        this.rodanChannel.reply(VISRC_Events.REQUEST__COLLECTION_PROJECT, () => this._handleRequestInstance());
    }

    /**
     * Retrieves list.
     */
    _retrieveList(aQueryParameters)
    {
        this.url = this.rodanChannel.request(VISRC_Events.REQUEST__SERVER_ROUTE, 'projects');
        this.fetch();//{ data: $.param(aQueryParameters) });
    }

    /**
     * Returns this instance.
     */
    _handleRequestInstance()
    {
        return this;
    }
}

export default VISRC_ProjectCollection;