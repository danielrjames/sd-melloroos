class ErrorException extends Error {
  constructor(message) {
    super(message);

    this.message =
      message === 'Request failed with status code 400' ||
      message === 'Request failed with status code 404' ||
      message === 'Request failed with status code 500'
        ? 'Application error. Please try again.'
        : message;
    this.name = 'ErrorException';
  }
}

export default ErrorException;
