import { APIRequestContext } from "@playwright/test";

export async function getUserDetailByEmail(api: APIRequestContext, email: string) {
    return api.get(`${process.env.BASE_URL}/api/getUserDetailByEmail`, {
        params: { email },
    });
}
