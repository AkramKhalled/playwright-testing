import { APIRequestContext } from "@playwright/test";

export async function verifyLogin(api: APIRequestContext, email: string, password: string) {
    return api.post(`${process.env.BASE_URL}/api/verifyLogin`, {
        form: {
            email,
            password,
        },
    });
}

export async function verifyLoginWithoutEmail(api: APIRequestContext, password: string) {
    return api.post(`${process.env.BASE_URL}/api/verifyLogin`, {
        form: {
            password,
        },
    });
}

export async function verifyLoginDelete(api: APIRequestContext) {
    return api.delete(`${process.env.BASE_URL}/api/verifyLogin`);
}
