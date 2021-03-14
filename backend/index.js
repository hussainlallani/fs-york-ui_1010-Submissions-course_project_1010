import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import express, { urlencoded } from 'express'
import errorHandler from './src/middleware/errorHandler'
import router from "./src/router"
const app = express()

app.use(cors());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// allows us to parse json
app.use(express.json());
app.use(urlencoded({extended:true}));

//using the router.js file
app.use(router)


app.use(errorHandler)

// use port 3000 unless there exists a preconfigured port
const port = 9000

//Output Hello World on accessing the given url
app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log(`API server ready on http://localhost:${port}`))