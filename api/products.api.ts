import { APIRequestContext } from "@playwright/test";

export async function getProducts(api: APIRequestContext) {
    return await api.get(`${process.env.BASE_URL}/api/productsList`);
}

export async function postProduct(api: APIRequestContext) {
    return await api.post(`${process.env.BASE_URL}/api/productsList`);
}