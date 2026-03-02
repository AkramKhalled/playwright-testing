import { APIRequestContext } from "@playwright/test";

export async function getBrands(api: APIRequestContext) {
    return await api.get(`${process.env.BASE_URL}/api/brandsList`);
}

export async function postBrand(api: APIRequestContext) {
    return await api.put(`${process.env.BASE_URL}/api/brandsList`);
}