import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target['t&c'].checked;
        console.log(name, email, password, accepted);

        if (password.length < 6) {
            setRegisterError('Password must be at least 6 characters long');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password must contain at least one uppercase letter');
            return;
        } else if (!accepted) {
            setRegisterError('You must accept our terms and conditions');
            return;
        }

        setRegisterError('');
        setSuccess('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User registered successfully. Please check your email for verification link.');

                updateProfile(result.user, {
                    displayName: name,
                    photoURL: 'https://example.com/jane-q-user/profile.jpg'
                })
                .then(() => {
                    console.log('Profile updated successfully');
                })
                .catch(error => {
                    console.log(error.message);
                })

                sendEmailVerification(result.user)
                    .then(result => {
                        console.log('Email verification sent', result);
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            })

            .catch(error => {
                setRegisterError(error.message);
            })

    }

    return (
        <div>
            <div className="w-fit mx-auto border p-8 mt-40 shadow-lg rounded-xl">
                <h2 className="text-2xl text-center mb-6">Register Here</h2>
                <form onSubmit={handleRegister}>
                    <input className="w-full border py-2 px-4 mb-4" type="text" name="name" placeholder="enter your name" required /> <br />
                    <input className="w-full border py-2 px-4 mb-4" type="email" name="email" placeholder="enter your email" required /> <br />
                    <input className="border py-2 px-4 mb-4 mr-2" type={showPassword ? 'text' : 'password'} name="password" placeholder="enter your password" required />
                    <span onClick={() => setShowPassword(!showPassword)} className="btn">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    <br />
                    <div className="mb-4">
                        <input type="checkbox" name="t&c" id="t&c" /><label className="ml-2" htmlFor="t&c">Accpet our terms and conditon</label> <br />
                    </div>
                    <input className="w-full btn border py-2 px-4" type="submit" name="submit" id="" />
                </form>
            </div>
            {
                registerError && <p className="text-xl text-center text-red-600 mt-10">{registerError}</p>
            }
            {
                success && <p className="text-xl text-center text-green-600 mt-10">{success}</p>
            }
            <p className="text-center mt-10">Already have an account? <Link to='/login' className="text-blue-700">Login Here</Link></p>
        </div>
    );
};

export default Register;