package com.gimnasio.servicio_usuario.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gimnasio.servicio_usuario.dto.LoginRequest;
import com.gimnasio.servicio_usuario.dto.LoginResponse;
import com.gimnasio.servicio_usuario.dto.UsuarioDTO;
import com.gimnasio.servicio_usuario.model.Usuario;
import com.gimnasio.servicio_usuario.service.UsuarioService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class UsuarioController {

    private final UsuarioService usuarioService;

    /**
     * Endpoint de Login
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("POST /api/usuarios/login - Username: {}", request.getUsername());
        LoginResponse response = usuarioService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Crear nuevo usuario
     */
    @PostMapping
    public ResponseEntity<UsuarioDTO> crearUsuario(@Valid @RequestBody Usuario usuario) {
        log.info("POST /api/usuarios - Creando usuario: {}", usuario.getUsername());
        UsuarioDTO nuevoUsuario = usuarioService.crearUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }
    /**
     * Obtener usuarios
     */
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> obtenerTodosLosClientes() {
        List<UsuarioDTO> clientes = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(clientes);
    }
    /**
     * Obtener usuario por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> obtenerUsuario(@PathVariable Long id) {
        log.info("GET /api/usuarios/{}", id);
        UsuarioDTO usuario = usuarioService.obtenerUsuarioPorId(id);
        return ResponseEntity.ok(usuario);
    }

    /**
     * Obtener usuario por username
     */
    @GetMapping("/username/{username}")
    public ResponseEntity<UsuarioDTO> obtenerUsuarioPorUsername(@PathVariable String username) {
        log.info("GET /api/usuarios/username/{}", username);
        UsuarioDTO usuario = usuarioService.obtenerUsuarioPorUsername(username);
        return ResponseEntity.ok(usuario);
    }

    /**
     * Obtener todos los usuarios
     */
    @GetMapping("/usuarios")
    public ResponseEntity<List<UsuarioDTO>> obtenerTodosLosUsuarios() {
        log.info("GET /api/usuarios");
        List<UsuarioDTO> usuarios = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    /**
     * Obtener usuarios por role
     */
    @GetMapping("/role/{role}")
    public ResponseEntity<List<UsuarioDTO>> obtenerUsuariosPorRole(@PathVariable String role) {
        log.info("GET /api/usuarios/role/{}", role);
        List<UsuarioDTO> usuarios = usuarioService.obtenerUsuariosPorRole(role);
        return ResponseEntity.ok(usuarios);
    }

    /**
     * Obtener usuarios activos
     */
    @GetMapping("/activos")
    public ResponseEntity<List<UsuarioDTO>> obtenerUsuariosActivos() {
        log.info("GET /api/usuarios/activos");
        List<UsuarioDTO> usuarios = usuarioService.obtenerUsuariosActivos();
        return ResponseEntity.ok(usuarios);
    }

    /**
     * Actualizar usuario
     */
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> actualizarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario usuario) {
        log.info("PUT /api/usuarios/{}", id);
        UsuarioDTO usuarioActualizado = usuarioService.actualizarUsuario(id, usuario);
        return ResponseEntity.ok(usuarioActualizado);
    }

    /**
     * Eliminar usuario
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> eliminarUsuario(@PathVariable Long id) {
        log.info("DELETE /api/usuarios/{}", id);
        usuarioService.eliminarUsuario(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario eliminado exitosamente");
        return ResponseEntity.ok(response);
    }

    /**
     * Desactivar usuario
     */
    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Map<String, String>> desactivarUsuario(@PathVariable Long id) {
        log.info("PATCH /api/usuarios/{}/desactivar", id);
        usuarioService.desactivarUsuario(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario desactivado exitosamente");
        return ResponseEntity.ok(response);
    }

    /**
     * Activar usuario
     */
    @PatchMapping("/{id}/activar")
    public ResponseEntity<Map<String, String>> activarUsuario(@PathVariable Long id) {
        log.info("PATCH /api/usuarios/{}/activar", id);
        usuarioService.activarUsuario(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario activado exitosamente");
        return ResponseEntity.ok(response);
    }

    /**
     * Estadísticas de usuarios
     */
    @GetMapping("/estadisticas")
    public ResponseEntity<Map<String, Object>> obtenerEstadisticas() {
        log.info("GET /api/usuarios/estadisticas");
        Map<String, Object> estadisticas = new HashMap<>();
        estadisticas.put("totalActivos", usuarioService.contarUsuariosActivos());
        estadisticas.put("administradores", usuarioService.contarUsuariosPorRole("administrador"));
        estadisticas.put("gerentes", usuarioService.contarUsuariosPorRole("gerente"));
        estadisticas.put("clientes", usuarioService.contarUsuariosPorRole("cliente"));
        estadisticas.put("fundadores", usuarioService.contarUsuariosPorRole("fundador"));
        return ResponseEntity.ok(estadisticas);
    }

    /**
     * Health check
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "servicio-usuario");
        return ResponseEntity.ok(response);
    }
}