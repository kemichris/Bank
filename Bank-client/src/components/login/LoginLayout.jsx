import { Link } from 'react-router-dom';

import Logo from '../../assets/cm-logo.png';

import "../../styles/login/loginLayout.css"
export function LoginLayout({
    formData,
    handleChange,
    handleSubmit,
    errors,
    loading,
}) {
    return (
        <div className="login-container">
            <img src={Logo} alt="Columbia Merchant Logo" />

            <h2>Sign In</h2>

            <p className="login-p">
                Access your Columbia Merchant account!
            </p>

            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email *</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {errors.email && (
                            <small className="error">
                                {errors.email[0]}
                            </small>
                        )}
                    </div>

                    <div>
                        <label>Password *</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        {errors.password && (
                            <small className="error">
                                {errors.password[0]}
                            </small>
                        )}
                    </div>

                    <div className="login-options">
                        <label className="keep-signed-in flex items-center">
                            <input
                                type="checkbox"
                                className='w-3 h-3'
                                name="keepSignedIn"
                                checked={formData.keepSignedIn}
                                onChange={handleChange}
                            />

                            Keep me signed in
                        </label>

                        <Link to="/forgot-password">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="next-btn"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>

                    <div className="auth-redirect">
                        <p>
                            New to Columbia Merchant?{' '}
                            <Link to="/register">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}