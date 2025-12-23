// hooks/usePasswordRecoveryForm.js
'use client';
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordRecoveryEmail } from "../../services/password-recovery/sendPasswordRecoveryService";

export default function usePasswordRecoveryForm() {
    const [errorValue, setErrorValue] = useState(null);
    const [isFormTouched, setTouched] = useState({
        email: false
    });

    const [form, setForm] = useState({
        email: ""
    });

    const emailRef = useRef(null);

    const isValid = {
        email: emailRef.current?.checkValidity() ?? false,
    };

    const submitIsDisabled = useMemo(() => !isValid.email, [isValid]);
    const handleChange = (e) => setForm({ email: e.target.value });
    const handleBlur = () => setTouched({ email: true });

    const router = useRouter();
    const submit = async () => {
        const requestBody = {
            email: form.email,
        };
        const result = await sendPasswordRecoveryEmail(requestBody, router);
        if (!result.ok) {
            setErrorValue(result.error);
        }
    };

    return {
        form,
        emailRef,
        isFormTouched,
        isValid,
        submitIsDisabled,
        handleChange,
        handleBlur,
        submit,
        errorValue,
    };
}
