import GlobalFn from "../../imports/libs/globalFn"

const API = JsonRoutes;
const sendResult = API.sendResult;
//var jwt = require('jsonwebtoken');

const secret = Meteor.settings.private.secret;

API.add('post', GlobalFn.Namespace1('/users/add'), (req, res, next) => {
    const {token} = req.headers;
    try {
        GlobalFn.verifyToken(token, secret);
    } catch (e) {
        sendResult(res, {
            data: {
                code: 403,
                data: {
                    message: "សុំទោសមិនអាចតភ្ជាប់បានទេ",
                }
            }
        })
    }

    return new Promise((resolve, reject) => {
        Meteor.call("base_insertUser", req.body, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        })
    }).then((r) => {
        sendResult(res, {
            data: {
                code: 201,
                data: r
            }
        }).catch((er) => {
            sendResult(res, {
                data: {
                    code: 402,
                    data: {
                        message: er.replace("[","").replace("]","")
                    }
                }
            })
        })
    })
})


API.add('post', GlobalFn.Namespace1('/users/:id/edit'), (req, res, next) => {
    const {token} = req.headers;
    const {id} = req.params;
    const {doc} = req.body;
    res.charset = 'utf-8';

    try {
        GlobalFn.verifyToken(token, secret);
    } catch (e) {
        sendResult(res, {
            data: {
                code: 403,
                data: {
                    message: "សុំទោសមិនអាចតភ្ជាប់បានទេ",
                }
            }
        })
    }

    return new Promise((resolve, reject) => {
        Meteor.call("updateUser", id, doc, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err.message);
                }
            }
        )
    }).then((r) => {
        sendResult(res, {
            data: {
                code: 201,
                data: r
            }
        }).catch((er) => {
            sendResult(res, {
                data: {
                    code: 402,
                    data: {
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
    })
})

API.add('post', GlobalFn.Namespace1('/users/fetch'), (req, res, next) => {
    const {_id, search, skip, limit} = req.body;
    res.charset = 'utf-8';
    const {token} = req.headers;
    try {
        GlobalFn.verifyToken(token, secret); // if token failed we decline all process
    } catch (e) {
        sendResult(res, {
            data: {
                code: 403,
                data: {
                    message: "សុំទោសមិនអាចតភ្ជាប់បានទេ",
                }
            }
        })
    }
    return new Promise((resolve, reject) => {
        Meteor.call('base_fetchUser', {
            q: search || "",
            filter: "",
            sort: {},
            options: {skip: skip, limit: limit}
        }, (err, result) => {
            if (!err) {
                resolve(result);
                console.log(result);
            } else {
                reject(err.message);
            }
        });
    })
        .then((r) => {
            sendResult(res, {
                data: {
                    code: 201,
                    data: r,

                }
            })
        }).catch((er) => {
            sendResult(res, {
                data: {
                    code: 402,
                    data: {
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});

API.add('post', GlobalFn.Namespace1('/users/login'), (req, res, next) => {
    const {username, password} = req.body;
    res.charset = 'utf-8';
    const {token} = req.headers;
    const ip = req.connection.remoteAddress;
    console.log(token);
    let isVerify = GlobalFn.verifyToken(token, secret); // if token failed we decline all process
    if (!isVerify) {
        sendResult(res, {
            data: {
                code: 403,
                data: {
                    message: "សុំទោសមិនអាចតភ្ជាប់បានទេ",
                }
            }
        })
    }
    return new Promise((resolve, reject) => {
        Meteor.call('baseCheckUserLogin', {
            username,
            password,
            accessToken: token,
        }, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    })
        .then((r) => {
            sendResult(res, {
                data: {
                    code: 201,
                    data: r,

                }
            })
        }).catch((er) => {
            sendResult(res, {
                data: {
                    code: 402,
                    data: {
                        message: er && er.replace("[", "").replace("]", "") || ""
                    },
                }
            })
        })
});

