import { USER_CONSTANTS } from "features/shared/constants";
import { AuthContext } from "features/shared/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useRef, useState } from "react";
import { register } from "../services/registerService";

export default function useRegisterForm() {
    const [errorValue, setErrorValue] = useState(null);
    const router = useRouter();
    const { dispatch } = useContext(AuthContext);

    const [isFormTouched, setIsFormTouched] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    })

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const usernameRef = useRef(null);
    const emailRef = useRef(null);

    const isValid = {
        username: usernameRef.current?.checkValidity() ?? false,
        email: emailRef.current?.checkValidity() ?? false,
        password: form.password.length >= USER_CONSTANTS.PASSWORD_MIN_LENGTH,
        confirmPassword: form.confirmPassword === form.password,
    };

    const formIsValid = useMemo(() =>
        (isValid.username && isValid.email && isValid.password && isValid.confirmPassword), [isValid]);

    const submitBtnIsDisabled = useMemo(() => (!formIsValid), [formIsValid]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleOnBlur(e) {
        setIsFormTouched(prev => ({ ...prev, [e.target.name]: true }));
    }

    const userRegistration = async () => {
        const requestBody = {
            username: form.username,
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword,
        };

        const result = await register(requestBody, router, dispatch);
        if (!result.ok) {
            setErrorValue(result.error);
        }
    };

    return {
        form,
        errorValue,
        isValid,
        isFormTouched,
        submitBtnIsDisabled,
        usernameRef,
        emailRef,
        handleChange,
        handleOnBlur,
        userRegistration
    };
}