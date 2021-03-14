import express from "express"
import {verifyToken} from "../src/middleware/jwtVerify"
import * as db from "./middleware/jsonHandler"
import {userReqHandler} from "./middleware/userReqHandler"
import {authHandler} from "./middleware/authHandler"
import {getEntryById} from "./middleware/getEntryById"

const router = express.Router()

router.post("/contact_form/entries",verifyToken, userReqHandler, async (req, res) => {
//    let headers = new Headers();

//   headers.append('Content-Type', 'application/json');
//   headers.append('Accept', 'application/json');

//   headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//   headers.append('Access-Control-Allow-Credentials', 'true');
//   headers.append('GET', 'POST');
})

router.post("/users", verifyToken, userReqHandler, async (req, res) => {
   res.status(201).json({...newUser})
})

router.post("/auth", authHandler, async (req, res) => {
    
})

router.get("/contact_form/entries", verifyToken, async (req, res) => {
   return res.status(201).json(await db.getAllItems("entries",null))
  })

router.get("/contact_form/entries/:id", verifyToken, getEntryById, async (req, res) => {
})

router.get("*", (req, res, next) => {
    let err = new Error("typed wrong URL")
    next(err)
    return res.status(401).json("typed wrong URL")
})

export default router