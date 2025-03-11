package com.LinkHub.LinkHub.SecurityConfig;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = oauth2User.getAttribute("email");

        // ✅ Restrict to @vitapstudent.ac.in
        if (!email.endsWith("@vitapstudent.ac.in")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied: Unauthorized Email Domain");
            return;
        }
        System.out.println("student logoed in ");
        // ✅ Redirect to frontend if email is valid
        response.sendRedirect("https://linkhub-back-ak.onrender.com/groups");
        //response.sendRedirect("http://ec2-3-108-64-248.ap-south-1.compute.amazonaws.com:8080/allgroups");

    }
}
