import {isEmailValid} from "./emailValidator"
import * as db from "./jsonHandler"

export const getMissingRequiredProps = (requestFormProperties, requiredFormProperties) => {
    // we can use filter to return an array of missing properties key/values
    // also, we check for null, undefined, and empty string

    let nonEmptyProperties = Object.entries(requestFormProperties).filter(entry => entry[1] && entry[1].trim())
    
    const getEmailPropIndex = nonEmptyProperties.filter(element => !element[0].indexOf("email"))
    // console.log("entries:",JSON.parse(JSON.stringify(db.getAllItems("entries",null))))
    
    // If email index is found or not undefined
    if (getEmailPropIndex.length !== 0) {
        // const entries = JSON.parse(JSON.stringify(await db.getAllItems("entries",null)))
        // const userEntryIndex = entries.filter(properties => properties)
        // console.log(userEntryIndex)
        const getEmailPropValue = nonEmptyProperties[nonEmptyProperties.indexOf(getEmailPropIndex[0])][1]
        if (!isEmailValid(getEmailPropValue)) {
            //    Nullify email value on non-validation
            nonEmptyProperties.splice(nonEmptyProperties.indexOf(getEmailPropIndex[0]), 1)
        }
    }

    const getPwdPropIndex = nonEmptyProperties.filter(element => !element[0].indexOf("password"))
    // const getPwdPropValue = nonEmptyProperties[nonEmptyProperties.indexOf(getPwdPropIndex[0])][1]

    // If email index is found or not undefined
    if (getPwdPropIndex.length !== 0) {
        const getPwdPropValue = nonEmptyProperties[nonEmptyProperties.indexOf(getPwdPropIndex[0])][1]
        if (getPwdPropValue.length < 8) {
            //    Nullify email value on non-validation
            nonEmptyProperties.splice(nonEmptyProperties.indexOf(getPwdPropIndex[0]), 1)
        }
    }

    // Getting keys only 
    nonEmptyProperties = nonEmptyProperties.map(x => x[0])
    return requiredFormProperties.filter(property => !nonEmptyProperties.includes(property))
}