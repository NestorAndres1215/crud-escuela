import React from 'react';

interface TablaProps {
  headers: string[];
  children: React.ReactNode;
}

const Tabla: React.FC<TablaProps> = ({ headers, children }) => {
  return (
    <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        }}
      >
        <thead style={{ backgroundColor: '#0B3D91', color: 'white' }}>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: 600,
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Tabla;
