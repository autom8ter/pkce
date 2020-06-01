import {
    Log,
    User,
    UserManager,
    SessionStatus,
    SignoutResponse
} from 'oidc-client';

export interface OidcUser extends User{}

export interface Config {
    authority: string,
    client_id: string,
    redirect_uri: string,
    post_logout_redirect_uri: string
    silent_redirect_uri?: string
    popup_redirect_uri?: string
    scope?: string
}

export class OIDCService {
    public userManager: UserManager;
    constructor(config: Config) {
        if (config.scope) {
            config.scope = "openid email profile"
        }
        this.userManager = new UserManager({
            authority: config.authority,
            client_id: config.client_id,
            redirect_uri: config.redirect_uri,
            silent_redirect_uri: config.silent_redirect_uri,
            popup_redirect_uri: config.popup_redirect_uri,
            post_logout_redirect_uri: config.post_logout_redirect_uri,
            response_type: 'code',
            response_mode: 'query',
            prompt: 'none',
            scope: config.scope,
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