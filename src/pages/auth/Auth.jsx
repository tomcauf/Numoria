import React, { useState, useEffect } from 'react';
import { useMatch, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx'
import '../../css/Auth.css'

function Auth() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const isLogin = useMatch("/login");
    const auth = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await auth.login(email, password);
        console.log("Code: ", response.code, ", Message: ", response.message);
        if (await response.code == 200) {
            return <Navigate to="/" />
        } else {
            setEmailError(response.emailError);
            setPasswordError(response.passwordError);
        }
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await auth.register(username, email, password);
        console.log("Code: ", response.code, ", Message: ", response.message);
        if (response.code === 200) {
            return <Navigate to="/" />;
        } else {
            setUsernameError(response.usernameError);
            setEmailError(response.emailError);
            setPasswordError(response.passwordError);
            setConfirmPasswordError(response.confirmPasswordError);
        }
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value.length < 3) {
            setUsernameError("Username must be at least 3 characters long");
        } else {
            setUsernameError("");
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!e.target.value.includes("@")) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
        } else {
            setPasswordError("");
        }
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        if (isLogin) {
            handleLogin(e);
        }
        else {
            handleRegister(e);
        }

    }
    useEffect(() => {
        let isValid = false;
        if (isLogin) {
            isValid = (email.length >= 3 && password.length >= 6 && !emailError && !passwordError);
        } else {
            isValid = (username.length >= 3 && email.length >= 3 && password.length >= 6 && confirmPassword.length >= 6 && !usernameError && !emailError && !passwordError && !confirmPasswordError);
        }
        setIsFormValid(isValid);

    }, [username, email, password, confirmPassword]);

    return (
        <>
            <div className="auth">
                <h1>{isLogin ? "Login" : "Register"}</h1>
                <form className="form-auth" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-control">
                            <input type="text" placeholder='Username' value={username} onChange={handleUsernameChange} />
                            {usernameError && <div className="error">{usernameError}</div>}
                        </div>
                    )}
                    <div className="form-control">
                        <input type="text" placeholder='Email' value={email} onChange={handleEmailChange} />
                        {emailError && <div className="error">{emailError}</div>}
                    </div>
                    <div className="form-control">
                        <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} />
                        {passwordError && <div className="error">{passwordError}</div>}
                    </div>
                    {!isLogin ? (
                        <>
                            <div className="form-control">
                                <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
                            </div>
                            <a className='text-hover' href="/login">Already have an account?</a>
                        </>
                    ) : (
                        <>
                            <div className='text-hover'>Forgot password?</div>
                            <a className='text-hover' href="/register">Create an account?</a>
                        </>
                    )}
                    <button
                        className={`form-button textButton ${!isFormValid ? 'btn-disabled' : ''}`}
                        disabled={!isFormValid}>
                        {isLogin ? <><i className='fas fa-logged'></i>Sign In</> : <><i className='fas fa-login-add'></i>Sign Up</>}
                    </button>
                </form>
            </div>
        </>
    )
}

export default Auth