package com.gimnasio.servicio_customer.service.impl;

import com.gimnasio.servicio_customer.dto.ClienteDTO;
import com.gimnasio.servicio_customer.dto.EstadisticasDTO;
import com.gimnasio.servicio_customer.exception.ClienteNotFoundException;
import com.gimnasio.servicio_customer.model.Cliente;
import com.gimnasio.servicio_customer.repository.ClienteRepository;
import com.gimnasio.servicio_customer.service.ClienteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Year;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ClienteServiceImpl implements ClienteService {
    
    private final ClienteRepository clienteRepository;
    
    @Override
    public ClienteDTO crearCliente(Cliente cliente) {
        log.info("Creando nuevo cliente: {}", cliente.getNombre());
        
        if (clienteRepository.existsByEmail(cliente.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }
        
        if (cliente.getDocumento() != null && 
            clienteRepository.existsByDocumento(cliente.getDocumento())) {
            throw new IllegalArgumentException("El documento ya está registrado");
        }
        
        Cliente nuevoCliente = clienteRepository.save(cliente);
        log.info("Cliente creado exitosamente con ID: {}", nuevoCliente.getId());
        
        return ClienteDTO.fromEntity(nuevoCliente);
    }
    
    @Override
    @Transactional(readOnly = true)
    public ClienteDTO obtenerClientePorId(Long id) {
        log.info("Buscando cliente con ID: {}", id);
        Cliente cliente = clienteRepository.findById(id)
            .orElseThrow(() -> new ClienteNotFoundException(id));
        return ClienteDTO.fromEntity(cliente);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ClienteDTO> obtenerTodosLosClientes() {
        log.info("Obteniendo todos los clientes");
        return clienteRepository.findAll().stream()
            .map(ClienteDTO::fromEntity)
            .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ClienteDTO> obtenerClientesActivos() {
        log.info("Obteniendo clientes activos");
        return clienteRepository.findClientesActivos().stream()
            .map(ClienteDTO::fromEntity)
            .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ClienteDTO> obtenerClientesPorMembresia(String membresia) {
        log.info("Obteniendo clientes por membresía: {}", membresia);
        return clienteRepository.findByMembresia(membresia).stream()
            .map(ClienteDTO::fromEntity)
            .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ClienteDTO> obtenerMembresiasPorVencer(int dias) {
        log.info("Obteniendo membresías por vencer en {} días", dias);
        LocalDate hoy = LocalDate.now();
        LocalDate fechaLimite = hoy.plusDays(dias);
        return clienteRepository.findMembresiasPorVencer(hoy, fechaLimite).stream()
            .map(ClienteDTO::fromEntity)
            .collect(Collectors.toList());
    }
    
    @Override
    public ClienteDTO actualizarCliente(Long id, Cliente clienteActualizado) {
        log.info("Actualizando cliente con ID: {}", id);
        
        Cliente cliente = clienteRepository.findById(id)
            .orElseThrow(() -> new ClienteNotFoundException(id));
        
        if (clienteActualizado.getNombre() != null) {
            cliente.setNombre(clienteActualizado.getNombre());
        }
        if (clienteActualizado.getTelefono() != null) {
            cliente.setTelefono(clienteActualizado.getTelefono());
        }
        if (clienteActualizado.getDireccion() != null) {
            cliente.setDireccion(clienteActualizado.getDireccion());
        }
        if (clienteActualizado.getContactoEmergencia() != null) {
            cliente.setContactoEmergencia(clienteActualizado.getContactoEmergencia());
        }
        if (clienteActualizado.getTelefonoEmergencia() != null) {
            cliente.setTelefonoEmergencia(clienteActualizado.getTelefonoEmergencia());
        }
        if (clienteActualizado.getNotas() != null) {
            cliente.setNotas(clienteActualizado.getNotas());
        }
        
        Cliente clienteGuardado = clienteRepository.save(cliente);
        log.info("Cliente actualizado exitosamente");
        
        return ClienteDTO.fromEntity(clienteGuardado);
    }
    
    @Override
    public void eliminarCliente(Long id) {
        log.info("Eliminando cliente con ID: {}", id);
        if (!clienteRepository.existsById(id)) {
            throw new ClienteNotFoundException(id);
        }
        clienteRepository.deleteById(id);
        log.info("Cliente eliminado exitosamente");
    }
    
    @Override
    public ClienteDTO renovarMembresia(Long id, int meses) {
        log.info("Renovando membresía del cliente ID {} por {} meses", id, meses);
        
        Cliente cliente = clienteRepository.findById(id)
            .orElseThrow(() -> new ClienteNotFoundException(id));
        
        // Renovar desde la fecha de vencimiento actual o desde hoy (lo que sea mayor)
        LocalDate fechaBase = cliente.getFechaVencimiento().isAfter(LocalDate.now()) 
            ? cliente.getFechaVencimiento() 
            : LocalDate.now();
        
        cliente.setFechaVencimiento(fechaBase.plusMonths(meses));
        cliente.setEstado("Activa");
        
        Cliente clienteGuardado = clienteRepository.save(cliente);
        log.info("Membresía renovada exitosamente hasta: {}", clienteGuardado.getFechaVencimiento());
        
        return ClienteDTO.fromEntity(clienteGuardado);
    }
    
    @Override
    public ClienteDTO registrarVisita(Long id) {
        log.info("Registrando visita para cliente ID: {}", id);
        
        Cliente cliente = clienteRepository.findById(id)
            .orElseThrow(() -> new ClienteNotFoundException(id));
        
        cliente.setVisitas(cliente.getVisitas() + 1);
        Cliente clienteGuardado = clienteRepository.save(cliente);
        
        log.info("Visita registrada. Total visitas: {}", clienteGuardado.getVisitas());
        
        return ClienteDTO.fromEntity(clienteGuardado);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ClienteDTO> buscarClientes(String keyword) {
        log.info("Buscando clientes con keyword: {}", keyword);
        return clienteRepository.searchByKeyword(keyword).stream()
            .map(ClienteDTO::fromEntity)
            .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public EstadisticasDTO obtenerEstadisticas() {
        log.info("Obteniendo estadísticas de clientes");
        
        long totalClientes = clienteRepository.count();
        long membresiasActivas = clienteRepository.countMembresiasActivas();
        long membresiasPorVencer = clienteRepository.countMembresiasPorVencer();
        long membresiasVencidas = clienteRepository.countMembresiasVencidas();
        
        // Clientes nuevos del último mes
        LocalDate haceUnMes = LocalDate.now().minusMonths(1);
        long nuevosClientes = clienteRepository.findClientesNuevos(haceUnMes).size();
        
        // Tasa de retención (simulada)
        double tasaRetencion = totalClientes > 0 
            ? (double) membresiasActivas / totalClientes * 100 
            : 0.0;
        
        // Distribución por tipo de membresía
        Map<String, Long> distribucionMembresias = new HashMap<>();
        List<Object[]> membresias = clienteRepository.countByMembresia();
        for (Object[] row : membresias) {
            distribucionMembresias.put((String) row[0], (Long) row[1]);
        }
        
        return EstadisticasDTO.builder()
            .totalClientes(totalClientes)
            .membresiasActivas(membresiasActivas)
            .membresiasPorVencer(membresiasPorVencer)
            .membresiasVencidas(membresiasVencidas)
            .nuevosClientes(nuevosClientes)
            .tasaRetencion(Math.round(tasaRetencion * 10.0) / 10.0)
            .distribucionMembresias(distribucionMembresias)
            .build();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> obtenerCrecimientoMensual() {
        log.info("Obteniendo crecimiento mensual de clientes");
        
        int anioActual = Year.now().getValue();
        List<Object[]> resultados = clienteRepository.findCrecimientoPorMes(anioActual);
        
        List<Map<String, Object>> crecimiento = new ArrayList<>();
        
        String[] meses = {"Ene", "Feb", "Mar", "Abr", "May", "Jun", 
                         "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"};
        
        for (Object[] row : resultados) {
            Map<String, Object> mes = new HashMap<>();
            int mesNum = ((Number) row[0]).intValue();
            mes.put("mes", meses[mesNum - 1]);
            mes.put("nuevos", ((Number) row[1]).longValue());
            mes.put("bajas", 0L); // Simulated
            crecimiento.add(mes);
        }
        
        return crecimiento;
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ClienteDTO> obtenerTopClientes(int limite) {
        log.info("Obteniendo top {} clientes", limite);
        return clienteRepository.findTop10ByOrderByVisitasDesc().stream()
            .limit(limite)
            .map(ClienteDTO::fromEntity)
            .collect(Collectors.toList());
    }
}