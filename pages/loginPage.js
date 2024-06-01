export default class LoginPage {
  constructor(page) {
    this.page = page;
  }
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterLoginPassword(password);
    await this.clickLoginBtn();
  }

  async enterEmail(email) {
    await this.page.getByTestId("loginEmailInput").fill(email);
  }

  async enterLoginPassword(password) {
    await this.page.getByTestId("loginPasswordInput").fill(password);
  }

  async clickLoginBtn() {
    await this.page.getByTestId("login-submit").click();
  }

  async incorrectUserOrPw() {
    await this.page.waitForTimeout(2000);
    const incorrectUserOrPw = await this.page.getByText(
      "Benutzername nicht gefunden oder Passwort falsch."
    );
    return incorrectUserOrPw;
  }
}
