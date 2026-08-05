import { useState } from "react";

import { RegisterLayout } from "../../components/register/RegisterLayout";
import { PersonalStep } from "../../components/register/PersonalStep";
import { ContactStep } from "../../components/register/ContactStep";
import { AccountStep } from "../../components/register/AccountStep";
import { SecurityStep } from "../../components/register/SecurityStep";

import "../../styles/register/register.css"

export function Register() {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        // Step 1
        firstName: "",
        lastName: "",
        middleName: "",
        username: "",

        // Step 2
        email: "",
        phoneNumber: "",
        country: "",

        // Step 3
        currency: "",
        accountType: "",
        transactionPin: "",

        // Step 4
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    });

    const TOTAL_STEPS = 4;

    const nextStep = () => {
        if (step < TOTAL_STEPS) {
            setStep(prev => prev + 1);
        }
    };

    const previousStep = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
        }
    };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <PersonalStep
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                    />
                );

            case 2:
                return (
                    <ContactStep
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        previousStep={previousStep}
                    />
                );

            case 3:
                return (
                    <AccountStep
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        previousStep={previousStep}
                    />
                );

            case 4:
                return (
                    <SecurityStep
                        formData={formData}
                        handleChange={handleChange}
                        previousStep={previousStep}
                    />
                );

            default:
                return null;
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        console.log(formData);

        // Later:
        // await register(formData);
    };

    return (

        <>
            <title>Columbia Merchant | Register</title>
            <RegisterLayout step={step}>
                <form onSubmit={handleSubmit}>
                    {renderStep()}
                </form>
            </RegisterLayout>
        </>
    )
}