import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('meetups');
  this.route('whistle-blowers');
  this.route('callback');
});

export default Router;
