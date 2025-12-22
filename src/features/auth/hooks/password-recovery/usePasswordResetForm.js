import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { USER_CONSTANTS } from "features/shared/constants";
import { resetPassword } from "../../services/password-recovery/resetPasswordService";

export default function usePasswordResetForm(token) {
    const [backendError, setBackendError] = useState(null);
    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    });

    const [isFormTouched, setIsFormTouched] = useState({
        password: false,
        confirmPassword: false
    });

    const isValid = {
        password: form.password.length >= USER_CONSTANTS.PASSWORD_MIN_LENGTH,
        confirmPassword: form.password === form.confirmPassword
    };

    const formIsValid = useMemo(
        () => isValid.password && isValid.confirmPassword,
        [isValid]
    );

    const submitDisabled = !formIsValid;
    const handleChange = e => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleOnBlur = e => {
        setIsFormTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const router = useRouter();
    const submit = async () => {
        const requestBody = {
            password: form.password,
            confirmPassword: form.confirmPassword,
        };
        const result = await resetPassword(requestBody, token, router);
        if (!result.ok) {
            setBackendError(result.error);
        }
    };

    return {
        form,
        isValid,
        isFormTouched,
        submitDisabled,
        backendError,
        handleChange,
        handleOnBlur,
        submit
    };
}
