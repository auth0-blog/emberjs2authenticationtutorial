import Ember from 'ember';
import decode from 'npm:jwt-decode';
import auth0 from 'npm:auth0-js';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'pcVcK2mKC0Gz5P42jC3ZqOxuPCxYv2Y7';
const CLIENT_DOMAIN = 'unicoder.auth0.com';
const REDIRECT = 'http://localhost:4200/callback';
const SCOPE = 'full_access';
const AUDIENCE = 'http://whistleblower.com';

export default Ember.Service.extend({

    auth: new auth0.WebAuth({
        clientID: CLIENT_ID,
        domain: CLIENT_DOMAIN
    }),

    login() {
        this.get('auth').authorize({
            responseType: 'token id_token',
            redirectUri: REDIRECT,
            audience: AUDIENCE,
            scope: SCOPE
        });
    },

    logout() {
        this.clearIdToken();
        this.clearAccessToken();
        window.location.href = "/";
    },

    getIdToken() {
        return localStorage.getItem(ID_TOKEN_KEY);
    },

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    clearIdToken() {
        localStorage.removeItem(ID_TOKEN_KEY);
    },

    clearAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    },

    // Helper function that will allow us to extract the access_token and id_token
    getParameterByName(name) {
        let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },

    // Get and store access_token in local storage
    setAccessToken() {
        let accessToken = this.getParameterByName('access_token');
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    },

    // Get and store id_token in local storage
    setIdToken() {
        let idToken = this.getParameterByName('id_token');
        localStorage.setItem(ID_TOKEN_KEY, idToken);
    },

    isLoggedIn() {
        const idToken = this.getIdToken();
        return !!idToken && !this.isTokenExpired(idToken);
    },

    getTokenExpirationDate(encodedToken) {
        const token = decode(encodedToken);
        if (!token.exp) { return null; }

        const date = new Date(0);
        date.setUTCSeconds(token.exp);

        return date;
    },

    isTokenExpired(token) {
        const expirationDate = this.getTokenExpirationDate(token);
        return expirationDate < new Date();
    }
});
