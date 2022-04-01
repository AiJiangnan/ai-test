import express from 'express';
import cookieParser from 'cookie-parser';
var logger = require('morgan');

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import environmentsRouter from './routes/environments';
import ErrorRsp, { HttpStatus } from './routes/error_resp';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/environments', environmentsRouter);

// error handler
app.use((err: any, req: any, res: any, next: (v: any) => void) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err);
  // render the error page
  res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json(ErrorRsp.of(err.message, err));
});

export default app;
