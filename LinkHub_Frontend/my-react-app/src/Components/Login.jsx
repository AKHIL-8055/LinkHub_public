// import { useState, useEffect } from "react";
// import styles from "./Login.module.css"; // ✅ Correct Import

// const Login = () => {
//     const [isChecked, setIsChecked] = useState(false);

//     useEffect(() => {
//         const storedAgreement = localStorage.getItem("userAgreed");
//         if (storedAgreement === "true") {
//             setIsChecked(true);
//         }
//     }, []);

//     const handleCheckboxChange = () => {
//         const newValue = !isChecked;
//         setIsChecked(newValue);
//         localStorage.setItem("userAgreed", newValue);
//     };

//     const handleGoogleLogin = () => {
//         if (!isChecked) {
//             alert("You must agree to the Terms & Conditions and Privacy Policy before continuing.");
//             return;
//         }
//         // window.location.href = "http://localhost:8080/oauth2/authorization/google";
//         window.location.href = "https://linkhub-back-ak.onrender.com/oauth2/authorization/google";

//     };

//     return (
//         <div className={styles.container}> 
        
//             <div className={styles.left}>
//                 <video autoPlay loop muted className={styles.video}>
//                     <source src="https://hrcdn.net/fcore/assets/onboarding/globe-5fdfa9a0f4.mp4" type="video/mp4" />
//                 </video>
//             </div>

//             {/* Right Side with Login Form */}
//             <div className={styles.right}>
//                 <h2 className={styles.title}> LinkHub</h2>
                
//                 <div className={styles.checkboxContainer}> {/* ✅ Use styles.checkboxContainer */}
//                     <input 
//                         type="checkbox" 
//                         checked={isChecked} 
//                         onChange={handleCheckboxChange} 
//                     />
//                     I agree to the 
//                     <a href="/TermsAndPrivacy" rel="noopener noreferrer"> Terms & Conditions and Privacy Policy</a>.
//                 </div>

//                 <button 
//                     onClick={handleGoogleLogin} 
//                     disabled={!isChecked} 
//                     className={styles.googleBtn}  
//                 >
//                     <img src="googleicon.png" alt="Google" className={styles.googleIcon} />
//                     Continue with Google
//                 </button>

//                 {/* Additional Message */}
//                 <p className={styles.notice}>
//                     Kindly use your VIT-AP student email to log in. This platform is created by students and is not an official university website. Kindly review the Terms & Conditions before proceeding.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;



//new code
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css"; // ✅ Correct Import

// const Login = () => {
//     const navigate = useNavigate();
//     const [isChecked, setIsChecked] = useState(false);

//     useEffect(() => {
//         const storedAgreement = localStorage.getItem("userAgreed");
//         if (storedAgreement === "true") {
//             setIsChecked(true);
//         }

//         // Check if the user is already logged in
//         fetch("https://linkhub-back-ak.onrender.com/user", {
//             credentials: "include"
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.username) { // Adjust based on what /user API returns
//                 navigate("/groups"); // Redirect to groups page
//             }
//         })
//         .catch(error => console.error("Error fetching user data:", error));
//     }, [navigate]);

//     const handleCheckboxChange = () => {
//         const newValue = !isChecked;
//         setIsChecked(newValue);
//         localStorage.setItem("userAgreed", newValue);
//     };

//     const handleGoogleLogin = () => {
//         if (!isChecked) {
//             alert("You must agree to the Terms & Conditions and Privacy Policy before continuing.");
//             return;
//         }
//         window.location.href = "https://linkhub-back-ak.onrender.com/oauth2/authorization/google";
//     };

//     return (
//         <div className={styles.container}> 
//             <div className={styles.left}>
//                 <video autoPlay loop muted className={styles.video}>
//                     <source src="https://hrcdn.net/fcore/assets/onboarding/globe-5fdfa9a0f4.mp4" type="video/mp4" />
//                 </video>
//             </div>

//             {/* Right Side with Login Form */}
//             <div className={styles.right}>
//                 <h2 className={styles.title}> LinkHub</h2>
                
//                 <div className={styles.checkboxContainer}> {/* ✅ Use styles.checkboxContainer */}
//                     <input 
//                         type="checkbox" 
//                         checked={isChecked} 
//                         onChange={handleCheckboxChange} 
//                     />
//                     I agree to the 
//                     <a href="/TermsAndPrivacy" rel="noopener noreferrer"> Terms & Conditions and Privacy Policy</a>.
//                 </div>

//                 <button 
//                     onClick={handleGoogleLogin} 
//                     disabled={!isChecked} 
//                     className={styles.googleBtn}  
//                 >
//                     <img src="googleicon.png" alt="Google" className={styles.googleIcon} />
//                     Continue with Google
//                 </button>

//                 {/* Additional Message */}
//                 <p className={styles.notice}>
//                     Kindly use your VIT-AP student email to log in. This platform is created by students and is not an official university website. Kindly review the Terms & Conditions before proceeding.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;

//new new code
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; // ✅ Correct Import

const Login = () => {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(true); // ✅ Prevent unnecessary UI updates

    useEffect(() => {
        const storedAgreement = localStorage.getItem("userAgreed");
        if (storedAgreement === "true") {
            setIsChecked(true);
        }

        // Check if the user is already logged in
        const checkUserSession = async () => {
            try {
                const response = await fetch("https://linkhub-back-ak.onrender.com/user", {
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Failed to fetch user data");

                const data = await response.json();
                if (data.username) {
                    navigate("/groups"); // Redirect to groups page if logged in
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false); // ✅ Ensures UI updates properly
            }
        };

        checkUserSession();
    }, [navigate]);

    const handleCheckboxChange = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        localStorage.setItem("userAgreed", newValue);
    };

    const handleGoogleLogin = () => {
        if (!isChecked) {
            alert("You must agree to the Terms & Conditions and Privacy Policy before continuing.");
            return;
        }
        window.location.href = "https://linkhub-back-ak.onrender.com/oauth2/authorization/google";
    };

    if (loading) return <p>Loading...</p>; // ✅ Prevents unnecessary UI flickers

    return (
        <div className={styles.container}> 
            <div className={styles.left}>
                <video autoPlay loop muted className={styles.video}>
                    <source src="https://hrcdn.net/fcore/assets/onboarding/globe-5fdfa9a0f4.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Right Side with Login Form */}
            <div className={styles.right}>
                <h2 className={styles.title}> LinkHub</h2>
                
                <div className={styles.checkboxContainer}> 
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={handleCheckboxChange} 
                    />
                    I agree to the 
                    <a href="/TermsAndPrivacy" rel="noopener noreferrer"> Terms & Conditions and Privacy Policy</a>.
                </div>

                <button 
                    onClick={handleGoogleLogin} 
                    disabled={!isChecked} 
                    className={styles.googleBtn}  
                >
                    <img src="googleicon.png" alt="Google" className={styles.googleIcon} />
                    Continue with Google
                </button>

                {/* Additional Message */}
                <p className={styles.notice}>
                    Kindly use your VIT-AP student email to log in. This platform is created by students and is not an official university website. Kindly review the Terms & Conditions before proceeding.
                </p>
            </div>
        </div>
    );
};

export default Login;


