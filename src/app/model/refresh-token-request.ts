export class RefreshTokenRequest {
    private _refreshToken: string;

    public get refreshToken() {
        return this._refreshToken;
    }

    public set refreshToken(value: string) {
        this._refreshToken = value;
    }
}