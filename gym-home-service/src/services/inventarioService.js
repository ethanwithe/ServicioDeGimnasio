import api from './api';

const INVENTARIO_API = '/api/inventario';

export const inventarioService = {
  
  // ============ PRODUCTOS ============
  
  /**
   * Obtener todos los productos
   */
  obtenerTodosLosProductos: async () => {
    try {
      const response = await api.get(`${INVENTARIO_API}/productos`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  /**
   * Obtener producto por ID
   */
  obtenerProductoPorId: async (id) => {
    try {
      const response = await api.get(`${INVENTARIO_API}/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  },

  /**
   * Crear nuevo producto
   */
  crearProducto: async (producto) => {
    try {
      const response = await api.post(`${INVENTARIO_API}/productos`, producto);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  },

  /**
   * Actualizar producto
   */
  actualizarProducto: async (id, producto) => {
    try {
      const response = await api.put(`${INVENTARIO_API}/productos/${id}`, producto);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  },

  /**
   * Eliminar producto
   */
  eliminarProducto: async (id) => {
    try {
      const response = await api.delete(`${INVENTARIO_API}/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  },

  /**
   * Obtener productos por categoría
   */
  obtenerProductosPorCategoria: async (categoria) => {
    try {
      const response = await api.get(`${INVENTARIO_API}/productos/categoria/${categoria}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error);
      throw error;
    }
  },

  /**
   * Obtener productos con stock bajo
   */
  obtenerProductosStockBajo: async () => {
    try {
      const response = await api.get(`${INVENTARIO_API}/productos/stock-bajo`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos con stock bajo:', error);
      throw error;
    }
  },

  /**
   * Actualizar stock
   */
  actualizarStock: async (id, cantidad) => {
    try {
      const response = await api.patch(`${INVENTARIO_API}/productos/${id}/stock`, { cantidad });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      throw error;
    }
  },

  /**
   * Buscar productos
   */
  buscarProductos: async (keyword) => {
    try {
      const response = await api.get(`${INVENTARIO_API}/productos/buscar`, {
        params: { keyword }
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar productos:', error);
      throw error;
    }
  },

  // ============ MÁQUINAS ============
  
  /**
   * Obtener todas las máquinas
   */
  obtenerTodasLasMaquinas: async () => {
    try {
      const response = await api.get(`${INVENTARIO_API}/maquinas`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener máquinas:', error);
      throw error;
    }
  },

  /**
   * Obtener máquina por ID
   */
  obtenerMaquinaPorId: async (id) => {
    try {
      const response = await api.get(`${INVENTARIO_API}/maquinas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener máquina:', error);
      throw error;
    }
  },

  /**
   * Crear nueva máquina
   */
  crearMaquina: async (maquina) => {
    try {
      const response = await api.post(`${INVENTARIO_API}/maquinas`, maquina);
      return response.data;
    } catch (error) {
      console.error('Error al crear máquina:', error);
      throw error;
    }
  },

  /**
   * Actualizar máquina
   */
  actualizarMaquina: async (id, maquina) => {
    try {
      const response = await api.put(`${INVENTARIO_API}/maquinas/${id}`, maquina);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar máquina:', error);
      throw error;
    }
  },

  /**
   * Eliminar máquina
   */
  eliminarMaquina: async (id) => {
    try {
      const response = await api.delete(`${INVENTARIO_API}/maquinas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar máquina:', error);
      throw error;
    }
  },

  /**
   * Obtener máquinas por zona
   */
  obtenerMaquinasPorZona: async (zona) => {
    try {
      const response = await api.get(`${INVENTARIO_API}/maquinas/zona/${zona}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener máquinas por zona:', error);
      throw error;
    }
  },

  /**
   * Obtener máquinas por estado
   */
  obtenerMaquinasPorEstado: async (estado) => {
    try {
      const response = await api.get(`${INVENTARIO_API}/maquinas/estado/${estado}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener máquinas por estado:', error);
      throw error;
    }
  },

  /**
   * Cambiar estado de máquina
   */
  cambiarEstadoMaquina: async (id, nuevoEstado) => {
    try {
      const response = await api.patch(`${INVENTARIO_API}/maquinas/${id}/estado`, {
        estado: nuevoEstado
      });
      return response.data;
    } catch (error) {
      console.error('Error al cambiar estado de máquina:', error);
      throw error;
    }
  },

  /**
   * Registrar mantenimiento
   */
  registrarMantenimiento: async (id, fecha) => {
    try {
      const response = await api.patch(`${INVENTARIO_API}/maquinas/${id}/mantenimiento`, {
        fecha
      });
      return response.data;
    } catch (error) {
      console.error('Error al registrar mantenimiento:', error);
      throw error;
    }
  },

  /**
   * Buscar máquinas
   */
  buscarMaquinas: async (keyword) => {
    try {
      const response = await api.get(`${INVENTARIO_API}/maquinas/buscar`, {
        params: { keyword }
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar máquinas:', error);
      throw error;
    }
  },

  // ============ ESTADÍSTICAS ============
  
  /**
   * Obtener estadísticas de inventario
   */
  obtenerEstadisticas: async () => {
    try {
      const response = await api.get(`${INVENTARIO_API}/estadisticas`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  },

  /**
   * Health check
   */
  healthCheck: async () => {
    try {
      const response = await api.get(`${INVENTARIO_API}/health`);
      return response.data;
    } catch (error) {
      console.error('Error en health check:', error);
      throw error;
    }
  }
};

export default inventarioService;