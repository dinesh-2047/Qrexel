import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import "../css/signup.css"

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError(null);
        console.log('User signed up with:', { email, password });
        navigate('/');
    };

    return (
        <div className="signup-main min-h-screen w-full items-center justify-center">
            <div className="signup-container">
                <div className='signup-content1 bg-[#004854] text-white '>
                    <h1 className='text-2xl font-bold text-center mb-4'>Welcome Back!</h1>
                    <p>Provide your personal details to use more features</p>
                    <a className="text-2xl font-bold text-center mb-4 hover:bg-[#BEBD00] hover:text-[#004854] hover:border-[#004854]" href="/signin">Sign In</a>
                </div>
                <div className="signup-content2 bg-white p-6 shadow-lg">
                    <div className="content-data">
                        <h2 className="text-2xl font-bold text-center mb-4">Register With</h2>
                        <div className="flex justify-evenly">
                            <button className="border border-1 border-[#004854] text-[#004854] p-4 rounded-[1rem] mr-2 hover:bg-[#004854] hover:text-white"><FontAwesomeIcon className='w-[1.5rem] h-[1.5rem]' icon={faGooglePlusG} /></button>
                            <button className="border border-1 border-[#004854] text-[#004854] p-4 rounded-[1rem] mr-2 hover:bg-[#004854] hover:text-white"><FontAwesomeIcon className='w-[1.5rem] h-[1.5rem]' icon={faFacebookF} /></button>
                            <button className="border border-1 border-[#004854] text-[#004854] p-4 rounded-[1rem] mr-2 hover:bg-[#004854] hover:text-white"><FontAwesomeIcon className='w-[1.5rem] h-[1.5rem]' icon={faGithub} /></button>
                            <button className="border border-1 border-[#004854] text-[#004854] p-4 rounded-[1rem] mr-2 hover:bg-[#004854] hover:text-white"><FontAwesomeIcon className='w-[1.5rem] h-[1.5rem]' icon={faLinkedinIn} /></button>
                        </div>
                        <p className="or text-center my-4">or</p>
                        <p className='text-lg mb-2'>Fill out the following info For registeration</p>
                        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
                        <form onSubmit={handleSignUp} className="flex flex-col">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border rounded mb-5"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border rounded mb-5"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border rounded mb-5"
                                required
                            />
                            <button type="submit" className="bg-[#BEBD00] text-white p-2 rounded hover:bg-[#004854]">Sign Up</button>
                        </form>
                    </div>

                    {/* <p className="text-center mt-4">
                        Already have an account? <a href="/signin" className="text-blue-500">Sign In</a>
                    </p> */}
                </div>
            </div>

        </div>
    );
};

export default SignUp;
