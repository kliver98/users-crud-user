const { Verifier } = require('@pact-foundation/pact');
const nock = require('nock');

// Setup provider server to verify
const app = require('express')();
app.use('/api/latest/users', require('../../../routes/users'));
const server = app.listen("3000");

let users = [{
    _id:100000,
    username:"admin"
}]

describe("Pact Verification", () => {
    beforeEach(() => {
        nock(process.env.API)
          .get('/api/latest/users')
          .reply(200, users);
    });

    it("validates the expectations of UserService", () => {
        const opts = {
            logLevel: "INFO",
            pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
            providerBaseUrl: process.env.API,
            provider: "UsersCrudUser",
            pactBrokerToken: process.env.PACT_BROKER_TOKEN
        };

        if (process.env.CI || process.env.PACT_PUBLISH_RESULTS) {
            Object.assign(opts, {
                publishVerificationResult: true,
            });
        }

        return new Verifier(opts).verifyProvider().then(output => {
            // console.log(output);
        }).finally(() => {
            server.close();
        });
    })
});