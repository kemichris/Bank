import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  personalSchema,
  contactSchema,
  accountSchema,
  securitySchema,
} from "../../validators/auth.schema";

import { register } from "../../services/auth.service";

import { RegisterLayout } from "../../components/register/RegisterLayout";
import { PersonalStep } from "../../components/register/PersonalStep";
import { ContactStep } from "../../components/register/ContactStep";
import { AccountStep } from "../../components/register/AccountStep";
import { SecurityStep } from "../../components/register/SecurityStep";

import "../../styles/register/register.css";

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1
    firstName: "",
    lastName: "",
    middleName: "",
    username: "",
    dateOfBirth: "",

    // Step 2
    email: "",
    phoneNumber: "",
    country: "",

    // Step 3
    accountType: "",
    transactionPin: "",

    // Step 4
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const TOTAL_STEPS = 4;

  const nextStep = () => {
    if (!validateStep()) return;
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateStep = () => {
    let result;

    switch (step) {
      case 1:
        result = personalSchema.safeParse(formData);
        break;

      case 2:
        result = contactSchema.safeParse(formData);
        break;

      case 3:
        result = accountSchema.safeParse(formData);
        break;

      case 4:
        result = securitySchema.safeParse(formData);
        break;

      default:
        return false;
    }

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalStep
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            errors={errors}
          />
        );

      case 2:
        return (
          <ContactStep
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            previousStep={previousStep}
            errors={errors}
          />
        );

      case 3:
        return (
          <AccountStep
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            previousStep={previousStep}
            errors={errors}
          />
        );

      case 4:
        return (
          <SecurityStep
            formData={formData}
            handleChange={handleChange}
            previousStep={previousStep}
            errors={errors}
            loading={loading}
          />
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;
    setLoading(true);

    try {
      const res = await register(formData);

      console.log(res);

      if (res.success) {
        toast.success(res.message);

        setTimeout(() => {
        navigate("/verify-email", {
          state: {
            email: res.data.email,
          },
        });
      }, 3000);
      } else {
        toast.error(res.message);
      }
      
    } catch (error) {
      console.log(error);

      console.log(error.response?.data);

      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Columbia Merchant | Register</title>
      <RegisterLayout step={step}>
        <form onSubmit={handleSubmit}>{renderStep()}</form>
      </RegisterLayout>
    </>
  );
}
