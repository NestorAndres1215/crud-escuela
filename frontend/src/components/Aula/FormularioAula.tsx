import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Aula } from '../../types';
import { CREAR_AULA } from '../../graphql/mutations';
import { useMutation } from '@apollo/client/react';
import Titulo from '../ui/Titulo';

const FormularioAula: React.FC = () => {
    const navigate = useNavigate();

    // Estado inicial: ambos campos como strings
    const [form, setForm] = useState<Omit<Aula, 'id'>>({
        aula: '',
        aforo: '',
    });

    const [crearAula, { loading }] = useMutation<
        { crearAula: Aula },
        { aula: Omit<Aula, 'id'> }
    >(CREAR_AULA);

    // Handle change: todo como string
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    // Enviar mutation
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Enviando aula:', form);

        try {
            await crearAula({ variables: { aula: form } });

            // Limpiar formulario
            setForm({
                aula: '',
                aforo: '',
            });

            navigate('/aulas');

        } catch (error) {
            console.error('Error creando aula:', error);
        }
    };

    // Cancelar
    const handleCancelar = () => {
        navigate('/aulas');
    };

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <Titulo texto="Registro de Aulas" nivel={1} />

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Aula</label>
                            <input
                                type="text"
                                name="aula"
                                className="form-control"
                                placeholder="Ingrese nombre del aula"
                                value={form.aula}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Aforo</label>
                            <input
                                type="text"
                                name="aforo"
                                className="form-control"
                                placeholder="Ingrese aforo máximo"
                                value={form.aforo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <button
                            type="button"
                            onClick={handleCancelar}
                            className="btn btn-outline-secondary"
                            disabled={loading}
                        >
                            <i className="bi bi-arrow-left-circle me-2"></i>
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={loading}
                        >
                            <i className="bi bi-check-circle-fill me-2"></i>
                            {loading ? 'Creando...' : 'Crear Aula'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioAula;
