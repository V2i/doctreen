export const authHeader = () => {
    const user = JSON.parse(<string>localStorage.getItem('user'));

    if (user && user.authToken) {
        return { 'auth-token': user.authToken };
    } else {
        return {};
    }
};
