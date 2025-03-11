import React from "react";
import styles from "./TermsAndPrivacy.module.css";

const TermsAndPrivacy = () => {
    return (
        <div className={styles.container}>
            <h2>Privacy Policy</h2>
            <p><strong>Effective Date:</strong> 15-02-2025</p>
            <p>Welcome to LinkHub! Your privacy is important to us. This Privacy Policy explains how we handle your data.</p>

            <h3>1. Information We Collect</h3>
            <ul>
                <li><strong>Google OAuth2 Login Data:</strong> When you log in using Google, we collect your name, email, and profile picture.</li>
                <li><strong>Group Information:</strong> We collect batch, semester, course details, professor name, and group links that you submit.</li>
            </ul>

            <h3>2. How We Use Your Data</h3>
            <ul>
                <li>To authenticate users via Google OAuth2.</li>
                <li>To display and manage group details shared by users.</li>
                <li>To improve platform experience and prevent spam or abuse.</li>
            </ul>

            <h3>3. Data Protection</h3>
            <ul>
                <li>We do not store your Google password or sensitive login credentials.</li>
                <li>Your personal data is never shared, sold, or used for ads.</li>
            </ul>


            <h3>5. Contact Us</h3>
            <p>
                For privacy concerns, email us at :
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=helplinkhub@gmail.com" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    helplinkhub@gmail.com
                </a>
            </p>

            <hr />

            <h2>Terms & Conditions</h2>
            <p><strong>Effective Date:</strong> 15-02-2025</p>
            <p>By using LinkHub, you agree to the following terms:</p>

            <h3>1. User Responsibilities</h3>
            <ul>
                <li>You must use Google OAuth2 login to access the platform.</li>
                <li>You agree to provide accurate group details and not share misleading or harmful links.</li>
                <li>You are responsible for securing your own account.</li>
            </ul>

            <h3>2. Allowed & Prohibited Content</h3>
            <ul>
                <li><strong>Allowed:</strong> Official university/class-related group links.</li>
                <li><strong>Prohibited:</strong> Spam, fake links, inappropriate, or illegal content.</li>
            </ul>



            <h3>3. Account Suspension</h3>
            <ul>
                <li>Any misuse or violation of these terms may result in account suspension or a permanent ban.</li>
            </ul>

            <h3>4. Changes to These Terms</h3>
            <ul>
                <li>We may update these terms and notify users of major changes.</li>
            </ul>

            <p>
                For any concerns, email us at  :
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=helplinkhub@gmail.com" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    helplinkhub@gmail.com
                </a>
            </p>
        </div>
    );
}

export default TermsAndPrivacy;
