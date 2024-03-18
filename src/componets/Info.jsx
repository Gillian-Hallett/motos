import React from 'react';
import Dashboard from './Dashboard';
import { useLocation } from 'react-router-dom';

function Info(){
        const location = useLocation();
        const moto = location.state.moto;
    return (
        <>
        <Dashboard />
        <div>
            
        <h1>Información sobre la Moto</h1>
        <p>Marca: {moto.make}</p>
                <p>Modelo: {moto.model}</p>
                <p>Año: {moto.year}</p>
                <p>Tipo: {moto.type}</p>
                <p>Desplazamiento: {moto.displacement}</p>
                <p>Motor: {moto.engine}</p>
                <p>Potencia: {moto.power}</p>
                <p>Torque: {moto.torque}</p>
                <p>Compresión: {moto.compression}</p>
                <p>Cilindrada/Recorrido: {moto.bore_stroke}</p>
                <p>Válvulas por cilindro: {moto.valves_per_cylinder}</p>
                <p>Sistema de combustible: {moto.fuel_system}</p>
                <p>Control de combustible: {moto.fuel_control}</p>
                <p>Encendido: {moto.ignition}</p>
                <p>Lubricación: {moto.lubrication}</p>
                <p>Refrigeración: {moto.cooling}</p>
                <p>Caja de cambios: {moto.gearbox}</p>
                <p>Transmisión: {moto.transmission}</p>
                <p>Embrague: {moto.clutch}</p>
                <p>Chasis: {moto.frame}</p>
                <p>Suspensión delantera: {moto.front_suspension}</p>
                <p>Recorrido de rueda delantera: {moto.front_wheel_travel}</p>
                <p>Suspensión trasera: {moto.rear_suspension}</p>
                <p>Recorrido de rueda trasera: {moto.rear_wheel_travel}</p>
                <p>Neumático delantero: {moto.front_tire}</p>
                <p>Neumático trasero: {moto.rear_tire}</p>
                <p>Frenos delanteros: {moto.front_brakes}</p>
                <p>Frenos traseros: {moto.rear_brakes}</p>
                <p>Peso total: {moto.total_weight}</p>
                <p>Altura del asiento: {moto.seat_height}</p>
                <p>Altura total: {moto.total_height}</p>
                <p>Longitud total: {moto.total_length}</p>
                <p>Anchura total: {moto.total_width}</p>
                <p>Altura al suelo: {moto.ground_clearance}</p>
                <p>Distancia entre ejes: {moto.wheelbase}</p>
                <p>Capacidad de combustible: {moto.fuel_capacity}</p>
                <p>Arranque: {moto.starter}</p>
        </div>
        </>
    );  

}
export default Info;