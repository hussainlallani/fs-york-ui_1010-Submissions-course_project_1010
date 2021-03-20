import { getEntryById } from "./getEntryById"
import * as db from "./jsonHandler"
const bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")

export const authHandler = async (req, res, next) => {

    let credentials = {
        email: req.body.email,
        password: req.body.password,
    }

    const {body} = req
    const { email,password} = body
    // console.log(email + " & " + password);

    const entries = JSON.parse(JSON.stringify(await db.getAllItems("users", null)));

    const validateUser = () => {
        const getMatchedUser = entries.filter(entry => {if (entry.email==email) return entry;});
        if (getMatchedUser.length!==0){
            bcrypt.compare(password, getMatchedUser[0].password, function(err, result) {
                if (result) {
                let token = jwt.sign(credentials, `${process.env.PRIVATEKEY}`)
                res.status(201).json({"token": token});
                return next();
                }
                else {
                res.status(401).json({"message": "incorrect credentials provided"});
                return next();
                }
            });
        } else {
            res.status(401).json({"message": "incorrect credentials provided"});
            return next();
        }
    }
    
    validateUser();
}