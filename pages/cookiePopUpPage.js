export default class CookiePopUpPage {
  constructor(page) {
    this.page = page;
  }
  async acceptCookies() {
    await this.page
      .getByRole("button", { name: "Alle auswählen & bestätigen" })
      .click();
  }
}
