export const getApiErrorMessage = (message?: string) => {
  switch (message) {
    case 'Invalid credentials.':
      return 'The email or password you entered is incorrect.';

    default:
      return 'Something went wrong.';
  }
};
