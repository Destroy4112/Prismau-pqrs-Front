import React from 'react';

function Contenido(props) {

    return (
        <div className='mt-7 animated-element'>
            {props.children}
        </div>
    );
}

export default Contenido;