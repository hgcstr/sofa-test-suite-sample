const faker = require("faker");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateRandomUserData() {
  return {
    gender: faker.random.arrayElement(["male", "female", "genderneutral"]),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: Math.floor(Math.random() * 100) + faker.internet.email(),
    password: "@12345" + faker.internet.password(),
    category: faker.random.arrayElement([
      "ecksofas",
      "wohnlandschaften",
      "schlafsofas",
      "einzelsofas",
      "sessel-hocker",
      "tische",
      "alle-accessoires",
    ]),
    zipCode: faker.random.arrayElement(["10243", "10115", "10319", "12681"]),
  };
}

function convertPriceToNumber(priceString) {
  let numericString = priceString
    .replace("€", "")
    .replace(".", "")
    .replace(",", ".");
  return parseFloat(numericString);
}
module.exports = { generateRandomUserData, shuffle, convertPriceToNumber };
