import api from './api';

const USUARIOS_API = '/users/usuarios';

export const usuarioService = {
  
  /**
   * Login de usuario
   */
  login: async (credentials) => {
    try {
      const response = await api.post(`${USUARIOS_API}/login`, credentials);
      
      if (response.data.success) {
        // Guardar datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(response.data.usuario));
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error en el login');
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  /**
   * Logout
   */
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  /**
   * Obtener usuario actual del localStorage
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Verificar si hay un usuario autenticado
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  },

  /**
   * Crear nuevo usuario
   */
  crearUsuario: async (usuario) => {
    try {
      const response = await api.post(USUARIOS_API, usuario);
      return response.data;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  },

  /**
   * Obtener usuario por ID
   */
  obtenerUsuarioPorId: async (id) => {
    try {
      const response = await api.get(`${USUARIOS_API}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  },

  /**
   * Obtener usuario por username
   */
  obtenerUsuarioPorUsername: async (username) => {
    try {
      const response = await api.get(`${USUARIOS_API}/username/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuario por username:', error);
      throw error;
    }
  },

  /**
   * Obtener todos los usuarios
   */
  obtenerTodosLosUsuarios: async () => {
    try {
      const response = await api.get(USUARIOS_API);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },

  /**
   * Obtener usuarios por rol
   */
  obtenerUsuariosPorRole: async (role) => {
    try {
      const response = await api.get(`${USUARIOS_API}/role/${role}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios por rol:', error);
      throw error;
    }
  },

  /**
   * Obtener usuarios activos
   */
  obtenerUsuariosActivos: async () => {
    try {
      const response = await api.get(`${USUARIOS_API}/activos`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios activos:', error);
      throw error;
    }
  },

  /**
   * Actualizar usuario
   */
  actualizarUsuario: async (id, usuario) => {
    try {
      const response = await api.put(`${USUARIOS_API}/${id}`, usuario);
      
      // Si se actualiza el usuario actual, actualizar localStorage
      const currentUser = usuarioService.getCurrentUser();
      if (currentUser && currentUser.id === id) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  },

  /**
   * Eliminar usuario
   */
  eliminarUsuario: async (id) => {
    try {
      const response = await api.delete(`${USUARIOS_API}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  },

  /**
   * Desactivar usuario
   */
  desactivarUsuario: async (id) => {
    try {
      const response = await api.patch(`${USUARIOS_API}/${id}/desactivar`);
      return response.data;
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
      throw error;
    }
  },

  /**
   * Activar usuario
   */
  activarUsuario: async (id) => {
    try {
      const response = await api.patch(`${USUARIOS_API}/${id}/activar`);
      return response.data;
    } catch (error) {
      console.error('Error al activar usuario:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de usuarios
   */
  obtenerEstadisticas: async () => {
    try {
      const response = await api.get(`${USUARIOS_API}/estadisticas`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  },

  /**
   * Health check del servicio
   */
  healthCheck: async () => {
    try {
      const response = await api.get(`${USUARIOS_API}/health`);
      return response.data;
    } catch (error) {
      console.error('Error en health check:', error);
      throw error;
    }
  }
};

export default usuarioService;