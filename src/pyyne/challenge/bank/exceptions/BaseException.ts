export class BaseException {
  public errCode = 500;
  public message = 'Internal Server Error';

  public raise() {
    return {
      errCode: this.errCode,
      message: this.message,
    };
  }
}
