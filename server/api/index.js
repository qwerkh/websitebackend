import "./api_user"

//var jwt = require('jsonwebtoken');
const sendResult = JsonRoutes.sendResult;
const secret = Meteor.settings.private.secret;
JsonRoutes.setResponseHeaders({
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin,Content-Type, Authorization, X-Requested-With,token"
});
JsonRoutes.Middleware.use(function (req, res, next) {
    next();
});