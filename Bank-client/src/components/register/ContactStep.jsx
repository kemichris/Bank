import { IoCall } from "react-icons/io5";
export function ContactStep({ formData, handleChange, nextStep, previousStep }) {
    return (
        <>
            <div className="icon">
                <IoCall />
            </div>
            <h3>Contact Infomation</h3>

            <div>
                <label>Email *</label>
                <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Phone Number *</label>
                <input
                    type='tel'
                    placeholder="+1 (930) 893-8901"
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Country *</label>
                <input
                    type="text"
                    placeholder="country"
                    name="country"
                    value={formData.country}
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