import { APIRequestContext } from "@playwright/test";

export async function deleteAccount(api: APIRequestContext, email: string, password: string) {
    return api.delete(`${process.env.BASE_URL}/api/deleteAccount`, {
        form: {
            email,
            password,
        },
    });
}
