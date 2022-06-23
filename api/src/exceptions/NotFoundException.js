import HttpException from './HttpException.js';

export default class NotFoundException extends HttpException {
  constructor(message) {
    super(404, message);
  }
}
