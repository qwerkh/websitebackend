import GlobalFn from "../../imports/libs/globalFn"

const API = JsonRoutes;
const sendResult = API.sendResult;
//var jwt = require('jsonwebtoken');

const secret = Meteor.settings.private.secret;

API.add('post', GlobalFn.Namespace1('/productReport/fetch'), (req, res, next) => {
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
        Meteor.call('web_productPriceReport',
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
API.add('post', GlobalFn.Namespace1('/productionLine/fetch'), (req, res, next) => {
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
        Meteor.call('web_findProductionLine',
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

API.add('post', GlobalFn.Namespace1('/organization/fetch'), (req, res, next) => {
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
        Meteor.call('base_findOrganization',
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
API.add('post', GlobalFn.Namespace1('/client/fetch'), (req, res, next) => {
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
        Meteor.call('web_findClient',
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
API.add('post', GlobalFn.Namespace1('/newsAndEvents/fetch'), (req, res, next) => {
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
        Meteor.call('web_findNewsAndEvents',
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
API.add('post', GlobalFn.Namespace1('/product/fetch'), (req, res, next) => {
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
        Meteor.call('web_findProduct',
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
        Meteor.call('base_findAbout',
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
