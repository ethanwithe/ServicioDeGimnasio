import api from './api';

const CLIENTE_API = '/api/clientes';

export const clienteService = {
  
  /**
   * Obtener todos los clientes
   */
  obtenerTodosLosClientes: async () => {
    try {
      const response = await api.get(`${CLIENTE_API}/clientes`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      throw error;
    }
  },

  /**
   * Obtener cliente por ID
   */
  obtenerClientePorId: async (id) => {
    try {
      const response = await api.get(`${CLIENTE_API}/clientes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener cliente:', error);
      throw error;
    }
  },

  /**
   * Crear nuevo cliente
   */
  crearCliente: async (cliente) => {
    try {
      const response = await api.post(`${CLIENTE_API}/clientes`, cliente);
      return response.data;
    } catch (error) {
      console.error('Error al crear cliente:', error);
      throw error;
    }
  },

  /**
   * Actualizar cliente
   */
  actualizarCliente: async (id, cliente) => {
    try {
      const response = await api.put(`${CLIENTE_API}/clientes/${id}`, cliente);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      throw error;
    }
  },

  /**
   * Eliminar cliente
   */
  eliminarCliente: async (id) => {
    try {
      const response = await api.delete(`${CLIENTE_API}/clientes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      throw error;
    }
  },

  /**
   * Obtener clientes activos
   */
  obtenerClientesActivos: async () => {
    try {
      const response = await api.get(`${CLIENTE_API}/clientes/activos`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener clientes activos:', error);
      throw error;
    }
  },

  /**
   * Obtener clientes por membresía
   */
  obtenerClientesPorMembresia: async (membresia) => {
    try {
      const response = await api.get(`${CLIENTE_API}/clientes/membresia/${membresia}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener clientes por membresía:', error);
      throw error;
    }
  },

  /**
   * Obtener membresías por vencer
   */
  obtenerMembresiasPorVencer: async (dias = 30) => {
    try {
      const response = await api.get(`${CLIENTE_API}/clientes/por-vencer`, {
        params: { dias }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener membresías por vencer:', error);
      throw error;
    }
  },

  /**
   * Renovar membresía
   */
  renovarMembresia: async (id, meses) => {
    try {
      const response = await api.patch(`${CLIENTE_API}/clientes/${id}/renovar`, {
        meses
      });
      return response.data;
    } catch (error) {
      console.error('Error al renovar membresía:', error);
      throw error;
    }
  },

  /**
   * Registrar visita
   */
  registrarVisita: async (id) => {
    try {
      const response = await api.patch(`${CLIENTE_API}/clientes/${id}/visita`);
      return response.data;
    } catch (error) {
      console.error('Error al registrar visita:', error);
      throw error;
    }
  },

  /**
   * Buscar clientes
   */
  buscarClientes: async (keyword) => {
    try {
      const response = await api.get(`${CLIENTE_API}/clientes/buscar`, {
        params: { keyword }
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar clientes:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas
   */
  obtenerEstadisticas: async () => {
    try {
      const response = await api.get(`${CLIENTE_API}/estadisticas`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  },

  /**
   * Obtener crecimiento mensual
   */
  obtenerCrecimientoMensual: async () => {
    try {
      const response = await api.get(`${CLIENTE_API}/crecimiento`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener crecimiento:', error);
      throw error;
    }
  },

  /**
   * Obtener top clientes
   */
  obtenerTopClientes: async (limite = 10) => {
    try {
      const response = await api.get(`${CLIENTE_API}/clientes/top`, {
        params: { limite }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener top clientes:', error);
      throw error;
    }
  },

  /**
   * Health check
   */
  healthCheck: async () => {
    try {
      const response = await api.get(`${CLIENTE_API}/health`);
      return response.data;
    } catch (error) {
      console.error('Error en health check:', error);
      throw error;
    }
  }
};

export default clienteService;