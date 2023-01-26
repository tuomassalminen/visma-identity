# Request identifier

This is a solution for Visma Solutions developer trainee pre-assignment

## Prerequisites

To run the application Node and npm have to be installed on your machine. If you haven't installed Node or npm, it can be done easily with nvm. Nvm can be downloaded by running this script:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

Then node can be installed by:

```sh
nvm install node
```

#### Running the app

Run `npm install` to install the dependencies

Run `npm run client "uri"` to test the RequestIdentifier class with different uris. Replace "uri" with a string of your choice, for example `npm run client "visma-identity://login?source=severa"`. If run with an invalid uri string, an appropriate error will be printed to the terminal. If the uri string has the `&` character, for example in `"visma-identity://confirm?source=netvisor&paymentnumber=102226"`, please add `^` in front of the `&` character like this: `"visma-identity://confirm?source=netvisor^&paymentnumber=102226"`. Otherwise it won't work, at least with Windows.

## Running the tests

Running `npm test` will start the unit tests for RequestIdentifier class.
