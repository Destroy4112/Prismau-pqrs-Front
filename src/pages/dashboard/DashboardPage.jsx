import React from 'react';
import { useSelector } from 'react-redux';
import apiQueryCantidad from '../../api/apiQueryCantidad';
import CardsDashboard from '../../components/dashboard/CardsDashboard';
import CardsPromedioDashboard from '../../components/dashboard/CardsPromedioDashboard';
import { getCardsByRole } from '../../models/ItemsCards';

function DashboardPage() {

  const rol = useSelector(state => state.credenciales.rol.id);
  const items = getCardsByRole(rol)
  const { promedio } = apiQueryCantidad();

  return (
    <>
      <CardsDashboard items={items} />
      {rol === 3 && <CardsPromedioDashboard promedio={promedio} />}
    </>
  )
}

export default DashboardPage