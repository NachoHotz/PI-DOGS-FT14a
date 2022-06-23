import HttpException from './HttpException.js';

export default class BadRequestException extends HttpException {
  constructor(message) {
    super(400, message);
  }
}
