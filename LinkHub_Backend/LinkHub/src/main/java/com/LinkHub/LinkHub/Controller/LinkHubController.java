package com.LinkHub.LinkHub.Controller;

import com.LinkHub.LinkHub.Model.Group;
import com.LinkHub.LinkHub.Service.LinkHubService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;



import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController

public class LinkHubController {

    @Autowired
    private LinkHubService s;


    @GetMapping({"/groups", "/log"})
    public Resource serveReactGroupsPage() {
        return new ClassPathResource("static/index.html");
    }

    @GetMapping("/api/allgroups")
    public List<Group> allGroups() {
        return s.allGroups();
    }

    @PostMapping("/api/addgroup")
    public Group addGroup(@RequestBody Group g) {
        System.out.println("hey i am working.....");
        g.setEmail(getCurrentUserEmail());
        return s.addGroup(g);
    }

    @PutMapping("/api/updategroup/{id}")
    public Group updateGroup(@PathVariable Integer id, @RequestBody Group g) {
        g.setEmail(getCurrentUserEmail());
        return s.updateGroup(id, g);
    }

    @DeleteMapping("/api/deletegroup/{id}")
    public String deleteGroup(@PathVariable Integer id) {
        return s.deleteGroup(id);
    }

    @GetMapping("/api/mygroups")
    public List<Group> getGroupsByLoggedInUser() {
        return s.getGroupsByEmail(getCurrentUserEmail());
    }


    @GetMapping("/api/groups")
    public Page<Group> searchAndFilterGroups(
            @RequestParam(required = false) Integer batch,
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
//        return s.searchAndFilterGroups(batch, query, PageRequest.of(page, size));

        Page<Group> result = s.searchAndFilterGroups(batch, query, PageRequest.of(page, size));

//        // Debugging logs
//        System.out.println("Total Elements: " + result.getTotalElements());
//        System.out.println("Total Pages: " + result.getTotalPages());
//        System.out.println("Current Page: " + result.getNumber());
//        System.out.println("Page Size: " + result.getSize());

        return result;

    }


    // Utility method to get the current logged-in user's email from OAuth2
    private String getCurrentUserEmail() {
        OAuth2User principal = (OAuth2User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getAttribute("email");
    }

    @GetMapping("/api")
    public String home() {
        return "This is our Home buddy";
    }


    @PostMapping("/api/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
        logoutHandler.logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/api/user")
    public ResponseEntity<Map<String, String>> getUser(@AuthenticationPrincipal OAuth2User user) {
        if (user != null) {
            return ResponseEntity.ok(Map.of("name", user.getAttribute("name")));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }



}
