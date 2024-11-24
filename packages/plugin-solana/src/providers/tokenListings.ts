import { settings } from "@ai16z/eliza";
import { BaseTokenInfo, BirdeyeTokenListType } from "../types/tokenListings";
import { PROVIDER_CONFIG } from "./tokenUtils";

async function fetchBirdeyeTokenListings(
    type: BirdeyeTokenListType
): Promise<BaseTokenInfo[]> {
    const endpoint = type === BirdeyeTokenListType.NEW_LISTINGS ? PROVIDER_CONFIG.NEW_TOKEN_LISTINGS_ENDPOINT : PROVIDER_CONFIG.TOKEN_TRENDING_ENDPOINT;
    const url = `${PROVIDER_CONFIG.BIRDEYE_API}${endpoint}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "X-API-KEY": settings.BIRDEYE_API_KEY || "",
            "x-chain": "solana",
        },
    };

    const data = await this.fetchWithRetry(url, options);
    if (!data?.success || !data?.data) {
        throw new Error("No token trade data available");
    }
    const tokenListings: BaseTokenInfo[] = data.data.map((token: any) => ({
        address: token.address,
        name: token.name,
        symbol: token.symbol
    }));
    return tokenListings;
}
