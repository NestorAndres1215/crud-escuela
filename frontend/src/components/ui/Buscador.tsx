import React from 'react';

interface BusquedaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Busqueda: React.FC<BusquedaProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
}) => {
  return (
    <div style={{ margin: '1rem 0', textAlign: 'center' }}>
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        {/* Icono */}
        <span
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#0B3D91"
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>
        </span>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            padding: '8px 12px 8px 35px',
            width: '300px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none',
            transition: 'all 0.2s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = '1px solid #0B3D91';
            e.currentTarget.style.boxShadow = '0 0 5px rgba(11,61,145,0.3)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = '1px solid #ccc';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );
};

export default Busqueda;
