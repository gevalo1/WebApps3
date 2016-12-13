'use strict';
const User = require("../../models/user");
const jwt = require('jsonwebtoken');

module.exports.handle =
        function handle(req, res) {
            const target = getUrlName(req.url);
            switch (target) {
                case 'login':
                    handleLogin(req, res)
                    break;
                case 'user':
                    handleUser(req, res)
                    break;
                case 'signup':
                    handleSignup(req, res)
                    break;
                default:
                    res.end;
                    break;
            }

            function handleLogin(req, res) {
                User.findOne({$and: [{'local.email': req.body.user.email}, {'local.password': req.body.user.password}]}).exec(function (err, result) {
                    if (result) {
                        req.body.user = result.local;
                        res.json(req.body);
                    } else {
                        res.status(500).send("Email or password is invalid.");
                    }
                });
            }

            function handleUser(req, res) {
                const newJwt = res.req.headers.authorization.slice(6);
                User.findOne({'local.token': newJwt}).exec(function (err, result) {
                    if (result) {
                        req.body.user = result.local;
                        res.json(req.body);
                    } else {
                        res.sendStatus(500);
                    }
                });
            }

            function handleSignup(req, res) {
                const currentDate = new Date();
                const payload = req.body.user.username + currentDate;
                req.body.user.token = jwt.sign(payload, "EvilWhaleDrawingD1ng");

                User.findOne({'local.username': req.body.user.username}).exec(function (err, result) {
                    if (!result) {
                        User.findOne({'local.email': req.body.user.email}).exec(function (err, result) {
                            if (!result) {
                                result = new User({
                                    local: {
                                        email: req.body.user.email,
                                        password: req.body.user.password,
                                        username: req.body.user.username,
                                        joinDate: currentDate,
                                        token: req.body.user.token
                                    }
                                });
                                result.save();
                                res.json(req.body);
                            } else {
                                res.status(500).send("Email is already in use.");
                            }
                        });
                    } else {
                        res.status(500).send("Username is already in use.");
                    }
                });
            }

            function getUrlName(url) {
                url = url.split('/');
                url = (url[url.length - 1]);
                return url;
            }
            ;
        };