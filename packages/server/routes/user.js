import express from 'express';
const router = express.Router();
// eslint-disable-next-line no-unused-vars
const timeLog = (req, res, next) => {
    // console.log(req, res, next);
    // console.log('Time: ', Date.now());
    next();
};
router.use(timeLog);
// define the home page route
router.get('/', (req, res) => {
    res.send('Birds Home Page');
});
// define the about route
router.get('/info', (req, res) => {
    res.send('User Information API');
});
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res) => {
    throw new Error('BROKEN');
});
export default router;
