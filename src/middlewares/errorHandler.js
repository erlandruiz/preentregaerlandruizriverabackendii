// export const errorHandler = (error, req, res, next) => {
//     console.log( `error ${error.message}`) 
//     const status = error.status || 400
//     res.status(status).send(error.message)
// }

// export const errorHandler = (err, req, res, next) => {
//     console.error(err);
//     res.status(500).json({ message: err });
// };

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({ message });
};