import Ember from 'ember';

export default Ember.Route.extend({

    api: Ember.inject.service('whistleblowerapi'),

    model() {
        return this.get('api').getActivities();
    }
});
