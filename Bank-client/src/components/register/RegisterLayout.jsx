import { Link } from 'react-router-dom';

import { ProgressBar } from './ProgressBar';

import Logo from "../../assets/cm-logo.png"

export function RegisterLayout({ children, step }) {
    return (
        <div className='register-container'>
            <img src={Logo} alt="" />
            <h2>Create an Account</h2>
            <p className='reg-p'>Join Columbia Merchant today!</p>
            <div className='register-card'>

                <ProgressBar step={step} />

                {children}

                <div className="auth-redirect">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}