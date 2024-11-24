export interface BaseTokenInfo {
    address: string;
    name: string;
    symbol: string;
}

export enum BirdeyeTokenListType {
    NEW_LISTINGS = "new_listings",
    TOKEN_TRENDING = "token_trending"
}