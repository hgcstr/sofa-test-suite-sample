import { shuffle } from "../utilities/utils";

export default class EcksofasPage {
  constructor(page) {
    this.page = page;
  }

  async getRandomProductsData(numElements) {
    //Getting elements with the same preffix "p-id-"
    const elementsLocator = await this.page.locator(
      'div[data-testid^="p-id-"]'
    );

    //counting the elements and doing a loop to interact with each and extract the data needed for the expects
    const elementsCount = await elementsLocator.count();
    //checking if the variable passed pass the total count or is less than 1
    if (numElements > elementsCount || numElements <= 0) {
      throw new Error(
        `Requested ${numElements} elements, but only got ${elementsCount}, or you requeste 0 elements`
      );
    }

    //generating an array of numbers to be shuffled/randomized
    const listOfNumbers = [];
    for (let i = 0; i < elementsCount; i++) {
      listOfNumbers.push(i);
    }

    //using the utils shuffle function
    const shuffledNumbers = shuffle(listOfNumbers);

    let productsData = [];

    for (let i = 0; i < numElements; i++) {
      const elementIndex = shuffledNumbers[i];
      const element = await elementsLocator.nth(elementIndex);
      const dataTestId = await element.getAttribute("data-testid");
      const id = dataTestId.substring(5);

      //Here I was not able to get the full innert text so I had to do it one by and concatenate
      const priceElements = [
        ".sc-jh9jpm-2.iszguK",
        ".sc-jh9jpm-3.YgrGf",
        ".sc-jh9jpm-5.GKAQq",
        ".sc-jh9jpm-0.iYEXaL",
      ];

      let price = "";
      for (const selector of priceElements) {
        const pricePart = await element.locator(selector).first().innerText();
        price += pricePart;
      }

      const productName = await element
        .locator(".sc-105y4a6-1.isZXiZ")
        .innerText();

      const wishlistButton = await element.getByTestId("wishlistHeart");

      //creating an array with all the info data needed including the wishlist button
      productsData = [
        ...productsData,
        { id, price, productName, wishlistButton },
      ];
    }

    return productsData;
  }

  async clickWishlistButton(wishlistButton) {
    await wishlistButton.click({ waitForNavigation: "load" });
  }
}
