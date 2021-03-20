import {getMissingRequiredProps} from "./missingPropHandler"
import {v4 as uuidv4} from "uuid"
import * as db from "./jsonHandler"

const bcrypt = require("bcrypt")
const saltRounds = 10

export const userReqHandler = async (req,res,next) => {

let requiredFormProperties = () => {
    if (req.url === "/users"){
        return requiredFormProperties = ['password', 'email']
    } else if (req.url === "/contact_form/entries") {
        return requiredFormProperties = ['name', 'username', 'phoneNumber', 'content']
    }
}; 
requiredFormProperties()

let {body} = req
let missingPropsLogger = {
    message: "validation error",
    invalid: []
}

const missingProperties = (body, requiredFormProperties) => {
    return getMissingRequiredProps(body, requiredFormProperties).map(missingProperty => `${missingProperty}`)
}

// const usersDb = JSON.parse(JSON.stringify(await db.getAllItems("users",null)))
// const usersDbIndex = usersDb.findIndex(properties => properties.username === body.username)

const missingPropertiesHandler = async (missingProperties,missingPropsLogger) => {
    if (missingProperties.length) { // remember length of 0, will mean false, so if there is something in the array, this will be truty
        missingPropsLogger.invalid.push(...missingProperties)
        return missingPropsLogger
    } 
    // else if(usersDbIndex !== -1){
    //     missingPropsLogger.message="username already exist!"
    //     missingPropsLogger.invalid.push("username")
    //     return missingProperties
    // } else {
    //     return missingProperties
    // }
}

const missingPropertiesInfo = async (missingPropertiesHandler) => {
    console.log("missing properties")
    if (missingPropsLogger.invalid.length) {
        return res.status(400).json(missingPropsLogger)
    }    
}

const hashPwd = async (req,res, missingProperties) => {
    // check password in missingProps and requiredProps
    if (!missingProperties.includes("password") && requiredFormProperties.includes("password")) {
        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
            if (err) throw err

            let newUser = {
                id: uuidv4(),
                name: req.body.name,
                password: hash,
                email: req.body.email,
            }

            // if duplicate username exist
            const usersDb = JSON.parse(JSON.stringify(await db.getAllItems("users",newUser)))
            const usersDbIndex = usersDb.findIndex(properties => properties.email === body.email)

            if(usersDbIndex !== -1){
            missingPropsLogger.message="username already exist!"
            missingPropsLogger.invalid.push("username")
            return res.status(400).json(missingPropsLogger)}

            await db.createItem("users",newUser)
            return res.status(201).json({...newUser})
        })
    } 
    else { 
    // if there's no password prop
    let newEntry = {
            id: uuidv4(),
            name: req.body.name,
            username: req.body.username,
            phoneNumber: req.body.phoneNumber,
            content: req.body.content
        }
    //entries.push(newEntry)
    await db.createItem("entries",newEntry)
    return res.status(201).json(newEntry)
    }    
}

    try {
        const checkMissingProperties = await missingProperties(body,requiredFormProperties)
        const gatherMissingProperties = await missingPropertiesHandler(checkMissingProperties,missingPropsLogger)
        const showMissingProperties = await missingPropertiesInfo(gatherMissingProperties)
        const pwdHashed= await hashPwd(req, res,checkMissingProperties)
    }catch (err){
            next(err)
    }
 }