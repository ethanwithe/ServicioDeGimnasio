import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { inventarioService } from '../services/inventarioService';
import { clienteService } from '../services/clienteService';

export default function GerenteDashboard({ activeSection }) {
  const [loading, setLoading] = useState(false);
  const [estadisticas, setEstadisticas] = useState(null);

  useEffect(() => {
    if (activeSection === 'dashboard') {
      cargarEstadisticas();
    }
  }, [activeSection]);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      const [inventarioStats, clienteStats] = await Promise.all([
        inventarioService.obtenerEstadisticas().catch(() => ({})),
        clienteService.obtenerEstadisticas().catch(() => ({}))
      ]);
      
      setEstadisticas({ inventario: inventarioStats, clientes: clienteStats });
    } catch (err) {
      console.error('Error al cargar estadísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Datos de ventas mensuales
  const ventasMensuales = [
    { mes: 'Ene', ventas: 28500, compras: 15200, ganancia: 13300 },
    { mes: 'Feb', ventas: 32100, compras: 16800, ganancia: 15300 },
    { mes: 'Mar', ventas: 29800, compras: 14900, ganancia: 14900 },
    { mes: 'Abr', ventas: 35600, compras: 18200, ganancia: 17400 },
    { mes: 'May', ventas: 38900, compras: 19500, ganancia: 19400 },
    { mes: 'Jun', ventas: 42300, compras: 21000, ganancia: 21300 },
    { mes: 'Jul', ventas: 45800, compras: 22400, ganancia: 23400 },
    { mes: 'Ago', ventas: 48200, compras: 23800, ganancia: 24400 },
    { mes: 'Sep', ventas: 51500, compras: 25200, ganancia: 26300 },
    { mes: 'Oct', ventas: 54200, compras: 26500, ganancia: 27700 },
  ];

  // Flujo de dinero
  const flujoDinero = [
    { categoria: 'Membresías', ingreso: 145800, egreso: 0, neto: 145800 },
    { categoria: 'Productos', ingreso: 42890, egreso: 28500, neto: 14390 },
    { categoria: 'Clases Personales', ingreso: 28500, egreso: 12000, neto: 16500 },
    { categoria: 'Mantenimiento', ingreso: 0, egreso: 8500, neto: -8500 },
    { categoria: 'Salarios', ingreso: 0, egreso: 85000, neto: -85000 },
    { categoria: 'Servicios', ingreso: 0, egreso: 12800, neto: -12800 },
    { categoria: 'Marketing', ingreso: 0, egreso: 5200, neto: -5200 },
  ];

  // Comparativa trimestral
  const comparativaT = [
    { trimestre: 'Q1 2024', ventas: 90400, crecimiento: 12 },
    { trimestre: 'Q2 2024', ventas: 116800, crecimiento: 29 },
    { trimestre: 'Q3 2024', ventas: 145500, crecimiento: 25 },
    { trimestre: 'Q4 2024', ventas: 178900, crecimiento: 23 },
  ];

  // Distribución de ingresos
  const distribucionIngresos = [
    { nombre: 'Membresías', valor: 145800 },
    { nombre: 'Productos', valor: 42890 },
    { nombre: 'Clases Personales', valor: 28500 },
    { nombre: 'Otros', valor: 12000 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const totalIngresos = flujoDinero.reduce((sum, item) => sum + item.ingreso, 0);
  const totalEgresos = flujoDinero.reduce((sum, item) => sum + Math.abs(item.egreso), 0);
  const flujoNeto = totalIngresos - totalEgresos;

  if (activeSection === 'dashboard') {
    return (
      <div className="space-y-6">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Ingresos Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">S/ {(totalIngresos / 1000).toFixed(1)}K</div>
              <p className="text-xs text-blue-100 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +23% vs. mes anterior
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Egresos Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">S/ {(totalEgresos / 1000).toFixed(1)}K</div>
              <p className="text-xs text-red-100 mt-1 flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3" />
                +8% vs. mes anterior
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text sm font-medium flex items-center gap-2">
<TrendingUp className="w-4 h-4" />
Flujo Neto
</CardTitle>
</CardHeader>
<CardContent>
<div className="text-3xl font-bold">S/ {(flujoNeto / 1000).toFixed(1)}K</div>
<p className="text-xs text-green-100 mt-1">Utilidad del mes</p>
</CardContent>
</Card>
       <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            Clientes Activos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {estadisticas?.clientes?.totalClientes || 1248}
          </div>
          <p className="text-xs text-purple-100 mt-1">+156 este mes</p>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Ventas y Compras</CardTitle>
          <CardDescription>Comparativa mensual del año</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ventasMensuales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => `S/ ${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={2} name="Ventas" />
              <Line type="monotone" dataKey="compras" stroke="#ef4444" strokeWidth={2} name="Compras" />
              <Line type="monotone" dataKey="ganancia" stroke="#10b981" strokeWidth={2} name="Ganancia" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribución de Ingresos</CardTitle>
          <CardDescription>Por categoría</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distribucionIngresos}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ nombre, percent }) => `${nombre} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="valor"
              >
                {distribucionIngresos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `S/ ${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Comparativa de Crecimiento Trimestral</CardTitle>
        <CardDescription>Análisis de ventas por trimestre</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparativaT}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="trimestre" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="ventas" fill="#3b82f6" name="Ventas (S/)" />
            <Bar yAxisId="right" dataKey="crecimiento" fill="#10b981" name="Crecimiento (%)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);
}
return (
<div className="space-y-6">
<Card>
<CardHeader>
<CardTitle>Sección en Desarrollo</CardTitle>
<CardDescription>Esta sección estará disponible próximamente</CardDescription>
</CardHeader>
<CardContent>
<p className="text-gray-600">Seleccione otra opción del menú lateral.</p>
</CardContent>
</Card>
</div>
);
}