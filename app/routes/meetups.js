import Ember from 'ember';

export default Ember.Route.extend({

    auth: Ember.inject.service('auth'),

    api: Ember.inject.service('whistleblowerapi'),
    
    beforeModel() {
        if(!this.get('auth').isLoggedIn()) {
            this.transitionTo('/');
        }
    },

    model() {
        return this.get('api').getMeetups();
    }
});
