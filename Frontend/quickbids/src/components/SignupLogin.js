import React, { useState, useEffect } from "react";
import '../style/SignupLogin.css'

const SignupLogin = () => {
    // const navigate=useNavigate();
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [authToken, setAuthToken] = useState(null);
    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle signup or login submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isLogin
            ? "https://parth3105.pythonanywhere.com/api/login/"
            : "https://parth3105.pythonanywhere.com/api/signup/";

        if (!formData.username || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }
        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");

        const requestData = isLogin
            ? { username: formData.username, password: formData.password }
            : {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                    setAuthToken(data.access);
                    localStorage.setItem("access", data.access);
                    localStorage.setItem("refresh", data.refresh);
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("email", data.email)
                } else {
                    setIsLogin(true);
                    setError("Signup successful! Please log in.");
                }
            } else {
                setError(data.error || "An error occurred.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong.");
        }
        window.location.reload()
    };

    // Handle logout
    const handleLogout = () => {
        setAuthToken(null);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setError("Logged out successfully.");
        window.location.reload()

    };

    // Check if user is already logged in by looking for the access token
    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            setAuthToken(token);

        }
    }, []);

    // Toggle between Login and Signup
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setError("");
    };

    return (
        <div className="container">
            {authToken ? (
                <>
                        <div className="card-container">
                            <div className="card">
                                <h2 className="card-title">User Info</h2>
                                <hr></hr>
                                <p><strong>Name:</strong> {localStorage.getItem('username')}</p>
                                <p><strong>Email:</strong> {localStorage.getItem('email')}</p>
                                <button
                                    onClick={handleLogout}
                                    className="logoutBtn"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>


                </>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="form">
                        <h2>{isLogin ? "Login" : "Signup"}</h2>
                        <table>
                            <tr className="formGroup">
                                <td><label>Username</label></td>
                                <td>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            {!isLogin && (
                                <tr className="formGroup">
                                    <td><label>Email</label></td>
                                    <td>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required={!isLogin}
                                        />
                                    </td>
                                </tr>
                            )}
                            <tr className="formGroup">
                                <td><label>Password</label></td>
                                <td>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            {!isLogin && (
                                <tr className="formGroup">
                                    <td><label>Confirm Password</label></td>
                                    <td>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                            )}
                        </table>
                        {error && <p className="error">{error}</p>}
                        <button type="submit" className="button">
                            {isLogin ? "Login" : "Signup"}
                        </button>
                        <p onClick={toggleForm} className="toggleText">
                            {isLogin
                                ? "Don't have an account? Signup here."
                                : "Already have an account? Login here."}
                        </p>
                    </form>
                </>
            )}
        </div>
    );
};

export default SignupLogin;
