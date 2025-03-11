import { useEffect, useState } from "react";
import styles from "./MyGroups.module.css";

const MyGroups = () => {
  const [groups, setGroups] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");


    useEffect(() => {
    fetch("https://linkhub-back-ak.onrender.com/mygroups", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setGroups(data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);


  const handleEdit = (group) => {
    setEditingGroup(group.id);
    setFormData({
      batchNumber: group.batchNumber,
      semester: group.semester,
      courseName: group.courseName,
      professorName: group.professorName,
      slot: group.slot,
      groupLink: group.groupLink,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!formData.batchNumber || !formData.semester || !formData.courseName || !formData.professorName || !formData.slot || !formData.groupLink) {
      setError("All fields are required!");
      return;
    }

    fetch(`https://linkhub-back-ak.onrender.com/updategroup/${editingGroup}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((updatedGroup) => {
        setGroups(groups.map((g) => (g.id === editingGroup ? updatedGroup : g)));
        closeModal();
        showSuccessMessage("Saved Successfully! ✅");
      })
      .catch((error) => console.error("Error updating group:", error));
  };

  const handleDelete = (id) => {
    fetch(`https://linkhub-back-ak.onrender.com/deletegroup/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        setGroups(groups.filter((g) => g.id !== id));
        showSuccessMessage("Deleted Successfully! 🗑️");
      })
      .catch((error) => console.error("Error deleting group:", error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
    setError("");
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Groups</h2>

      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      <ul className={styles.groupList}>
        {groups.map((group) => (
          <li key={group.id} className={styles.groupItem}>
            <div>
              <p><strong>Batch:</strong> {group.batchNumber}</p>
              <p><strong>Semester:</strong> {group.semester}</p>
              <p><strong>Course:</strong> {group.courseName}</p>
              <p><strong>Professor:</strong> {group.professorName}</p>
              <p><strong>Slot:</strong> {group.slot}</p>
              <p>
                <strong>Group Link:</strong>{" "}
                <a href={group.groupLink} target="_blank" rel="noopener noreferrer" className={styles.groupLink}>
                  Join Group
                </a>
              </p>
              <button onClick={() => handleEdit(group)} className={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(group.id)} className={styles.deleteButton}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Edit Group</h3>

            <label>Batch Number:</label>
            <select name="batchNumber" value={formData.batchNumber} onChange={handleChange}>
              <option value="">Select Batch</option>
              {[2022, 2023, 2024, 2025, 2026, 2027].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <label>Semester:</label>
            <select name="semester" value={formData.semester} onChange={handleChange}>
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7].map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>

            <label>Course Name:</label>
            <input type="text" name="courseName" placeholder="Enter Course Name" value={formData.courseName} onChange={handleChange} />

            <label>Professor Name:</label>
            <input type="text" name="professorName" placeholder="Enter Professor Name" value={formData.professorName} onChange={handleChange} />

            <label>Slot:</label>
            <select name="slot" value={formData.slot} onChange={handleChange}>
              <option value="">Select Slot</option>
              {["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "F1", "F2", "G1", "G2"].map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>

            <label>Group Link:</label>
            <input type="text" name="groupLink" placeholder="Enter Group Link" value={formData.groupLink} onChange={handleChange} />

            {error && <p className={styles.error}>{error}</p>}

            <button onClick={handleUpdate} className={styles.saveButton}>Save</button>
            <button onClick={closeModal} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
