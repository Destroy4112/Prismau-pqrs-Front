import React from 'react';
import Contenido from '../../../components/helpers/Contenido';
import TituloPage from '../../../components/helpers/TituloPage';
import CardsRoles from './components/CardsRoles';

function RolesPage() {


  return (
    <>
      <TituloPage titulo={"Roles"} />
      <Contenido>
        <CardsRoles />
      </Contenido>
    </>
  );
}

export default RolesPage