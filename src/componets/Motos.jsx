import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import { Button } from 'antd';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import MaterialTable from '@material-table/core';
import { Typography, TextField, Box, Container } from '@mui/material';


function Motos() {
    const [motosData, setMotosData] = useState([]);
    const [marca, setMarca] = useState(''); // Estado para la marca
    const [modelo, setModelo] = useState(''); // Estado para el modelo
    const [buscar, setBuscar] = useState(false); // Estado para controlar la búsqueda
    const navigate = useNavigate();
    const columns = [
        {
            title: 'Información',
            render: rowData => (
                <Button
                    onClick={() => navigate(`/Info/${rowData.make}/${rowData.model}/${rowData.year}`, { state: { moto: rowData } })}
                    type="link">
                    INFORMACIÓN
                </Button>
            ),
        },
        { title: 'Marca', field: 'make', draggable: false },
        { title: 'Modelo', field: 'model' },
        { title: 'Año', field: 'year', type: 'numeric' },
    ];

    useEffect(() => {
        const fetchMotosData = async () => {
            try {
                const response = await axios.get(`https://api.api-ninjas.com/v1/motorcycles?make=${marca}&model=${modelo}`, {
                    headers: {
                        'X-Api-Key': 'xzUBCoamme8Br6P7GuKqxg==9DZPIJoVStjjk5hH'
                    }
                });
                setMotosData(response.data);
            } catch (error) {
                console.error('Error fetching motos data:', error);
            }
        };

        if (buscar) {
            fetchMotosData();
            setBuscar(false); // Reiniciar el estado de búsqueda después de la búsqueda
        }
    }, [marca, modelo, buscar]); // Dependencias actualizadas

    return (
        <>
            <Dashboard />
            <div>
                <br />
                <Container>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography >Inserte los datos para buscar:</Typography>
                        <TextField
                            label="Marca"
                            value={marca}
                            required
                            onChange={(e) => setMarca(e.target.value)}
                        />
                        <TextField
                            label="Modelo"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                        />
                        <Button onClick={() => setBuscar(true)} type="primary">Buscar</Button>
                    </Box>
                </Container>

                <MaterialTable
                    title="Motos"
                    columns={columns}
                    data={motosData}
                    options={{
                        exportMenu: [
                            {
                                label: 'Export PDF',
                                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'motos_pdf'),
                            },
                            {
                                label: 'Export CSV',
                                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'motos_csv'),
                            },
                        ],
                        draggable: true,
                        filtering: false
                    }}
                />
            </div>
        </>
    );
}
export default Motos;
