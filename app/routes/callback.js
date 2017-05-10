import Ember from 'ember';

export default Ember.Route.extend({

    auth: Ember.inject.service('auth'),
    
    beforeModel() {
        this.get('auth').setAccessToken();
        this.get('auth').setIdToken();
        this.transitionTo('/');
    },
});
