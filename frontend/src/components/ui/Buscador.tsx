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
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: '8px 12px',
          width: '300px',
          borderRadius: '6px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default Busqueda;
