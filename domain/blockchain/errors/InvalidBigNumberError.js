export class InvalidBigNumberError extends Error {
  static create(msg) {
    return new InvalidBigNumberError(msg)
  }
}
