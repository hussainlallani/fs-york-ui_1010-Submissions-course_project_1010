import * as db from "./jsonHandler"

export const getEntryById = async (req, res, next) => {
    const entries = JSON.parse(JSON.stringify(await db.getAllItems("entries",null)))

    const userEntryIndex = entries.findIndex(properties => properties.id == req.params.id)
    
    if(userEntryIndex !== -1) {
        let body = entries[userEntryIndex]
        next()
        return res.status(200).json(body)
    } else {
        next()
        return res.status(404).json( {message: "not found"})
    }
}