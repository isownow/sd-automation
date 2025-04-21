import { Locator, Page } from "@playwright/test";

export class TestHelper {
    readonly page: Page;
    tab: Locator | undefined;

    constructor(page: Page, tab?: Locator) {
        this.page = page;
        this.tab = tab;
    }

    async getElementColor() {
        const elementColor = await this.tab?.evaluate((el) => {
            const rgb = window.getComputedStyle(el).color;
            return rgb
                .replace(/^rgb\(|\)$/g, "") // Remove "rgb("
                .split(", ") // Split into individual values
                .map((x) => parseInt(x).toString(16).padStart(2, "0")) // Convert to hex
                .join(""); // Join values together
        });

        return elementColor;
    }

    async getElementFillColor() {
        const elementFillColor = await this.tab?.evaluate((el) => {
            const rgb = window.getComputedStyle(el).backgroundColor; // Use backgroundColor
            return rgb
                .replace(/^rgb\(|\)$/g, "") // Remove "rgb("
                .split(", ") // Split into individual values
                .map((x) => parseInt(x).toString(16).padStart(2, "0")) // Convert to hex
                .join("");
        });

        return elementFillColor;
    }

    async getMainThemeColor() {
        const classNameForTheme = await this.page.evaluate(() => {
            const element = document.querySelector("html");
            return element?.className;
        });

        return classNameForTheme;
    }
}
