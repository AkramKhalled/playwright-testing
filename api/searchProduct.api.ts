import { APIRequestContext } from "@playwright/test";

export async function searchProduct(api: APIRequestContext, productName: string) {
  return api.post(`${process.env.BASE_URL}/api/searchProduct`, {
    form: {
      search_product: productName,
    },
  });
}

export async function searchProductWithoutParameter(api: APIRequestContext) {
  return api.post(`${process.env.BASE_URL}/api/searchProduct`, {
    form: {},
  });
}