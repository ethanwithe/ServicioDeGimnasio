package com.gimnasio.servicio_usuario.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Desactivar CSRF (nuevo estilo)
            .csrf(csrf -> csrf.disable())

           // Autorización usando Lambda DSL (nuevo estilo)
           .authorizeHttpRequests(auth -> auth
               .anyRequest().permitAll()
            );
        return http.build();
    }
}