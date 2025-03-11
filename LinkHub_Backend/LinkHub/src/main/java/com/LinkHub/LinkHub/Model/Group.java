package com.LinkHub.LinkHub.Model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "LinkHubTable")
public class Group implements Serializable {

    private static final long serialVersionUID = 1L; // Added serialVersionUID

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "batch_number", nullable = false)
    private int batchNumber;

    @Column(name = "semester", nullable = false, length = 10)
    private String semester;

    @Column(name = "course_name", nullable = false, length = 255)
    private String courseName;

    @Column(name = "professor_name", nullable = false, length = 255)
    private String professorName;

    @Column(name = "slot", nullable = false, length = 50)
    private String slot;

    @Column(name = "group_link", nullable = false, columnDefinition = "TEXT")
    private String groupLink;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    // Default Constructor
    public Group() {}

    // Parameterized Constructor
    public Group(int batchNumber, String semester, String courseName, String professorName, String slot, String groupLink, String email) {
        this.batchNumber = batchNumber;
        this.semester = semester;
        this.courseName = courseName;
        this.professorName = professorName;
        this.slot = slot;
        this.groupLink = groupLink;
        this.email = email;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getBatchNumber() {
        return batchNumber;
    }

    public void setBatchNumber(int batchNumber) {
        this.batchNumber = batchNumber;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getProfessorName() {
        return professorName;
    }

    public void setProfessorName(String professorName) {
        this.professorName = professorName;
    }

    public String getSlot() {
        return slot;
    }

    public void setSlot(String slot) {
        this.slot = slot;
    }

    public String getGroupLink() {
        return groupLink;
    }

    public void setGroupLink(String groupLink) {
        this.groupLink = groupLink;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Group{" +
                "id=" + id +
                ", batchNumber=" + batchNumber +
                ", semester='" + semester + '\'' +
                ", courseName='" + courseName + '\'' +
                ", professorName='" + professorName + '\'' +
                ", slot='" + slot + '\'' +
                ", groupLink='" + groupLink + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
