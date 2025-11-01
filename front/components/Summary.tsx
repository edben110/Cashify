'use client';

import { ResumenGastos, TransaccionResponse } from '@/lib/api';

interface SummaryProps {
  resumen: ResumenGastos;
  transacciones: TransaccionResponse[];
}

export default function Summary({ resumen, transacciones }: SummaryProps) {
  // Estadísticas por categoría
  const categoriaStats = transacciones.reduce((acc, trans) => {
    const catName = trans.categoriaNombre;
    if (!acc[catName]) {
      acc[catName] = {
        nombre: catName,
        ingresos: 0,
        gastos: 0,
        cantidad: 0
      };
    }
    
    if (trans.tipoTransaccion === 'INGRESO') {
      acc[catName].ingresos += trans.monto;
    } else {
      acc[catName].gastos += trans.monto;
    }
    acc[catName].cantidad++;
    return acc;
  }, {} as Record<string, { nombre: string; ingresos: number; gastos: number; cantidad: number }>);

  const categoriaArray = Object.values(categoriaStats).sort((a, b) => 
    (b.ingresos + b.gastos) - (a.ingresos + a.gastos)
  );

  // Últimas transacciones
  const ultimasTransacciones = [...transacciones]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="retro-card border-green-500 shadow-green-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm uppercase tracking-wider text-neon-green/70">
              ↑ Ingresos
            </span>
            <span className="text-green-500 text-2xl">💰</span>
          </div>
          <div className="text-3xl font-bold text-green-500 mb-2 crt-effect">
            ${resumen.totalIngresos.toFixed(2)}
          </div>
          <div className="text-xs text-neon-green/50">
            {resumen.cantidadIngresos} transacciones
          </div>
        </div>

        <div className="retro-card border-red-500 shadow-red-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm uppercase tracking-wider text-neon-green/70">
              ↓ Gastos
            </span>
            <span className="text-red-500 text-2xl">💸</span>
          </div>
          <div className="text-3xl font-bold text-red-500 mb-2 crt-effect">
            ${resumen.totalGastos.toFixed(2)}
          </div>
          <div className="text-xs text-neon-green/50">
            {resumen.cantidadGastos} transacciones
          </div>
        </div>

        <div className={`retro-card ${
          resumen.balance >= 0 
            ? 'border-neon-green shadow-neon-sm' 
            : 'border-yellow-500 shadow-yellow-500/30'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm uppercase tracking-wider text-neon-green/70">
              = Balance
            </span>
            <span className="text-2xl">
              {resumen.balance >= 0 ? '✓' : '⚠'}
            </span>
          </div>
          <div className={`text-3xl font-bold mb-2 crt-effect ${
            resumen.balance >= 0 ? 'text-neon-green' : 'text-yellow-500'
          }`}>
            ${resumen.balance.toFixed(2)}
          </div>
          <div className="text-xs text-neon-green/50">
            Total: {resumen.cantidadIngresos + resumen.cantidadGastos} transacciones
          </div>
        </div>
      </div>

      {/* Estadísticas por Categoría */}
      {categoriaArray.length > 0 && (
        <div className="retro-container">
          <h3 className="retro-subtitle mb-6">&gt; Por Categoría</h3>
          <div className="space-y-4">
            {categoriaArray.map((cat) => {
              const total = cat.ingresos + cat.gastos;
              const porcentajeIngresos = total > 0 ? (cat.ingresos / total) * 100 : 0;
              const porcentajeGastos = total > 0 ? (cat.gastos / total) * 100 : 0;
              
              return (
                <div key={cat.nombre} className="bg-retro-gray p-4 rounded border border-neon-green/30">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-bold text-neon-green">
                      📁 {cat.nombre}
                    </h4>
                    <span className="text-sm text-neon-green/60">
                      {cat.cantidad} transacciones
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-green-500 mb-1">↑ Ingresos</div>
                      <div className="text-xl font-bold text-green-500">
                        ${cat.ingresos.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-red-500 mb-1">↓ Gastos</div>
                      <div className="text-xl font-bold text-red-500">
                        ${cat.gastos.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="flex h-3 bg-retro-black rounded overflow-hidden border border-neon-green/30">
                    {porcentajeIngresos > 0 && (
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${porcentajeIngresos}%` }}
                      />
                    )}
                    {porcentajeGastos > 0 && (
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${porcentajeGastos}%` }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Últimas Transacciones */}
      {ultimasTransacciones.length > 0 && (
        <div className="retro-container">
          <h3 className="retro-subtitle mb-6">&gt; Últimas Transacciones</h3>
          <div className="space-y-3">
            {ultimasTransacciones.map((trans) => (
              <div 
                key={trans.id} 
                className="bg-retro-gray p-4 rounded border border-neon-green/30 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-2xl ${
                    trans.tipoTransaccion === 'INGRESO' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {trans.tipoTransaccion === 'INGRESO' ? '↑' : '↓'}
                  </span>
                  <div>
                    <div className="text-neon-green font-bold">{trans.descripcion}</div>
                    <div className="text-xs text-neon-green/50">
                      📁 {trans.categoriaNombre} • {new Date(trans.fecha).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                </div>
                <div className={`text-xl font-bold ${
                  trans.tipoTransaccion === 'INGRESO' ? 'text-green-500' : 'text-red-500'
                }`}>
                  ${trans.monto.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {transacciones.length === 0 && (
        <div className="retro-container text-center py-12">
          <div className="text-6xl mb-4 opacity-50">📊</div>
          <p className="text-neon-green/50 text-lg mb-2">
            [ No hay datos para mostrar ]
          </p>
          <p className="text-neon-green/30 text-sm">
            Crea algunas transacciones para ver estadísticas
          </p>
        </div>
      )}
    </div>
  );
}
