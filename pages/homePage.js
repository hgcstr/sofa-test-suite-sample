export default class HomePage {
  constructor(page) {
    this.page = page;
  }

  async getLoginCheckElement(name, lastname) {
    await this.page.waitForTimeout(2000);
    const loginCheck = await this.page.getByRole("link", {
      name: `${name} ${lastname}`,
    });
    return loginCheck;
  }
}
