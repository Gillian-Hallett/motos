import { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, TextField } from '@mui/material'; // Importar componentes de Material-UI
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import MaterialTable from '@material-table/core';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

function Medidor() {

    const [dropdown, setDropdown] = useState(false);
    const abrircerrarDropdown = () => {
        setDropdown(!dropdown);
    }

    const [motosData, setMotosData] = useState([]);
    const [marca, setMarca] = useState(''); // Estado para la marca
    const [modelo, setModelo] = useState(''); // Estado para el modelo
    const [buscar, setBuscar] = useState(false); // Estado para controlar la búsqueda
    const [alturaSeleccionada, setAlturaSeleccionada] = useState(null); // Estado para la altura seleccionada
    const navigate = useNavigate();
    const columns = [
        {
            title: 'Información',
            render: rowData => (
                <Button
                    onClick={() => navigate(`/Info/${rowData.make}/${rowData.model}/${rowData.seat_height}`, { state: { moto: rowData } })}
                    type="link">
                    INFORMACIÓN
                </Button>
            ),
        },
        { title: 'Marca', field: 'make', draggable: false },
        { title: 'Modelo', field: 'model' },
        { title: 'Altura del Asiento', field: 'seat_height', type: 'numeric' },
    ];

    useEffect(() => {
        const fetchMotosData = async () => {
            try {
                const response = await axios.get(`https://api.api-ninjas.com/v1/motorcycles?make=${marca}&model=${modelo}&seat_height="890"`, {
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

    const handleSeleccionAltura = (altura) => {
        setAlturaSeleccionada(altura);
        if (alturaSeleccionada === 'enana') {
            // Realizar acción para altura menor de 1,65 m
            console.log("Seleccionó menos de 1,65 m");


        } else if (alturaSeleccionada === 'ta bie') {
            // Realizar acción para altura entre 1,65 m y 1,80 m
            console.log("Seleccionó entre 1,65 m y 1,80 m");
        } else if (alturaSeleccionada === 'torreeifel') {
            // Realizar acción para altura mayor de 1,80 m
            console.log("Seleccionó más de 1,80 m");
        }
    }

    return (
        <>
            <Dashboard />
            <div>
                <br />
                <Container>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography >Inserte su altura:</Typography>

                        <Dropdown isOpen={dropdown} toggle={abrircerrarDropdown} type="primary">
                            <DropdownToggle caret>Altura</DropdownToggle>

                            <DropdownMenu>
                                <DropdownItem onClick={() => handleSeleccionAltura('enana')}>menos de 1,65 m</DropdownItem>
                                <DropdownItem onClick={() => handleSeleccionAltura('ta bie')}>entre 1,65 m y 1,80 m</DropdownItem>
                                <DropdownItem onClick={() => handleSeleccionAltura('torreeifel')}>más de 1,80 m</DropdownItem>
                            </DropdownMenu>

                        </Dropdown>

                        <TextField
                            label="Marca"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                        />
                        <TextField
                            label="Modelo"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                        />
                        <Button onClick={() => setBuscar(true)} type='primary'>Buscar</Button>
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
    )
}
export default Medidor