import { APIRequestContext } from "@playwright/test";

export interface UpdateAccountPayload {
    name: string;
    email: string;
    password: string;
    title: string;
    birth_date: string;
    birth_month: string;
    birth_year: string;
    firstname: string;
    lastname: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    zipcode: string;
    state: string;
    city: string;
    mobile_number: string;
}

export async function updateAccount(api: APIRequestContext, payload: UpdateAccountPayload) {
    return api.put(`${process.env.BASE_URL}/api/updateAccount`, {
        form: payload,
    });
}
