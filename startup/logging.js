const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {

  //Method 1 to handle exception and rejection

  // process.on('uncaughtException', (ex)=> {
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // })

  // process.on('unhandledRejection', (ex)=> {
  //   console.log('WE GOT UNHANDLE EXCEPTION');
  //   winston.error(ex.message, ex);
  // })

  //method 2 to handle exception and rejection

  winston.handleException(new winston.transports.File({
    filename: 'uncaughtExceptions.log'
  }))

  process.on('unhandledRejection', (ex) => {
    throw ex;
  })

  winston.add(winston.transports.File, {
    filename: 'logfile.log'
  });
  winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/vidly'
  });

  // throw new Error('Something Failed during startup');

  const p = Promise.reject(new Error('Something Misberly Happned'))

  p.then(() => console.log('Done!!!'));
}
