import { ErrorRequestHandler } from 'express';

export default class ErrorHandler {
  static handle: ErrorRequestHandler = (err, _req, res, _next) => {
    const { status, message } = err;
    return res.status(status || 500).json({ message });
  };
}
