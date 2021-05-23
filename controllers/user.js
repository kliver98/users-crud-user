const User = require('../models/users')

exports.index = function (req, res, next) {
    User.find({}, (err, users) => {
        if (err)
            return next(err)
        res.send(users);
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

    user.save(err => {
        if (err)
            return next(err)
        res.send("User ["+user._id+"] created successfully")
    })
}

exports.show = function (req, res, next) {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if (err)
            return next(err)
        res.send(user)
    })
}

exports.delete = function (req, res, next) {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err)
            return next(err)
        res.send("User ["+user._id+"] deleted successfully")
    })
}

exports.update = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, user) => {
        if (err)
            return next(err)
        res.send("User ["+user._id+"] updated successfully")
    })
}