import { Locator } from '@playwright/test';

export async function uploadFile(fileInput: Locator, filePath: string) {
    await fileInput.setInputFiles(filePath);
}