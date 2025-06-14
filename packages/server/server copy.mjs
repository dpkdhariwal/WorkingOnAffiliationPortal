import express from 'express';
import cors from 'cors'; // Import the cors middleware
const app = express();
const port = 3000;
import auth from './routes/auth.js';
import task from './routes/task.js';

// Enable CORS for all routes
app.use(cors());

app.use('/auth', auth);
app.use('/task', task);

app.use((req, res) => {
    res.status(404).send('Route Not Found');
});
app.use((req, res) => {
    res.status(505).send('Server Error');
});

app.listen(port, () => {
    console.log(`Server Running On Port No. ${port}`);
});
