import React from 'react';

const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
    textAlign: 'center',
    flex: 1,
    minWidth: '220px',
};

const iconStyle: React.CSSProperties = {
    fontSize: '40px',
    color: '#0B3D91',
    marginBottom: '10px',
};

const Home: React.FC = () => {
    const fechaActual = new Date().toLocaleDateString();

    return (
        <div style={{ padding: '40px' }}>
            <div
                style={{
                    backgroundColor: '#ffffff',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                    marginBottom: '30px',
                }}
            >
                <h1
                    style={{
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '26px',
                    }}
                >
                    <i
                        className="bi bi-speedometer2"
                        style={{
                            marginRight: '12px',
                            color: '#0B3D91',
                            fontSize: '28px',
                        }}
                    ></i>
                    Dashboard Administrativo
                </h1>

                <p style={{ color: '#666', margin: 0 }}>
                    Sistema de Gestión Escolar — {fechaActual}
                </p>
            </div>


            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={cardStyle}>
                    <i className="bi bi-people-fill" style={iconStyle}></i>
                    <h3>Alumnos</h3>
                    <p style={{ fontSize: '26px', fontWeight: 'bold' }}>--</p>
                    <span>Total registrados</span>
                </div>

                <div style={cardStyle}>
                    <i className="bi bi-person-badge-fill" style={iconStyle}></i>
                    <h3>Docentes</h3>
                    <p style={{ fontSize: '26px', fontWeight: 'bold' }}>--</p>
                    <span>Total activos</span>
                </div>

                <div style={cardStyle}>
                    <i className="bi bi-journal-bookmark-fill" style={iconStyle}></i>
                    <h3>Cursos</h3>
                    <p style={{ fontSize: '26px', fontWeight: 'bold' }}>--</p>
                    <span>Cursos disponibles</span>
                </div>

                <div style={cardStyle}>
                    <i className="bi bi-building" style={iconStyle}></i>
                    <h3>Aulas</h3>
                    <p style={{ fontSize: '26px', fontWeight: 'bold' }}>--</p>
                    <span>Aulas registradas</span>
                </div>
            </div>

            <div
                style={{
                    marginTop: '40px',
                    backgroundColor: '#ffffff',
                    padding: '25px',
                    borderRadius: '12px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                }}
            >
                <h4 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <i
                        className="bi bi-info-circle-fill"
                        style={{ marginRight: '10px', color: '#0B3D91', fontSize: '22px' }}
                    ></i>
                    Información del Sistema
                </h4>

                <p style={{ color: '#555', lineHeight: '1.6' }}>
                    Este sistema permite administrar alumnos, docentes, cursos, aulas y notas.
                    Utiliza GraphQL para la gestión de datos y React para la interfaz.
                </p>
            </div>

        </div>
    );
};

export default Home;
