/* eslint-disable no-unused-vars */
module.exports = (err, req, res, next) => {
    /* eslint-disable no-console */
    console.log(err.message, err);

    res.status(500).send('Something failed.');
};
