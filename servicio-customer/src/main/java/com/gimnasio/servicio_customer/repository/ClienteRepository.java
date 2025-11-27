package com.gimnasio.servicio_customer.repository;

import com.gimnasio.servicio_customer.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    Optional<Cliente> findByEmail(String email);
    
    Optional<Cliente> findByDocumento(String documento);
    
    List<Cliente> findByEstado(String estado);
    
    List<Cliente> findByMembresia(String membresia);
    
    boolean existsByEmail(String email);
    
    boolean existsByDocumento(String documento);
    
    @Query("SELECT c FROM Cliente c WHERE c.estado = 'Activa'")
    List<Cliente> findClientesActivos();
    
    @Query("SELECT c FROM Cliente c WHERE c.fechaVencimiento BETWEEN :fechaInicio AND :fechaFin")
    List<Cliente> findMembresiasPorVencer(@Param("fechaInicio") LocalDate fechaInicio, 
                                           @Param("fechaFin") LocalDate fechaFin);
    
    @Query("SELECT c FROM Cliente c WHERE c.fechaRegistro >= :fecha")
    List<Cliente> findClientesNuevos(@Param("fecha") LocalDate fecha);
    
    @Query("SELECT c FROM Cliente c WHERE c.nombre LIKE %:keyword% OR c.email LIKE %:keyword% OR c.documento LIKE %:keyword%")
    List<Cliente> searchByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT COUNT(c) FROM Cliente c WHERE c.estado = 'Activa'")
    long countMembresiasActivas();
    
    @Query("SELECT COUNT(c) FROM Cliente c WHERE c.estado = 'Por Vencer'")
    long countMembresiasPorVencer();
    
    @Query("SELECT COUNT(c) FROM Cliente c WHERE c.estado = 'Vencida'")
    long countMembresiasVencidas();
    
    @Query("SELECT c.membresia, COUNT(c) FROM Cliente c GROUP BY c.membresia")
    List<Object[]> countByMembresia();
    
    List<Cliente> findTop10ByOrderByVisitasDesc();
    
    @Query("SELECT FUNCTION('MONTH', c.fechaRegistro) as mes, COUNT(c) as nuevos " +
           "FROM Cliente c WHERE FUNCTION('YEAR', c.fechaRegistro) = :anio " +
           "GROUP BY FUNCTION('MONTH', c.fechaRegistro) ORDER BY mes")
    List<Object[]> findCrecimientoPorMes(@Param("anio") int anio);
}