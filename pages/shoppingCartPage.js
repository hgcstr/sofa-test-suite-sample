export default class ShoppingCartPage {
  constructor(page) {
    this.page = page;
  }

  async getArticleElement(productId) {
    const articleElement = this.page.locator(
      `[data-article-number="${productId}"]`
    );
    return articleElement;
  }

  async getValueOfGoods() {
    const summaryBox = await this.page.locator(
      ".summaryBox.summaryBox--cartOverview"
    );

    const valueOfGoodsElement = await summaryBox
      .locator(".articlePrice")
      .first();
    const unformattedValueOfGoods = await valueOfGoodsElement.innerText();
    const valueOfGoods = unformattedValueOfGoods.replace(/\n|\s/g, "");
    return valueOfGoods;
  }
  //
}
