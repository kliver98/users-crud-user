const User = require('../models/users')

exports.index = function (req, res, next) {
    User.find({}, (err, users) => {
        if (err)
            return next(err)
        users.map(user => {user.password='';return user})
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

    user.save((err,user_saved) => {
        if (!user_saved)
            return res.status(400).send(`Error: id ${id} already exist`)
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
        user.password=''
        res.send(user)
    })
}

exports.delete = function (req, res, next) {
    let id = req.params.id
    var reg = new RegExp('^\\d+$')
    if (!reg.test(id)) {
        res.status(400).send(`${id} is not valid id`)
        return
    }
    User.findByIdAndRemove(id, (err, user) => {
        if (err)
            return next(err)
        else {
            if (user)
                res.status(200).send("User ["+user._id+"] deleted successfully")
            else
                res.status(400).send(`Error: id ${id} does not exist`)
        }
    })
}

exports.update = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, user) => {
        if (err)
            return next(err)
        res.send("User ["+user._id+"] updated successfully")
    })
}