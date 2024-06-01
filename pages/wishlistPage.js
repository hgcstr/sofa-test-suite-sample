export default class WishlistPage {
  constructor(page) {
    this.page = page;
  }

  async retrieveWLProductData(productId) {
    const wlProductLocator = await this.page.locator(
      `[data-wishlist-entry-id="${productId}"]`
    );
    const wlProduct = await wlProductLocator.first();

    const productName = await wlProduct
      .locator(".articleFullName.articleFullName__wishlistEntry")
      .innerText();

    const priceElement = await wlProduct.locator(
      ".priceNew.priceNew--l.priceNew--strong"
    );
    const unformattedPrice = await priceElement.innerText();
    const price = unformattedPrice.replace(/\n|\s/g, "");

    const wlProducData = { price, productName };
    return wlProducData;
  }

  async addZipCode(zipCode) {
    await this.page
      .getByTestId("zipcode-logistic-inputInput")
      .first()
      .fill(zipCode);
  }

  async addWLItemsToCart() {
    await this.page.waitForTimeout(1000);
    await this.page.getByTestId("addAddToWishlist").click();
  }

  async goToShoppingCart() {
    await this.page
      .getByTestId("cartOverlayToCartButton")
      .first()
      .click({ waitForNavigation: "load" });
  }
}

// <button class="button button--addToCart" id="addAddToWishlist" data-testid="addAddToWishlist" name="addAddToWishlist" type="button"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Add all items to cart</font></font></button>
