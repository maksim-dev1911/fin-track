export const getApiErrorMessage = (message?: string) => {
  switch (message) {
    case 'Invalid credentials.':
      return 'The email or password you entered is incorrect.';

    case undefined:
    case '':
      return 'Something went wrong.';

    default:
      return message;
  }
};
