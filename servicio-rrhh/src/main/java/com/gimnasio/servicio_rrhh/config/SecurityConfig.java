package com.gimnasio.servicio_rrhh.config;

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
        .csrf(csrf -> csrf.disable()) // Lambda DSL para deshabilitar CSRF
        .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Lambda DSL para autorizaciones

        return http.build();
    }
}