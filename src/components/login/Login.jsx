import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');

    const emailRef = useRef(null);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setLoginError('');
        setSuccess('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(result.user.emailVerified) {
                    setSuccess('User logged in successfully');
                } else {
                    setLoginError('Please verify your email address');
                }
            })
            .catch(error => {
                setLoginError(error.message);
            })
    }

    const handleForgetPassword = () => {
        console.log('Send password reset email', emailRef.current.value);
        const email = emailRef.current.value;
        if (!email) {
            console.log('Forget password clicked', emailRef.current.value);
        } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.log('Please enter a valid email address');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then((response) => {
                console.log('Send password reset email',);
                console.log(response);
            })
            .catch(error => {
                console.log(error.message);
            })
    }



    return (
        <div className="mt-40">
            <h2 className="text-2xl text-center mb-6">Please Login</h2>
            <div className="w-96 p-4 mx-auto">
                <form onSubmit={handleLogin}>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="email" ref={emailRef} className="grow" name="email" placeholder="Email" required />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" className="grow" name="password" placeholder="password" required />
                    </label>
                    <div className="mb-4">
                        <a onClick={handleForgetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                    </div>
                    <input type="submit" className="btn w-full mt-4" />
                </form>
                {loginError && <div className="text-red-500 text-center mt-4">{loginError}</div>}
                {success && <div className="text-green-500 text-center mt-4">{success}</div>}
                <p className="text-center mt-10">Don&apos;t have an account? <Link to='/register' className="text-blue-700">Register Here</Link></p>
            </div>
        </div>
    );
};

export default Login;
