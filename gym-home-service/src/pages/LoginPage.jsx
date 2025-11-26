import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Dumbbell } from 'lucide-react';
import gymHero from '../assets/gym-hero.jpg';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Credenciales de ejemplo para demostración
    const users = {
      'admin': { password: 'admin123', role: 'administrador' },
      'gerente': { password: 'gerente&123', role: 'gerente' },
      'cliente': { password: 'cliente123', role: 'cliente' },
      'juanperez': { password: 'fundador123', role: 'fundador' }
    };

    if (users[username] && users[username].password === password) {
      onLogin({
        username,
        role: users[username].role,
        name: username === 'juanperez' ? 'Juan Pérez' : username.charAt(0).toUpperCase() + username.slice(1)
      });
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Imagen */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src={gymHero} 
          alt="Gimnasio Juan Pérez" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
          <div className="text-white text-center px-8">
            <Dumbbell className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4">Gimnasio Juan Pérez</h1>
            <p className="text-xl text-gray-200">Sistema de Gestión Integral</p>
            <p className="text-sm text-gray-300 mt-2">Fundado por Juan Pérez</p>
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario de login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4 lg:hidden">
              <Dumbbell className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription className="text-base">
              Ingrese sus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full h-11 text-base font-semibold">
                Ingresar
              </Button>
            </form>

            {/* Credenciales de demostración */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-semibold text-blue-900 mb-2">Credenciales de demostración:</p>
              <div className="text-xs text-blue-800 space-y-1">
                <p><strong>Fundador:</strong> juanperez / fundador123</p>
                <p><strong>Gerente:</strong> gerente / gerente&123</p>
                <p><strong>Admin:</strong> admin / admin123</p>
                <p><strong>Cliente:</strong> cliente / cliente123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

