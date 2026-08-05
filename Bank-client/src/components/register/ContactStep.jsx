import { IoCall } from "react-icons/io5";

export function ContactStep({
    formData,
    handleChange,
    nextStep,
    previousStep,
    errors,
}) {
    return (
        <>
            <div className="icon">
                <IoCall />
            </div>

            <h3>Contact Information</h3>

            <div>
                <label>Email *</label>

                <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                />

                {errors.email && <small className="error">{errors.email[0]}</small>}
            </div>

            <div>
                <label>Phone Number *</label>

                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="+1 (930) 893-8901"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />

                {errors.phoneNumber && (
                    <small className="error">{errors.phoneNumber[0]}</small>
                )}
            </div>

            <div>
                <label>Country *</label>

                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                />

                {errors.country && <small className="error">{errors.country[0]}</small>}
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
