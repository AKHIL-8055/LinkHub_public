package com.LinkHub.LinkHub.Service;

import com.LinkHub.LinkHub.Model.Group;
import com.LinkHub.LinkHub.Repo.LinkHubRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@EnableRedisRepositories
public class LinkHubService {

    @Autowired
    private LinkHubRepo r;


    // 🔍 Fetch groups with search & filter (Cacheable)
    //@Cacheable(value = "groups", key = "'batch_' + #batch + '_query_' + #query + '_page_' + #pageable.pageNumber")
    public Page<Group> searchAndFilterGroups(Integer batch, String query, Pageable pageable) {
        if (batch != null && query != null) {
            return r.searchWithinBatch(batch, query, pageable);
        } else if (batch != null) {
            return r.findByBatchNumber(batch, pageable);
        } else if (query != null) {
            return r.searchAcrossAllFields(query, pageable);
        } else {
            System.out.println("database dude");
            return r.findAll(pageable);
        }
    }



    //@Transactional
    //@CacheEvict(value = "groups", allEntries = true)
    public Group addGroup(Group g) {
        return r.save(g); // Saves to DB & updates cache directly
    }



    //@Transactional
    //@CacheEvict(value = "groups", allEntries = true)
    public Group updateGroup(Integer id, Group updatedGroup) {
        Group existingGroup = r.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found with ID: " + id));

        existingGroup.setBatchNumber(updatedGroup.getBatchNumber());
        existingGroup.setSemester(updatedGroup.getSemester());
        existingGroup.setCourseName(updatedGroup.getCourseName());
        existingGroup.setProfessorName(updatedGroup.getProfessorName());
        existingGroup.setSlot(updatedGroup.getSlot());
        existingGroup.setGroupLink(updatedGroup.getGroupLink());
        existingGroup.setEmail(updatedGroup.getEmail());

        return r.save(existingGroup); // Saves to DB & updates cache
    }

    //@Transactional
    //@CacheEvict(value = "groups", allEntries = true)
    public String deleteGroup(Integer id) {
        if (!r.existsById(id)) {
            throw new RuntimeException("Group not found with ID: " + id);
        }
        r.deleteById(id);
        return "Deleted successfully.";
    }

    // Get all groups
    public List<Group> allGroups() {
        return r.findAll();
    }

    // Get groups by logged-in user email
    public List<Group> getGroupsByEmail(String currentUserEmail) {
        return r.findByEmail(currentUserEmail);
    }
}
