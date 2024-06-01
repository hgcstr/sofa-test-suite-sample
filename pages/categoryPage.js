export default class EcksofasPage {
  constructor(page) {
    this.page = page;
  }

  async getProductsData() {
    //Getting elements with the same preffix "p-id-"
    const elementsLocator = await this.page.locator(
      'div[data-testid^="p-id-"]'
    );

    //counting the elements and doing a loop to interact with each and extract the data needed for the expects
    const elementsCount = await elementsLocator.count();
    let productsData = [];

    for (let i = 0; i < elementsCount; i++) {
      const element = await elementsLocator.nth(i);
      const dataTestId = await element.getAttribute("data-testid");
      const id = dataTestId.substring(5);

      //Here I was not able to get the full innert text so I had to do it one by and and concatenate later
      const priceElement1 = await element
        .locator(".sc-jh9jpm-2.iszguK")
        .first()
        .innerText();
      const priceElement2 = await element
        .locator(".sc-jh9jpm-3.YgrGf")
        .first()
        .innerText();
      const priceElement3 = await element
        .locator(".sc-jh9jpm-5.GKAQq")
        .first()
        .innerText();
      const priceElement4 = await element
        .locator(".sc-jh9jpm-0.iYEXaL")
        .first()
        .innerText();

      const price =
        priceElement1 + priceElement2 + priceElement3 + priceElement4;

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
    await wishlistButton.click();
  }
}
