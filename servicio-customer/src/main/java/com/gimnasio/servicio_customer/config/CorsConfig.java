package com.gimnasio.servicio_customer.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

	  @Bean
	    public CorsWebFilter corsWebFilter() {
	        return new CorsWebFilter(exchange -> {
	            CorsConfiguration config = new CorsConfiguration();
	            config.setAllowCredentials(true);
	            config.addAllowedOriginPattern("*");
	            config.addAllowedMethod("*");
	            config.addAllowedHeader("*");
	            config.addExposedHeader("*");
	            return config;
	        });
	    }
	}
