import GlobalFn from "../../imports/libs/globalFn"

const API = JsonRoutes;
const sendResult = API.sendResult;
//var jwt = require('jsonwebtoken');

const secret = Meteor.settings.private.secret;

API.add('post', GlobalFn.Namespace1('/headerFooter/fetch'), (req, res, next) => {
    const {branchId} = req.body;
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
        Meteor.call('base_findHeaderFooter',
            branchId,
            token
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});


API.add('post', GlobalFn.Namespace1('/post/fetch'), (req, res, next) => {
    const {branchId, page} = req.body;
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
        Meteor.call('web_findNewsAndEvents',
            branchId,
            false,
            token,
            page
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});
API.add('post', GlobalFn.Namespace1('/product/fetch'), (req, res, next) => {
    const {branchId, params} = req.body;
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
        Meteor.call('web_findProduct',
            branchId,
            token,
            params
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});
API.add('post', GlobalFn.Namespace1('/productWithFilter/fetch'), (req, res, next) => {
    const {branchId, params} = req.body;
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
    console.log(params);
    return new Promise((resolve, reject) => {
        Meteor.call('web_fetchProductWithFilter',
            {
                branchId,
                accessToken: token,
                params
            }
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});
API.add('post', GlobalFn.Namespace1('/planGift/fetch'), (req, res, next) => {
    const {branchId, addToHome} = req.body;
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
        Meteor.call('web_findPlantGift',
            branchId,
            addToHome,
            token
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});
API.add('post', GlobalFn.Namespace1('/tab/fetch'), (req, res, next) => {
    const {branchId, addToHome} = req.body;
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
        Meteor.call('web_findTab',
            branchId,
            addToHome,
            token
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});
API.add('post', GlobalFn.Namespace1('/planLifeStyle/fetch'), (req, res, next) => {
    const {branchId, addToHome} = req.body;
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
        Meteor.call('web_findPlantLifeStyle',
            branchId,
            addToHome,
            token
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});
API.add('post', GlobalFn.Namespace1('/planRoom/fetch'), (req, res, next) => {
    const {branchId, addToHome} = req.body;
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
        Meteor.call('web_findPlantRoom',
            branchId,
            addToHome,
            token
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});
API.add('post', GlobalFn.Namespace1('/planType/fetch'), (req, res, next) => {
    const {branchId, addToHome} = req.body;
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
        Meteor.call('web_findPlantType',
            branchId,
            addToHome,
            token
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});
API.add('post', GlobalFn.Namespace1('/contact/fetch'), (req, res, next) => {
    const {branchId} = req.body;
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
        Meteor.call('web_findContact',
            branchId,
            token
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});
API.add('post', GlobalFn.Namespace1('/home/fetch'), (req, res, next) => {
    const {branchId} = req.body;
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
        Meteor.call('base_findHome',
            branchId,
            token
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});

API.add('post', GlobalFn.Namespace1('/about/fetch'), (req, res, next) => {
    const {branchId} = req.body;
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
        Meteor.call('web_findAbout',
            branchId,
            token
            , (err, result) => {
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
                        message: er.replace("[", "").replace("]", "")
                    }
                }
            })
        })
});
