import React from 'react';

interface TablaProps {
  headers: string[];
  children: React.ReactNode;
}

const Tabla: React.FC<TablaProps> = ({ headers, children }) => {
  const isEmpty = !children || React.Children.count(children) === 0;

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

        <tbody>
          {isEmpty ? (
            <tr>
              <td
                colSpan={headers.length}
                style={{
                  textAlign: 'center',
                  padding: '30px',
                  color: '#888',
                }}
              >
                <div style={{ fontSize: '40px' }}>📭</div>
                <div style={{ marginTop: '8px' }}>
                  No hay datos disponibles
                </div>
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
