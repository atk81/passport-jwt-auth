export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500
}

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    statusCode: number,
    isOperational: boolean,
    description: string
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.httpCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

export class Api404Error extends BaseError {
  constructor(
    name: string,
    statusCode = HttpStatusCode.NOT_FOUND,
    description = 'Not found.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export class Api400Error extends BaseError {
  constructor(
    name: string,
    statusCode = HttpStatusCode.BAD_REQUEST,
    description = 'Bad Request',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export class Api500Error extends BaseError {
  constructor(
    name: string,
    statusCode = HttpStatusCode.INTERNAL_SERVER,
    description = 'Something wrong happened',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
