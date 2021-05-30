const { Verifier } = require('@pact-foundation/pact');
const controller = require('../controller/user-pact')

// Setup provider server to verify
const app = require('express')();
app.use('/api/latest/users', require('../routes/users-pact'));
const server = app.listen("3000");

describe("Pact Verification", () => {
    it("validates the expectations of UserService", () => {
        const opts = {
            logLevel: "INFO",
            pactBroker: "https://kliver.pactflow.io",
            providerBaseUrl: "http://localhost:3000",
            provider: "UsersCrudUser",
            pactBrokerUrl: "https://kliver.pactflow.io",
            pactBrokerToken: "o_LuEXBkiyB-YbNwUiUjUA",
            stateHandlers: {
                "has users and wants to list them": () => {
                    controller.index = () => {
                        return [ {
                            _id:100000,username:"admin" 
                        } ]
                    }
                },
            },
            beforeEach: () => {
                // console.log('I run before everything else')
            },
            afterEach: () => {
                // console.log('I run after everything else has finished')
            }
        };

        if (process.env.CI || process.env.PACT_PUBLISH_RESULTS) {
            Object.assign(opts, {
                publishVerificationResult: true,
            });
        }

        return new Verifier(opts).verifyProvider().then(output => {
            console.log(output);
        }).finally(() => {
            server.close();
        });
    })
});