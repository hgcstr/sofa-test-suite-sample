# docker build -t playwright-tests .
#docker run --rm -it playwright-tests

FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Install Playwright browsers
RUN npx playwright install --with-deps

COPY . .

CMD ["npx", "playwright", "test"]