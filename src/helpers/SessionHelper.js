/**
 * A helper class that manages the session data such as setting, deleting, getting user data or getting logged in state.
 */
class SessionHelper {
    user = null;
    isLoggedIn = false;

    /**
     * Sets the user data in the session as the user data saved in the local storage by the sign in component and sets the logged in state as true.
     */
    constructor() {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            this.user = JSON.parse(userInfo);
            this.isLoggedIn = true;
        }
    }

    /**
     * Sets the user data in the session, sets the logged in state as true and then saves this data in the local storage.
     * @param {obj} user a json object that contains the user data such as the accessToken or the role
     */
    setUser(user) {
        this.user = user;
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Removes the user data from the storage, clears the user data in the session and sets the logged in state as false.
     */
    deleteUser() {
        localStorage.removeItem('user');
        this.user = null;
        this.isLoggedIn = false;
    }

    /**
     * Gets the user data in the session.
     */
    getUser() {
        return this.user;
    }

    /**
     * Gets the logged in state in the session.
     */
    getIsLoggedIn() {
        return this.isLoggedIn;
    }
}

export default new SessionHelper();