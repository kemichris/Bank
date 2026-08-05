import { BsBank2 } from "react-icons/bs";

export function AccountStep({ formData, handleChange, nextStep, previousStep }) {
    return (
        <>
            <div className="icon">
                <BsBank2 />
            </div>
            <h3>Account Details</h3>

            <div>
                <label>Account Type *</label>

                <select
                    name='accountType'
                    value={formData.accountType}
                    onChange={handleChange}
                >
                    <option value=''>Select Account</option>
                    <option value='savings'>Savings</option>
                    <option value='current'>Current</option>
                    <option value='business'>Business</option>
                </select>
            </div>

            <div>
                <label>Transaction PIN *</label>

                <input
                    type='password'
                    maxLength={4}
                    placeholder="4 DIGIT PIN"
                    name='transactionPin'
                    value={formData.transactionPin}
                    onChange={handleChange}
                />
            </div>

            <div className="step-buttons">
                <button className="prev-btn"
                    type='button'
                    onClick={previousStep}
                >
                    Previous
                </button>

                <button className="next-btn"
                    type='button'
                    onClick={nextStep}
                >
                    Next
                </button>
            </div>

        </>
    )
}