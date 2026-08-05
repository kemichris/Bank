import { RiShieldCheckFill } from "react-icons/ri";

export function SecurityStep({ formData, handleChange, previousStep, errors }) {
    return (
        <>
            <div className="icon">
                <RiShieldCheckFill />
            </div>

            <h3>Security</h3>

            <div>
                <label>Password *</label>

                <input
                    type="password"
                    name="password"
                    placeholder="Create Strong Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {errors.password && (
                    <small className="error">{errors.password[0]}</small>
                )}
            </div>

            <div>
                <label>Confirm Password *</label>

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                {errors.confirmPassword && (
                    <small className="error">{errors.confirmPassword[0]}</small>
                )}
            </div>

            <div>
                <label className="terms-label">
                    <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                    />
                    I agree to the Terms & Conditions
                </label>

                {errors.acceptTerms && (
                    <small className="error">{errors.acceptTerms[0]}</small>
                )}
            </div>

            <div className="step-buttons">
                <button className="prev-btn" type="button" onClick={previousStep}>
                    Previous
                </button>

                <button type="submit" className="next-btn">
                    Create Account
                </button>
            </div>
        </>
    );
}
