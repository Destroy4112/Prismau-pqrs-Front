import React from 'react';
import { useAppSelector } from '../../hooks/useStore';
import apiQueryCantidad from './api/apiQueryCantidad';
import CardsDashboard from './components/CardsDashboard';
import CardsPromedioDashboard from './components/CardsPromedioDashboard';
import { getCardsByRole } from './components/ItemsCards';
import TituloPage from '../../components/helpers/TituloPage';
import Contenido from '../../components/helpers/Contenido';

function DashboardPage() {

  const rol = useAppSelector(state => state.credenciales.rol);
  const items = getCardsByRole(rol);
  const { promedio } = apiQueryCantidad();

  return (
    <>
      <TituloPage titulo={"Dashboard"} />
      <Contenido>
        <CardsDashboard items={items} />
        {rol === 3 && <CardsPromedioDashboard promedio={promedio} />}
      </Contenido>
    </>
  )
}

export default DashboardPage