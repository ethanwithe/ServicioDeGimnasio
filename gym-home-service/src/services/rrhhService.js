import api from './api';

const RRHH_API = '/rrhh';

export const rrhhService = {
  
  /**
   * Crear nuevo personal
   */
  crearPersonal: async (personal) => {
    try {
      const response = await api.post(`${RRHH_API}/personal`, personal);
      return response.data;
    } catch (error) {
      console.error('Error al crear personal:', error);
      throw error;
    }
  },

  /**
   * Obtener todo el personal
   */
  obtenerTodoElPersonal: async () => {
    try {
      const response = await api.get(`${RRHH_API}/personal`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener personal:', error);
      throw error;
    }
  },

  /**
   * Obtener personal por ID
   */
  obtenerPersonalPorId: async (id) => {
    try {
      const response = await api.get(`${RRHH_API}/personal/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener personal:', error);
      throw error;
    }
  },

  /**
   * Obtener personal activo
   */
  obtenerPersonalActivo: async () => {
    try {
      const response = await api.get(`${RRHH_API}/personal/activos`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener personal activo:', error);
      throw error;
    }
  },

  /**
   * Obtener personal por departamento
   */
  obtenerPersonalPorDepartamento: async (departamento) => {
    try {
      const response = await api.get(`${RRHH_API}/personal/departamento/${departamento}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener personal por departamento:', error);
      throw error;
    }
  },

  /**
   * Obtener personal por puesto
   */
  obtenerPersonalPorPuesto: async (puesto) => {
    try {
      const response = await api.get(`${RRHH_API}/personal/puesto/${puesto}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener personal por puesto:', error);
      throw error;
    }
  },

  /**
   * Obtener personal por estado
   */
  obtenerPersonalPorEstado: async (estado) => {
    try {
      const response = await api.get(`${RRHH_API}/personal/estado/${estado}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener personal por estado:', error);
      throw error;
    }
  },

  /**
   * Actualizar personal
   */
  actualizarPersonal: async (id, personal) => {
    try {
      const response = await api.put(`${RRHH_API}/personal/${id}`, personal);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar personal:', error);
      throw error;
    }
  },

  /**
   * Eliminar personal
   */
  eliminarPersonal: async (id) => {
    try {
      const response = await api.delete(`${RRHH_API}/personal/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar personal:', error);
      throw error;
    }
  },

  /**
   * Cambiar estado del personal
   */
  cambiarEstado: async (id, nuevoEstado) => {
    try {
      const response = await api.patch(`${RRHH_API}/personal/${id}/estado`, {
        estado: nuevoEstado
      });
      return response.data;
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      throw error;
    }
  },

  /**
   * Buscar personal por keyword
   */
  buscarPersonal: async (keyword) => {
    try {
      const response = await api.get(`${RRHH_API}/personal/buscar`, {
        params: { keyword }
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar personal:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas
   */
  obtenerEstadisticas: async () => {
    try {
      const response = await api.get(`${RRHH_API}/estadisticas`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  },

  /**
   * Obtener contrataciones recientes
   */
  obtenerContratacionesRecientes: async (meses = 3) => {
    try {
      const response = await api.get(`${RRHH_API}/personal/recientes`, {
        params: { meses }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener contrataciones recientes:', error);
      throw error;
    }
  },

  /**
   * Health check del servicio
   */
  healthCheck: async () => {
    try {
      const response = await api.get(`${RRHH_API}/health`);
      return response.data;
    } catch (error) {
      console.error('Error en health check:', error);
      throw error;
    }
  }
};

export default rrhhService;