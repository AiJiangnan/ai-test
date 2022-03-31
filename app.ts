import express from 'express';
import cookieParser from 'cookie-parser';
var logger = require('morgan');

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import environmentsRouter from './routes/environments';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/environments', environmentsRouter);

// catch 404 and forward to error handler
app.use((req: any, res: any, next: (v: any) => void) => {
  next({ status: 404 });
});

// error handler
app.use((err: any, req: any, res: any, next: (v: any) => void) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ status: -1, msg: 'Error', data: null });
});

export default app;
