import React from 'react';

interface PaginacionProps {
  paginaActual: number;
  totalPaginas: number;
  onPageChange: (pagina: number) => void;
}

const Paginacion: React.FC<PaginacionProps> = ({
  paginaActual,
  totalPaginas,
  onPageChange,
}) => {
  return (
    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
      <button
        disabled={paginaActual === 1}
        onClick={() => onPageChange(paginaActual - 1)}
      >
        Anterior
      </button>

      <span style={{ margin: '0 1rem' }}>
        Página {paginaActual} de {totalPaginas}
      </span>

      <button
        disabled={paginaActual === totalPaginas}
        onClick={() => onPageChange(paginaActual + 1)}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginacion;
