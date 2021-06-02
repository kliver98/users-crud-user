const mongoose = require('mongoose');
const userModel = require('../../models/users');
const userData = { firstname: 'William', lastname: 'Gomez', username: 'willigo', id_type: 'TP - TarjetaPasaporte', _id: 1213140, password: '1213140', photo:'https://cutt.ly/unaMq7D'};
const userNoUrl = {firstname: 'Miriam', lastname: 'Solarte', username: 'somiri', id_type: 'TP - TarjetaPasaporte', _id: 55667700, password: '55667700'};

describe('User Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save user successfully', async () => {
        const validUser = new userModel(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.firstname).toBe(userData.firstname);
        expect(savedUser.lastname).toBe(userData.lastname);
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.id_type).toBe(userData.id_type);
        expect(savedUser._id).toBe(userData._id);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.photo).toBe(userData.photo);

    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully without the field url ', async () => {
        const validUser = new userModel(userNoUrl);
        const savedUser = await validUser.save();expect(savedUser._id).toBeDefined();
        expect(savedUser.firstname).toBe(userNoUrl.firstname);
        expect(savedUser.lastname).toBe(userNoUrl.lastname);
        expect(savedUser.username).toBe(userNoUrl.username);
        expect(savedUser.id_type).toBe(userNoUrl.id_type);
        expect(savedUser._id).toBe(userNoUrl._id);
        expect(savedUser.password).toBe(userNoUrl.password);
    });

    // Test Validation is working!!!
    // It should us told us the errors in on gender field.
    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new userModel({ firstname: 'Rafael', id_type: 'TP - TarjetaPasaporte', _id: '156498', password: '156498'});
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.username).toBeDefined();
    });

    
})

