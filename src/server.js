import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';

require('dotenv').config();

let app = express();
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));
const apiKeys = ['API1', 'API2'];

const apiKeyMiddleware = (req, res, next) => {
    const providedApiKey = req.headers['x-api-key'];

    if (!providedApiKey || !apiKeys.includes(providedApiKey)) {
        return res.status(403).json({ error: 'Invalid API Key' });
    }

    next();
};

// app.use(apiKeyMiddleware);
app.use(cors({ credentials: true, origin: true }));


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.port || 8081;
//Port === undefined => port = 6969
app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port:" + port)
})

