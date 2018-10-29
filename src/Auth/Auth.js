import auth0 from 'auth0-js';
import { log } from 'util';

const REDIRECT = 'http://localhost:3000/?/callback';
const SCOPE = 'openid profile';
const CLIENT_DOMAIN = 'rpg.au.auth0.com';
const CLIENT_ID = 'bftgr7BY2OZmj5RG1T727u8ypP8JuLjJ';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: CLIENT_DOMAIN,
      audience: `https://${CLIENT_DOMAIN}/userinfo`,
      clientID: CLIENT_ID,
      redirectUri: REDIRECT,
      responseType: 'token id_token',
      scope: SCOPE
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  getProfile() {  
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        resolve();
      });
    })
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No Access Token found');
    }
    return accessToken;
  }  

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    // clear id token, profile, and expiration
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
  }
}

const auth0Client = new Auth();

export default auth0Client;