export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class DatabaseOperationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseOperationError';
  }
}

export class PermissionDeniedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermissionDeniedError';
  }
}

export class ForbiddenResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenResponseError';
  }
}
