import { FaUser } from "react-icons/fa";

export function PersonalStep({ formData, handleChange, nextStep, errors }) {
    return (
        <>
            <div className="icon">
                <FaUser />
            </div>

            <h3>Personal Information</h3>

            <div>
                <label>First Name *</label>

                <input
                    type="text"
                    placeholder="John"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />

                {errors.firstName && (
                    <small className="error">{errors.firstName[0]}</small>
                )}
            </div>

            <div>
                <label>Last Name *</label>

                <input
                    type="text"
                    placeholder="Doe"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />

                {errors.lastName && (
                    <small className="error">{errors.lastName[0]}</small>
                )}
            </div>

            <div>
                <label>Middle Name</label>

                <input
                    type="text"
                    placeholder="David"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Username *</label>

                <input
                    type="text"
                    placeholder="johndoe123"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                {errors.username && (
                    <small className="error">{errors.username[0]}</small>
                )}
            </div>

            <button className="next-btn" type="button" onClick={nextStep}>
                Next
            </button>
        </>
    );
}
