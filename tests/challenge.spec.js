//npx playwright codegen
//npx playwright test --project=chromium --headed
//
//npx playwright show-report
import { test, expect } from "@playwright/test";
import {
  generateRandomUserData,
  shuffle,
  convertPriceToNumber,
} from "../utilities/utils";

import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import CookiePopUpPage from "../pages/cookiePopUpPage";
import RegisterAccountPage from "../pages/registerAccountPage";
import CategoryPage from "../pages/categoryPage";
import WishlistPage from "../pages/wishlistPage";
import ShoppingCartPage from "../pages/shoppingCartPage";

// const userData = generateRandomUserData();
let userData;

test.describe("Login and registation tests", () => {
  test.beforeAll(async ({}) => {
    userData = generateRandomUserData();
  });

  test("1. Registration - Succesful", async ({ page }) => {
    await page.goto("registrierung");
    const homePage = new HomePage(page);
    const registerAccounPage = new RegisterAccountPage(page);
    const cookiePopUpPage = new CookiePopUpPage(page);

    await cookiePopUpPage.acceptCookies();
    await registerAccounPage.registerAccount(
      userData.gender,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password
    );

    expect(
      await homePage.getLoginCheckElement(userData.firstName, userData.lastName)
    ).toBeVisible();
  });

  test("2.1. Login - Succesful", async ({ page }) => {
    await page.goto("login");
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cookiePopUpPage = new CookiePopUpPage(page);

    await cookiePopUpPage.acceptCookies();
    await loginPage.login(userData.email, userData.password);
    expect(
      await homePage.getLoginCheckElement(userData.firstName, userData.lastName)
    ).toBeVisible();
  });

  test("2.2. Login - Failure", async ({ page }) => {
    await page.goto("login");
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cookiePopUpPage = new CookiePopUpPage(page);

    await cookiePopUpPage.acceptCookies();
    await loginPage.login(userData.email, userData.password + "wrongtext");
    expect(await loginPage.incorrectUserOrPw()).toBeVisible();
  });

  test("3. 1x Shopping Scenario", async ({ page }) => {
    await page.goto("login");
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cookiePopUpPage = new CookiePopUpPage(page);
    const wishlistPage = new WishlistPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const categoryPage = new CategoryPage(page);

    await cookiePopUpPage.acceptCookies();
    await loginPage.login(userData.email, userData.password);
    expect(
      await homePage.getLoginCheckElement(userData.firstName, userData.lastName)
    ).toBeVisible();

    //Visiting category page
    await page.goto(userData.category);

    //Getting the full list of items in the first page of the category page, random category per each test
    //
    const productsData = await categoryPage.getProductsData();
    //Using the utils function suffle to reandomize the elements and trimming the whole list to 5
    const randomProducts = shuffle(productsData).slice(0, 5);

    //Clicking the wishlist button per each product on the list of 5
    for (const product of randomProducts) {
      await categoryPage.clickWishlistButton(product.wishlistButton);
    }

    //Visiting Wishlist page
    await page.goto("wunschliste");

    //looping through the random products and retrieving data per product id stored before
    for (const product of randomProducts) {
      const wlProductData = await wishlistPage.retrieveWLProductData(
        product.id
      );

      //Cleaning inconsistencies in the product name due to the way elements are build that sometimes add more than one space in between and passing everything to lower case
      const formatWLProductName = wlProductData.productName
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      const formatProductName = product.productName
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

      expect(formatWLProductName).toBe(formatProductName);
      expect(wlProductData.price).toBe(product.price);
    }

    //adding zip code, adding items to shopping cart and going to shopping cart page
    await wishlistPage.addZipCode(userData.zipCode);
    await wishlistPage.addWLItemsToCart();
    await wishlistPage.goToShoppingCart();

    //lopping through the list of 5 random products again and doing an addition of the prices to use it later
    //getting each element matching the stored random products ids and doing the verification
    let totalProductsPrice = 0;
    for (const product of randomProducts) {
      totalProductsPrice =
        totalProductsPrice + convertPriceToNumber(product.price);

      expect(
        await shoppingCartPage.getArticleElement(product.id)
      ).toBeVisible();
    }

    // getting the value of goods (total price before shipping cost) and verifying with the stored total value
    // I had to format the values in order to get numeric values and I created a utils function for it
    const totalPriceInShoppingCart = convertPriceToNumber(
      await shoppingCartPage.getValueOfGoods()
    );

    expect(totalPriceInShoppingCart).toBe(totalPriceInShoppingCart);
  });
});
