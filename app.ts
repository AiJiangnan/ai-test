import cookieParser from 'cookie-parser';
import express from 'express';
import environmentsRouter from './routes/environments';
import ErrorRsp, { HttpStatus } from './routes/error_resp';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/aitest/api/', indexRouter);
app.use('/aitest/api/users', usersRouter);
app.use('/aitest/api/environments', environmentsRouter);

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
