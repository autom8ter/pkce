import {
    Log,
    User,
    UserManager,
    SessionStatus,
    SignoutResponse
} from 'oidc-client';

const json = require('../config.json');

export class ApiClientService {
    public oidcService: OIDCService;
    constructor() {
        this.oidcService = new OIDCService();
    }
    private static async doFetch(url: string, method: string, token: string, body: any) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        if (body) {
            const response = await fetch(url, {
                headers: headers,
                method: method,
                body: JSON.stringify(body),
            })
            return response.json()
        }
        const response = await fetch(url, {
            headers: headers,
            method: method,
        })
        return response.json()
    }
    public authFetch(url: string, method: string, body: any): Promise<any> {
        return this.oidcService.getUser().then(user => {
            if (user && user.access_token) {
                return ApiClientService.doFetch(url, method, user.access_token, body).catch(error => {
                    if (error.response.status === 401) {
                        return this.oidcService.renewToken().then(renewedUser => {
                            return ApiClientService.doFetch(url, method, renewedUser.access_token, null);
                        });
                    }
                    throw error;
                });
            } else if (user) {
                return this.oidcService.renewToken().then(renewedUser => {
                    return ApiClientService.doFetch(url, method, renewedUser.access_token, body);
                });
            } else {
                throw new Error('user is not logged in');
            }
        });
    }
}

export interface OidcUser extends User{}

class OIDCService {
    public userManager: UserManager;
    constructor() {
        this.userManager = new UserManager({
            authority: json.authority,
            client_id: json.client_id,
            redirect_uri: json.redirect_uri,
            silent_redirect_uri: json.silent_redirect_uri,
            popup_redirect_uri: json.popup_redirect_uri,
            post_logout_redirect_uri: json.post_logout_redirect_uri,
            response_type: 'code',
            response_mode: 'query',
            prompt: 'none',
            scope: json.scope,
            revokeAccessTokenOnSignout: true
        });
        Log.logger = console;
    }
    public getUser(): Promise<OidcUser | null> {
        return this.userManager.getUser();
    }
    public removeUser(): Promise<void> {
        return this.userManager.removeUser();
    }
    public querySessionStatus(): Promise<SessionStatus> {
        return this.userManager.querySessionStatus();
    }
    public signinPopup(): Promise<OidcUser> {
        return this.userManager.signinPopup();
    }
    public signoutCallback(): Promise<SignoutResponse | void> {
        return this.userManager.signoutCallback();
    }
    public revokeAccessToken(): Promise<void> {
        return this.userManager.revokeAccessToken();
    }
    public renewToken(): Promise<OidcUser> {
        return this.userManager.signinSilent();
    }
    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }
    public signinSilentCallback(): Promise<OidcUser | void> {
        return this.userManager.signinSilentCallback();
    }
    public signinRedirectCallback(): Promise<OidcUser> {
        return this.userManager.signinRedirectCallback()
    }
    public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }
}