import Ember from 'ember';
import axios from 'npm:axios';

const ACCESS_TOKEN_KEY = 'access_token';
const BASE_URL = 'http://localhost:3333';

export default Ember.Service.extend({

    getMeetups() {
        const url = `${BASE_URL}/api/meetups`;
        return axios.get(url, { headers: { Authorization: `Bearer ${this.getAccessToken()}` }}).then(response => response.data);
    },

    getWhistleBlowers() {
        const url = `${BASE_URL}/api/whistleblowers`;
        return axios.get(url, { headers: { Authorization: `Bearer ${this.getAccessToken()}` }}).then(response => response.data);
    },

    getActivities() {
        const url = `${BASE_URL}/api/activities`;
        return axios.get(url);
    },

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
});
