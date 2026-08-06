import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginLayout } from '../../components/login/LoginLayout';
import { loginSchema } from '../../validators/auth.schema';

import { login } from '../../services/auth.service';

export function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        keepSignedIn: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        setErrors(prev => ({
            ...prev,
            [name]: undefined,
        }));
    };

    const validateForm = () => {
        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        try {
            const res = await login(formData);
            console.log(res)

            const token =  res?.data?.accessToken;
            const role = res?.data.user.role;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
            }

            alert('login successful!');
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            console.log(error.response?.data);

            alert(
                error.response?.data?.message || 'Something went wrong.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <title>Columbia Merchant | Login</title>

            <LoginLayout
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
                loading={loading}
            />
        </>
    );
}