import * as db from "./jsonHandler"
const bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")

export const authHandler = async (req, res, next) => {
    
    let credentials = {
        email: req.body.email,
        password: req.body.password,
    }

    const {body} = req
    const {username: email  , password} = body
    // console.log(email + " & " + password);

    const entries = JSON.parse(JSON.stringify(await db.getAllItems("users",null)))

    const validateUser = () => entries.filter(db => {
        // console.log(`${db.email}==${email}`)
        if (db.email==email){
            bcrypt.compare(password,db.password, function(err, result){
                if (result){
                    let token =jwt.sign(credentials,`${process.env.PRIVATEKEY}`)
                    console.log(token);
                    res.status(201).json({"token":token});
                    next()
                } 
            })
        } else {
            res.status(401).json({"message": "incorrect credentials provided"})
            next()
        }
        // return res.status(401).json({"message": "incorrect credentials provided"})
    }) 
    validateUser()
}