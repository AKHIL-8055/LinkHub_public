package com.LinkHub.LinkHub.Repo;

import com.LinkHub.LinkHub.Model.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LinkHubRepo extends JpaRepository<Group, Integer> {

    // Find groups by email
    List<Group> findByEmail(String email);

    // Fetch groups by batch number with pagination
    Page<Group> findByBatchNumber(Integer batchNumber, Pageable pageable);

    // Search across all fields (case-insensitive) with pagination
    @Query("SELECT g FROM Group g WHERE " +
            "LOWER(g.semester) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(g.courseName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(g.professorName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(g.slot) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "CAST(g.batchNumber AS string) LIKE CONCAT('%', :query, '%')")
    Page<Group> searchAcrossAllFields(@Param("query") String query, Pageable pageable);

    // Search within a specific batch with pagination
    @Query("SELECT g FROM Group g WHERE g.batchNumber = :batch AND (" +
            "LOWER(g.semester) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(g.courseName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(g.professorName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(g.slot) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Group> searchWithinBatch(@Param("batch") Integer batch, @Param("query") String query, Pageable pageable);

}
