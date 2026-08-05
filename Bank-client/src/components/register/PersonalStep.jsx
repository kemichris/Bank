import { FaUser } from "react-icons/fa";

export function PersonalStep({ formData, handleChange, nextStep }) {
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
            </div>

            <button className="next-btn" type="button" onClick={nextStep}>
                Next
            </button>
        </>
    );
}
