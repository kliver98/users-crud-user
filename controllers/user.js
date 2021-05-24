const User = require('../models/users')

var positive_numbers = new RegExp('^\\d+$')

exports.index = function (req, res, next) {
    User.find({}, (err, users) => {
        if (err)
            return next(err)
        users = users.map(user => {return {username:user.username,_id:user._id}})
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
    if (!positive_numbers.test(id))
        return res.status(400).send(`${id} is not valid id`)
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
    let id = req.params.id
    if (!positive_numbers.test(id))
        return res.status(400).send(`${id} is not valid id`)
    User.findByIdAndUpdate(id, {$set: req.body}, (err, user) => {
        if (err)
            return next(err)
        if (!user)
            res.status(400).send(`Error: id ${id} does not exist`)
        else if (user._id!==parseInt(id))
            res.status(400).send(`Error: ids does not match, cannot update id`)
        else
            res.status(200).send("User ["+user._id+"] updated successfully")
    })
}