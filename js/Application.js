import moment from 'moment';
import _ from 'underscore';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import BehaviorTable from './Behaviors/BehaviorTable';
import Configuration from './Configuration';
import ControllerAuthentication from './Controllers/ControllerAuthentication';
import ControllerServer from './Controllers/ControllerServer';
import ErrorHandler from './Shared/ErrorHandler';
import Events from './Shared/Events';
import EventTimer from './Shared/EventTimer';
import InputPortCollection from './Collections/InputPortCollection';

import GlobalInputPortTypeCollection from './Collections/Global/GlobalInputPortTypeCollection';
import GlobalJobCollection from './Collections/Global/GlobalJobCollection';
import GlobalResourceTypeCollection from './Collections/Global/GlobalResourceTypeCollection';
import GlobalOutputPortTypeCollection from './Collections/Global/GlobalOutputPortTypeCollection';
import GlobalProjectCollection from './Collections/Global/GlobalProjectCollection';

import LayoutViewMaster from './Views/Master/LayoutViewMaster';
import RunJobCollection from './Collections/RunJobCollection';
import ResourceCollection from './Collections/ResourceCollection';
import WorkflowRunCollection from './Collections/WorkflowRunCollection';

/**
 * Main app class.
 */
class Application extends Marionette.Application
{
///////////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initialize the app.
     */
    initialize()
    {

        this.addRegions({
            regionMaster: '#region-master'
        });

        // Non-network and non-GUI inits. Do these first.
        this._initializeBehaviors();
        this._initializeDateTimeFormatter();
        this._initializeRadio();
        this._initializeCollections();
        
        this._initializeAjaxPrefilters();
        this._initializeViews();
        this._initializeControllers();
        this._errorHandler = new ErrorHandler();
        this._eventTimer = new EventTimer({frequency: Configuration.EVENT_TIMER_FREQUENCY});
    }

    /**
     * When app is ready, start communicating.
     */
    onStart()
    {/*
        this.rodanChannel.request(Events.REQUEST__SET_TIMED_EVENT, {event: Events.EVENT__TIMER_TEST, options: {}});
        this.rodanChannel.request(Events.REQUEST__SET_TIMED_REQUEST, {request: Events.REQUEST__TIMER_TEST, 
                                                                      options: {}, 
                                                                      callback: (response) => this.timerRequestCallback(response)});*/
        this.rodanChannel.request(Events.REQUEST__SERVER_GET_ROUTES);
    }

    /**
     * Timer request callback test.
     */
    timerRequestCallback(response)
    {
        console.log('Callback response: ' + response);
    }

///////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
///////////////////////////////////////////////////////////////////////////////////////
    /**
     * Initializes various helpers.
     */
    _initializeDateTimeFormatter()
    {
        moment.defaultFormat = Configuration.DATETIME_FORMAT;
        _.formatFromUTC = function(dateTime)
        {
            return moment(dateTime).format();
        };
    }

    /**
     * Initialize behaviors.
     */
    _initializeBehaviors()
    {
        Marionette.Behaviors.behaviorsLookup = function()
        {
            return {'Table': BehaviorTable};
        }
    }

    /**
     * Set event binding.
     */
    _initializeRadio()
    {
        this.rodanChannel = Radio.channel('rodan');
        this.rodanChannel.on(Events.EVENT__SERVER_ROUTESLOADED, () => this._handleEventRoutesLoaded());
        this.rodanChannel.on(Events.EVENT__AUTHENTICATION_SUCCESS, () => this._handleAuthenticationSuccess());
    }

    /**
     * Initialize controllers. These are not used for viewing; rather, they are server/auth control.
     */
    _initializeControllers()
    {
        this.controllerServer = new ControllerServer();
        this.controllerAuthentication = new ControllerAuthentication(this.controllerServer);
    }

    /**
     * Initialize AJAX prefilters. This allows the application a lower level of request monitoring (if desired).
     */
    _initializeAjaxPrefilters()
    {
        var that = this;
        $.ajaxPrefilter(function(options) {
            that.controllerAuthentication.ajaxPrefilter(options);
        });
    }

    /**
     * Initialize collections.
     */
    _initializeCollections()
    {
        this.jobCollection = new GlobalJobCollection();
        this.resourceTypeCollection = new GlobalResourceTypeCollection();
        this.inputPortTypeCollection = new GlobalInputPortTypeCollection();
        this.outputPortTypeCollection = new GlobalOutputPortTypeCollection();
        this.projectCollection = new GlobalProjectCollection();

        this.inputPortCollection = new InputPortCollection();
        this.resourceCollection = new ResourceCollection();
        this.runJobCollection = new RunJobCollection();
        this.workflowRunCollection = new WorkflowRunCollection();
    }

    /**
     * Initialize all the views so they can respond to events.
     */
    _initializeViews()
    {
        this._layoutViewMaster = new LayoutViewMaster();
    }

    /**
     * Handle EVENT__SERVER_ROUTESLOADED.
     */
    _handleEventRoutesLoaded()
    {
        // Render layout views.
        this.regionMaster.show(this._layoutViewMaster);

        // Send event that the app has started.
        this.rodanChannel.trigger(Events.EVENT__APPLICATION_READY);

        // Check authentication.
        this.rodanChannel.request(Events.REQUEST__AUTHENTICATION_CHECK); 
    }

    /**
     * Handle authentication success.
     */
    _handleAuthenticationSuccess()
    {
        var user = this.rodanChannel.request(Events.REQUEST__AUTHENTICATION_USER);
        this.rodanChannel.request(Events.REQUEST__LOAD_PROJECTS, {query: {user: user.get('uuid'), disable_pagination: 'True'}});
        this.rodanChannel.request(Events.REQUEST__LOAD_INPUTPORTTYPES, {query: {disable_pagination: 'True'}});
        this.rodanChannel.request(Events.REQUEST__LOAD_OUTPUTPORTTYPES, {query: {disable_pagination: 'True'}});
        this.rodanChannel.request(Events.REQUEST__RESOURCETYPES_LOAD, {query: {disable_pagination: 'True'}});
        this.rodanChannel.request(Events.REQUEST__LOAD_JOBS, {query: {enabled: 'True', disable_pagination: 'True'}});
        this.rodanChannel.trigger(Events.EVENT__PROJECTS_SELECTED); 
    }
}

export default Application;