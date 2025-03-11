import React from "react";
import styles from "./About.module.css";

const About = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About Us - LinkHub</h1>
            <p className={styles.description}>
                Welcome to <strong>LinkHub</strong>, your one-stop platform for finding and managing class WhatsApp groups. 
                We aim to <strong>bridge communication gaps</strong> in university by making it easy for students to connect with their classmates. 
                Whether you're looking for study discussions, project collaborations, or important updates, 
                <strong> LinkHub ensures you never miss out.</strong>
            </p>

            <h2 className={styles.subtitle}>Why Choose LinkHub?</h2>
            <ul className={styles.list}>
                <li>✅ <strong>Seamless Group Discovery</strong> – Find and join your class groups effortlessly.</li>
                <li>✅ <strong>Efficient Group Management</strong> – Organize, share, and access links securely.</li>
                <li>✅ <strong>Better Collaboration</strong> – Stay connected with classmates for discussions, notes, and announcements.</li>
                <li>✅ <strong>Privacy & Security</strong> – We ensure that your shared links are safe and accessible only to the right people.</li>
            </ul>

            <h2 className={styles.subtitle}>Our Mission</h2>
            <p className={styles.mission}>
                At <strong>LinkHub</strong>, our mission is to create a more <strong>connected and collaborative</strong> learning environment. 
                We understand how important communication is for academic success, and we strive to provide a <strong>simple yet powerful </strong> 
                solution to help students stay engaged.
            </p>
        </div>
    );
};

export default About;
