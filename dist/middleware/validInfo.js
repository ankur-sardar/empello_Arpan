"use strict";
module.exports = function (req, res, next) {
    const { email, password, firstName, lastName } = req.body;
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    if (req.path === "/register") {
        console.log(!email.length);
        if (![email, password].every(Boolean)) {
            return res.json("Missing Credentials");
        }
        else if (!validEmail(email)) {
            return res.json("Invalid Email");
        }
    }
    else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.json("Missing Credentials");
        }
        else if (!validEmail(email)) {
            return res.json("Invalid Email");
        }
    }
    next();
};
