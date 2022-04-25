import React from 'react';
import SessionHelper from '../../helpers/SessionHelper';

const LandingPage = (props) => {
    const { history } = props;
    const isLoggedIn = SessionHelper.getIsLoggedIn();
    console.log('LoggedIn = ', isLoggedIn);
    if (isLoggedIn) {
        history.push('dashboard');
    } else history.push("signIn");

    return (
        <div>

        </div>
    );
}

export default LandingPage;