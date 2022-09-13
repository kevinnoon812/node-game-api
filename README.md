# Decks and Cards Game API Integration

> Decks and Cards Game API Integration

## Installation

```bash
$ npm install
```

## Bulding the app and Running the app

Confirm .env variables.

```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
PORT=
NODE_ENV=development
```

### Running scripts

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Using Docker

```bash
# Build docker image
$ docker build -t docker-nest-js .

# Run the image interactively
$ docker run -it -p 4000:4000 docker-nest-js
```

### Using Docker compose

```bash
# Build the docker image
$ docker-compose build

# Start and login to the container
$ docker-compose up -d
$ docker-compose exec app sh
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
