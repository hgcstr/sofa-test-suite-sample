# docker build -t playwright-tests .
#docker run --rm -it playwright-tests
# docker run --rm -it --name playwright-tests-container playwright-tests
#docker cp playwright-tests-container:/usr/src/app/playwright-report ./playwright-report

FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Install Playwright browsers
RUN npx playwright install --with-deps

COPY . .

CMD ["npx", "playwright", "test"]
# CMD ["npx", "playwright", "test", "--trace", "on"]