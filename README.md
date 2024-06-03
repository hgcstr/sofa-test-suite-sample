# SOFA.DE playwright test suite

This repository contains the configuration for running Playwright tests against www.sofa.de

## Configuration Overview

### Test Directory

The tests are located in the `tests` directory. And POM is being used, pages will be in the `pages` directory.

### Parallel Execution

Tests are not run in parallel since we want to have them reusing the same user data(`fullyParallel: false`).
Of course this can be improved however due to the scope I decided not to go deeper.


### Report
We are using playwright reports that are saving screenshots, videos, and trace on failure. 

## Running Tests Locally

To run the tests locally, ensure you have Node.js installed on your machine and the follow these steps.

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using npm:

   ```bash
   npm install
   ```

3. Install playwright:

   ```bash
   npx playwright install --with-deps
   ```

4. Run the tests:

   ```bash
   npx playwright test
   ```

## Running Tests Using Docker

To run the tests in docker, ensure you have Docker installed on your machine and the follow these steps.

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Build the docker image

   ```bash
   docker build -t playwright-tests .
   ```

3. Execute tests in the container:

   ```bash
   docker run --rm -it --name playwright-tests-container playwright-tests
   ```

