
// orginal code with default success handler

// package com.LinkHub.LinkHub.SecurityConfig;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity
// public class SecurityConfig {

//     @Bean
//     SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
//         http.csrf(AbstractHttpConfigurer::disable)
//             .authorizeHttpRequests(authorizeRequests -> 
//                 authorizeRequests.anyRequest().authenticated())
//             .oauth2Login(oauth2 -> 
//                 oauth2.defaultSuccessUrl("https://linkhub-back-ak.onrender.com/groups", true));

//         return http.build();
//     }

//     @Bean
//     public WebMvcConfigurer corsConfigurer() {
//         return new WebMvcConfigurer() {
//             @Override
//             public void addCorsMappings(CorsRegistry registry) {
//                 registry.addMapping("/**")
//                     .allowedOrigins("https://linkhub-back-ak.onrender.com")
//                     .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                     .allowedHeaders("*")
//                     .allowCredentials(true);
//             }
//         };
//     }
// }


// this works without loginpage
package com.LinkHub.LinkHub.SecurityConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;

    public SecurityConfig(CustomOAuth2SuccessHandler customOAuth2SuccessHandler) {
        this.customOAuth2SuccessHandler = customOAuth2SuccessHandler;
    }

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorizeRequests -> 
                authorizeRequests
                    .requestMatchers("/log").permitAll()  // ✅ Allow access to /log (React login page)
                    .anyRequest().authenticated())
            .oauth2Login(oauth2 -> 
                oauth2.successHandler(customOAuth2SuccessHandler));

        return http.build();
    }


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("https://linkhub-back-ak.onrender.com")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}


