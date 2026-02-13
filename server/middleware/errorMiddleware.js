// error handlers are special middeleware functions which are used to catch 
//process and respond to errors that occur during the HTTP request-response cycle.



const errorHandler = (err , req , res , next ) =>{
    console.error("Error:" , err);


const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 

res.status(statusCode).json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
});

};


export default errorHandler;