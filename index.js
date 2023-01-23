import express, { application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

const CONNECTION_URL = `mongodb+srv://mady:mady123@cluster0.gfwalob.mongodb.net/?retryWrites=true&w=majority`;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);

app.use('/', (req, res) => {
    res.send('hello to memories API')
})

app.listen(process.env.PORT || 5000, () => {
    console.log('backend running')
})

/*mongoose.connect(CYCLIC_URL)
.then(() => console.log(`Server running on port: ${PORT}`))
.catch((error) => console.log('error connecting', error))*/

//const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true);

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

