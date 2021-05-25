const User = require('../models/users')

var positive_numbers = new RegExp('^\\d+$')

exports.index = function (req, res, next) {
    User.find({}, (err, users) => {
        if (err)
            return res.status(500).send(`Unhandled error: ${err}`)
        users = users.map(user => {return {_id:user._id,username:user.username}})
        res.status(200).send(users);
    })
}

exports.create = function(req, res, next) {
    let user = new User({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        username: req.body.username,
        id_type: req.body.id_type,
        _id: req.body._id,
        password: req.body.password,
        photo: req.body.photo,
        active: req.body.active,
    });

    user.save((err,user_saved) => {
        if (!user_saved)
            return res.status(400).send(`ID error: id ${user._id} already exist`)
        else if (err)
            return res.status(500).send(`Unhandled error: ${err}`)
        res.status(201).send(`Information: user with id [${user._id}] created successfully`)
    })
}

exports.show = function (req, res, next) {
    let id = req.params.id;
    if (!positive_numbers.test(id))
        return res.status(400).send(`ID error: ${id} is not valid id`)
    User.findById(id, (err, user) => {
        if (err)
            return res.status(500).send(`Unhandled error: ${err}`)
        user.password=''
        res.status(200).send(user)
    })
}

exports.delete = function (req, res, next) {
    let id = req.params.id
    if (!positive_numbers.test(id))
        return res.status(400).send(`ID error: ${id} is not valid id`)
    User.findByIdAndRemove(id, (err, user) => {
        if (err)
            return res.status(500).send(`Unhandled error: ${err}`)
        else {
            if (user)
                res.status(200).send(`Information: User [${user._id}] deleted successfully`)
            else
                res.status(400).send(`Information: id ${id} does not exist`)
        }
    })
}

exports.update = function (req, res, next) {
    let id = req.params.id
    let userRequest = req.body
    if (!positive_numbers.test(id))
        return res.status(400).send(`ID error: ${id} is not valid id`)
    if (parseInt(id)!==parseInt(userRequest._id))
        return res.status(400).send(`Incongruence error: between data send and id to update`)
    User.findByIdAndUpdate(id, {$set: userRequest}, (err, user) => {
        if (err)
            return res.status(500).send(`Unhandled error: ${err}`)
        if (!user)
            res.status(400).send(`ID error: id ${id} does not exist`)
        else
            res.status(200).send("Information: user with id ["+user._id+"] updated successfully")
    })
}