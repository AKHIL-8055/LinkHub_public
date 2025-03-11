import { useState } from "react";
import styles from "./AddGroup.module.css";

const AddGroup = () => {
  const [newGroup, setNewGroup] = useState({
    batchNumber: "",
    semester: "",
    courseName: "",
    professorName: "",
    slot: "",
    groupLink: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isValidWhatsAppLink = (url) => {
    const pattern = /^(https?:\/\/)?(chat\.whatsapp\.com\/|wa\.me\/)/;
    return pattern.test(url);
  };

  const handleChange = (e) => {
    setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
  };

  const handleAddGroup = () => {
    const { batchNumber, semester, courseName, professorName, slot, groupLink } = newGroup;
    
    if (!batchNumber || !semester || !courseName || !professorName || !slot || !groupLink) {
      setError("All fields are required!");
      return;
    }

    if (!isValidWhatsAppLink(groupLink)) {
      setError("Please enter a valid WhatsApp group link!");
      return;
    }

    setError("");

    fetch("https://linkhub-back-ak.onrender.com/addgroup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGroup),
    })
      .then((response) => response.json())
      .then(() => {
        setSuccessMessage("Group added successfully!");
        setTimeout(() => setSuccessMessage(""), 2000);
        setNewGroup({
          batchNumber: "",
          semester: "",
          courseName: "",
          professorName: "",
          slot: "",
          groupLink: "",
        });
      })
      .catch((error) => console.error("Error adding group:", error));
  };

  const slots = [
    "A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "F1", "F2", "G1", "G2",
    "L1+L2", "L2+L3", "L3+L4", "L4+L5", "L5+L6", "L6+L7", "L7+L8", "L8+L9", "L9+L10",
    "L10+L11", "L11+L12", "L12+L13", "L13+L14", "L14+L15", "L15+L16", "L16+L17",
    "L17+L18", "L18+L19", "L19+L20", "L20+L21", "L21+L22", "L22+L23", "L23+L24",
    "L24+L25", "L25+L26", "L26+L27", "L27+L28", "L28+L29", "L29+L30", "L30+L31",
    "L31+L32", "L32+L33", "L33+L34", "L34+L35", "L35+L36", "L36+L37", "L37+L38",
    "L38+L39", "L39+L40", "L40+L41", "L41+L42", "L42+L43", "L43+L44", "L44+L45",
    "L45+L46", "L46+L47", "L47+L48", "L48+L49", "L49+L50", "L50+L51", "L51+L52",
    "L52+L53", "L53+L54", "L54+L55", "L55+L56", "L56+L57", "L57+L58", "L58+L59",
    "L59+L60"
  ];
  

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Group</h2>
      <p className={styles.warning}>⚠️  Kindly ensure that the group you are about to create does not already exist to prevent duplication.</p>
      <label>Batch Number:</label>
      <select name="batchNumber" className={styles.input} value={newGroup.batchNumber} onChange={handleChange}>
        <option value="">Select Batch</option>
        {[2022, 2023, 2024, 2025, 2026, 2027].map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      
      <label>Semester:</label>
      <select name="semester" className={styles.input} value={newGroup.semester} onChange={handleChange}>
        <option value="">Select Semester</option>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
          <option key={sem} value={sem}>{sem}</option>
        ))}
      </select>
      
      <label>Course Name:</label>
      <input type="text" name="courseName" className={styles.input} placeholder="Enter Course Name" value={newGroup.courseName} onChange={handleChange} />
      
      <label>Professor Name:</label>
      <input type="text" name="professorName" className={styles.input} placeholder="Enter Professor Name" value={newGroup.professorName} onChange={handleChange} />
      
      <label>Slot:</label>
      <select name="slot" className={styles.input} value={newGroup.slot} onChange={handleChange}>
        <option value="">Select Slot</option>
        {slots.map((slot) => (
          <option key={slot} value={slot}>{slot}</option>
        ))}
      </select>
      
      <label>Group Link:</label>
      <input type="text" name="groupLink" className={styles.input} placeholder="Enter WhatsApp Group Link" value={newGroup.groupLink} onChange={handleChange} />
      
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      
      <button className={styles.button} onClick={handleAddGroup}>Add Group</button>
    </div>
  );
};

export default AddGroup;
