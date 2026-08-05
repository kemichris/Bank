import { RiShieldCheckFill } from "react-icons/ri";

export function SecurityStep({ formData, handleChange, previousStep }) {
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
                    placeholder="Create Strong Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    placeholder="Repeat Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
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
            </div>

            <div className="step-buttons">
                <button className="prev-btn" type="button" onClick={previousStep}>
                    Previous
                </button>

                <button type="submit" className="next-btn">Create Account</button>
            </div>
        </>


    );
}
