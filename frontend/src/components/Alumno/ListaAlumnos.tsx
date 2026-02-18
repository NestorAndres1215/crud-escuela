import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';

import { OBTENER_ALUMNOS } from '../../graphql/queries';
import { ELIMINAR_ALUMNO } from '../../graphql/mutations';
import type { Alumno } from '../../types';

import Titulo from '../ui/Titulo';
import Tabla from '../ui/Tabla';
import Paginacion from '../ui/Paginacion';
import Busqueda from '../ui/Buscador';
import Button from '../ui/Boton';

const ITEMS_POR_PAGINA = 5;

interface Props {
    irARegistrar: () => void;
}

const ListaAlumnos: React.FC<Props> = ({ irARegistrar }) => {
    const navigate = useNavigate();

    const { loading, error, data, refetch } = useQuery<{ obtenerAlumnos: Alumno[] }>(OBTENER_ALUMNOS);
    const [eliminarAlumno] = useMutation(ELIMINAR_ALUMNO);
    const [paginaActual, setPaginaActual] = useState(1);
    const [busqueda, setBusqueda] = useState('');

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleEliminar = async (id: string) => {
        await eliminarAlumno({ variables: { id } });
        refetch();
    };

    const alumnosFiltrados = data?.obtenerAlumnos.filter((a) =>
        `${a.nombre} ${a.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
    ) || [];

    const totalPaginas = Math.ceil(alumnosFiltrados.length / ITEMS_POR_PAGINA);

    const alumnosPaginados = alumnosFiltrados.slice(
        (paginaActual - 1) * ITEMS_POR_PAGINA,
        paginaActual * ITEMS_POR_PAGINA
    );

    return (
        <div>
            <Titulo texto="Gestión de Alumnos" nivel={1} />

            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <Button variant="primary" onClick={() => navigate('/alumnos/nuevo')}>
                    <i className="bi bi-person-plus" style={{ marginRight: '6px' }}></i>
                    Registrar Alumno
                </Button>
            </div>

            <Busqueda
                value={busqueda}
                onChange={(value) => {
                    setBusqueda(value);
                    setPaginaActual(1);
                }}
            />

            <Tabla headers={['Nombre', 'Apellido', 'Email', 'Teléfono', 'Acciones']}>
                {alumnosPaginados.map((alumno) => (
                    <tr key={alumno.id}>
                        <td style={{ padding: '10px' }}>{alumno.nombre}</td>
                        <td style={{ padding: '10px' }}>{alumno.apellido}</td>
                        <td style={{ padding: '10px' }}>{alumno.email}</td>
                        <td style={{ padding: '10px' }}>{alumno.telefono}</td>
                        <td style={{ padding: '10px' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                <Button
                                    variant="warning"
                                    onClick={() => navigate(`/alumnos/editar/${alumno.id}`)}
                                >
                                    <i className="bi bi-pencil-square me-2"></i>
                                    Editar
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleEliminar(alumno.id)}
                                >
                                    <i className="bi bi-trash" style={{ marginRight: '5px' }}></i>
                                    Eliminar
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </Tabla>

            <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onPageChange={setPaginaActual}
            />
        </div>
    );
};

export default ListaAlumnos;
