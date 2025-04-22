import {
    test,
    expect,
    Locator,
    request,
    APIRequestContext,
} from "@playwright/test";
import { TestHelper } from "../../page-objects/TestHelper";
import { tabs, dropDowns } from "../constants/tob-bar-elements";

test.describe("Top Bar Elements", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(`${baseURL}`);
    });

    test("Visual test homepage", async ({ page }) => {
        await expect(page).toHaveScreenshot();
    });

    Object.entries(tabs).forEach(([tabName, colors]) => {
        test(
            `mouse hovers on the ${tabName} tab`,
            { tag: ["@sample1", "@sample2"] },
            async ({ page }) => {
                let tabLocator: Locator;
                let tabNormalColor: string | null | undefined;
                let tabColor: string | null | undefined;

                if (tabName === "Phone Icon") {
                    tabLocator = page.locator("svg.phone-icon");
                } else if (tabName === "Log In") {
                    tabLocator = page.getByText("Log In", { exact: true });
                } else if (tabName === "Nine Square Icon") {
                    tabLocator = page.locator("svg.nineSquareIcon");
                    tabNormalColor = await page.getAttribute(
                        "svg.nineSquareIcon path",
                        "fill",
                    );
                    tabColor = tabNormalColor;
                } else {
                    tabLocator = page.getByRole("link", { name: tabName });
                }

                const testHelper = new TestHelper(page, tabLocator);
                const classNameForTheme = await testHelper.getMainThemeColor();
                let textColor: string | undefined;
                let hoverTextColor: string | undefined;

                // Get the text color of the tab
                if (tabName !== "Nine Square Icon") {
                    tabNormalColor = await testHelper.getElementColor();
                    tabNormalColor = `#${tabNormalColor}`;
                }

                // Determine the original text color of the tab depending on the theme
                if (classNameForTheme === "indian_dark") {
                    textColor = colors.normalDark;
                    hoverTextColor = colors.hoverDark;
                } else {
                    textColor = colors.normalLight;
                    hoverTextColor = colors.hoverLight;
                }

                // Validate the color of the tab
                expect(tabNormalColor).toEqual(textColor),
                    "Original tab color is not correct";

                // Hover on the the tab
                await tabLocator.hover();

                // Get the text color of the hovered tab
                const tabHoveredColor = await testHelper.getElementColor();

                // Validate the color of the tab when mouse hovers on it
                expect(`#${tabHoveredColor}`).toEqual(hoverTextColor),
                    "Mouse hover color is not correct";

                // Move the cursor away from the hovered tab
                await page.mouse.move(0, 0);

                // Again get the color of the tab when mouse is NOT hovering on it
                if (tabName !== "Nine Square Icon") {
                    tabColor = await testHelper.getElementColor();
                    tabColor = `#${tabColor}`;
                }

                // Validate the color of the tab when mouse is NOT hovering on it
                expect(tabColor).toEqual(textColor),
                    "After removing the mouse pointer, original color is not correct";
            },
        );
    });

    Object.entries(dropDowns).forEach(([menuName, data]) => {
        test(`mouse hovers on the ${menuName} tab`, async ({ page }) => {
            const menuLocator = page.locator(data.menuClassName);
            const submenuLocator = page.locator(data.subMenuClassName);
            const submenuItems = page.locator(data.subMenuItemsClassName);

            // Hover over the main menu item
            await menuLocator.hover();

            // Validate that the sub menu is visible
            await expect(submenuLocator).toBeVisible();

            // Validate the number of items present in the sub menu
            expect(await submenuItems.all()).toHaveLength(
                data.numOfSubmenuItems,
            );
        });
    });

    test("user clicks on the search box", async ({ page }) => {
        const searchBox = page.getByPlaceholder("Search");
        const suggestionMenu = page.locator(".header-dropdown-container");

        // Click on the search box
        await searchBox.click();

        // Validate whether the auto suggestion menu is visible
        await expect(suggestionMenu).toBeVisible();
    });

    test("user types in the search box", async ({ page }) => {
        const searchBox = page.getByPlaceholder("Search");
        const suggestionMenu = page.locator(".header-dropdown-container");

        // Type something in the search box
        await searchBox.pressSequentially("do", { delay: 2000 });

        // Validate whether the correct data is entered in the search box
        await expect(searchBox).toHaveValue("do");

        // Validate whether the auto suggestion menu is visible
        await expect(suggestionMenu).toBeVisible();

        const suggestions = page.locator(
            ".category-container > div > .coin-row",
        );

        // Validate whether the auto suggestion shows 5 suggestions
        expect(await suggestions.all()).toHaveLength(5);
    });
});

test.describe("API Testing Example", () => {
    let apiContext: APIRequestContext;

    test.beforeAll(async () => {
        apiContext = await request.newContext({
            ignoreHTTPSErrors: true,
        });
    });

    test("get products", async () => {
        const apiResponse = await apiContext.get(
            "https://api.india.delta.exchange/v2/products",
            {
                headers: { Accept: "application/json" },
            },
        );

        // Validate whether response is OK
        expect(apiResponse.ok).toBeTruthy();

        // Validate whether the staus code is 200
        expect(apiResponse.status()).toBe(200);
    });
});
