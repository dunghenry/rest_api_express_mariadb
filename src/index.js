const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
dotenv.config();
const port = process.env.PORT || 4000;
const listURL = ['http://127.0.0.1:5500', 'http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) =>{
        if(listURL.includes(origin) !== -1 || !origin){
            callback(null, true);
        }
        else{
            callback(new Error("Not allowed by CORS"));
        }
    }
}
const app = express();
const route = require('./routes');
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyParser.json({ extended: true, limit: '30mb' }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
route(app);
app.listen(port, () => console.log(`App started at http://localhost:${port}`));
