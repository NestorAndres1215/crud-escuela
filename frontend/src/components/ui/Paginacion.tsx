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
  // Si solo hay una página, no mostrar paginación
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginación de alumnos" className="mt-4">
      <ul className="pagination pagination-sm justify-content-center">

        {/* Anterior */}
        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            « Anterior
          </button>
        </li>

        {/* Números */}
        {paginas.map((pagina) => (
          <li
            key={pagina}
            className={`page-item ${
              pagina === paginaActual ? 'active' : ''
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(pagina)}
            >
              {pagina}
            </button>
          </li>
        ))}

        {/* Siguiente */}
        <li
          className={`page-item ${
            paginaActual === totalPaginas ? 'disabled' : ''
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente »
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default Paginacion;
