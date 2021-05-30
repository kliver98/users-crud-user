const { Verifier } = require('@pact-foundation/pact');
const nock = require('nock');

// Setup provider server to verify
const app = require('express')();
app.use('/api/latest/users', require('../../../routes/users'));
const server = app.listen("3000");

//Variables needed
const user_id = 100001
const user_id_created = 100002
const users = [{
    _id:0,
    username:"admin"
}]
const message_deleted = `Information: User [${user_id}] deleted successfully`
const message_created = `Information: user with id [${user_id_created}] created successfully`

describe("Pact Verification", () => {
    beforeAll(() => {
        nock(process.env.API)
          .delete(`/api/latest/users/${user_id}`)
          .reply(200, message_deleted);
        nock(process.env.API)
          .get('/api/latest/users')
          .reply(200, users);
        nock(process.env.API)
          .post('/api/latest/users')
          .reply(201, message_created);
    });

    it("validates the expectations of UserService", () => {
        const opts = {
            logLevel: "INFO",
            pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
            providerBaseUrl: process.env.API,
            provider: "UsersCrudUser",
            pactBrokerToken: process.env.PACT_BROKER_TOKEN
        };

        return new Verifier(opts).verifyProvider().then(output => {
            // console.log(output);
        }).finally(() => {
            server.close();
        });
    })

    afterAll(() => {
        server.close();
    });
});