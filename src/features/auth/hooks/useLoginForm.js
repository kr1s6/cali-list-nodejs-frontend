import { useContext, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "features/shared/context/AuthProvider";
import { login } from "../services/loginService";
import { USER_CONSTANTS } from "features/shared/constants";

export default function useLoginForm() {
  const [errorValue, setErrorValue] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const [isFormTouched, setIsFormTouched] = useState({
    email: false,
    password: false,
  })

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const emailRef = useRef(null);
  const isValid = {
    email: emailRef.current?.checkValidity() ?? false,
    password: form.password.length >= USER_CONSTANTS.PASSWORD_MIN_LENGTH,
  };

  const formIsValid = useMemo(() => (isValid.email && isValid.password), [isValid]);
  const submitBtnIsDisabled = useMemo(() => (!formIsValid), [formIsValid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const handleOnBlur = (e) => {
    setIsFormTouched(prev => ({ ...prev, [e.target.name]: true }));
  }

  const router = useRouter();
  const submit = async () => {
    const requestBody = {
      email: form.email,
      password: form.password,
    };

    const result = await login(requestBody, router, dispatch);
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
    emailRef,
    handleChange,
    handleOnBlur,
    submit
  };
}