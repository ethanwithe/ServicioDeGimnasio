package com.gimnasio.servicio_inventario.controller;

import com.gimnasio.servicio_inventario.dto.EstadisticasDTO;
import com.gimnasio.servicio_inventario.service.InventarioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/inventario")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class InventarioController {
    
    private final InventarioService inventarioService;
    
    @GetMapping("/estadisticas")
    public ResponseEntity<EstadisticasDTO> obtenerEstadisticas() {
        log.info("GET /api/inventario/estadisticas");
        EstadisticasDTO estadisticas = inventarioService.obtenerEstadisticas();
        return ResponseEntity.ok(estadisticas);
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "servicio-inventario");
        return ResponseEntity.ok(response);
    }
}
