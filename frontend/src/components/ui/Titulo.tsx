import React from 'react';

interface TituloProps {
  texto: string;
  nivel?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  subrayado?: boolean; // opción para mostrar u ocultar el hr
}

const Titulo: React.FC<TituloProps> = ({
  texto,
  nivel = 3,
  color = '#0B3D91', 
  className,
  style,
  subrayado = true,
}) => {
  const Tag = `h${nivel}` as keyof JSX.IntrinsicElements;

  return (
    <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
      <Tag
        className={className}
        style={{
          color,
          margin: 0,
          fontWeight: 700,
          letterSpacing: '0.5px',
          ...style,
        }}
      >
        {texto}
      </Tag>
      {subrayado && (
        <hr
          style={{
            border: 'none',
            height: '3px',
            backgroundColor: color,
            margin: '0.5rem auto 0', // centrado con auto left/right
            width: '50px', // tamaño del hr
            borderRadius: '2px',
          }}
        />
      )}
    </div>
  );
};

export default Titulo;
