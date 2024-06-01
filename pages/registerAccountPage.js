export default class RegisterAccountPage {
  constructor(page) {
    this.page = page;
  }

  async registerAccount(gender, name, lastname, email, pw) {
    await this.selectGender(gender);
    await this.enterFirstName(name);
    await this.enterLastName(lastname);
    await this.enterEmail(email);
    await this.enterPassword(pw);
    await this.checkAGB();
    await this.submitRegistration();
  }

  async selectGender(gender) {
    //'genderneutral'
    await this.page.getByTestId("salutation").selectOption(gender);
  }

  async enterFirstName(name) {
    await this.page.getByTestId("firstNameInput").fill(name);
  }

  async enterLastName(lastname) {
    await this.page.getByTestId("lastNameInput").fill(lastname);
  }

  async enterEmail(email) {
    await this.page.getByLabel("E-Mail-Adresse*").fill(email);
  }

  async enterPassword(pw) {
    await this.page.getByTestId("passwordInput").fill(pw);
    await this.page.getByTestId("password2Input").fill(pw);
  }

  async checkAGB() {
    await this.page.getByTestId("agbCheckbox").click();
  }

  async submitRegistration() {
    await this.page.getByTestId("register-submit").click();
  }
}
