import { BsBank2 } from "react-icons/bs";

export function AccountStep({
    formData,
    handleChange,
    nextStep,
    previousStep,
    errors,
}) {
    return (
        <>
            <div className="icon">
                <BsBank2 />
            </div>

            <h3>Account Details</h3>

            <div>
                <label>Account Type *</label>

                <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                >
                    <option value="">Select Account</option>
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                    <option value="business">Business</option>
                </select>

                {errors.accountType && (
                    <small className="error">{errors.accountType[0]}</small>
                )}
            </div>

            <div>
                <label>Transaction PIN *</label>

                <input
                    type="password"
                    name="transactionPin"
                    placeholder="4 DIGIT PIN"
                    maxLength={4}
                    value={formData.transactionPin}
                    onChange={handleChange}
                />

                {errors.transactionPin && (
                    <small className="error">{errors.transactionPin[0]}</small>
                )}
            </div>

            <div className="step-buttons">
                <button className="prev-btn" type="button" onClick={previousStep}>
                    Previous
                </button>

                <button className="next-btn" type="button" onClick={nextStep}>
                    Next
                </button>
            </div>
        </>
    );
}
