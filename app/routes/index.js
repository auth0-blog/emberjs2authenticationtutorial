import Ember from 'ember';

export default Ember.Route.extend({

    auth: Ember.inject.service('auth'),
    
    api: Ember.inject.service('whistleblowerapi'),

    model() {
        return this.get('api').getActivities();
    }
});
