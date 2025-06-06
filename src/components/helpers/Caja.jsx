import React from 'react';

function Caja(props) {

    return (
        <div className="p-4 border bg-white rounded-lg dark:border-gray-700 mt-2 w-full animated-element">
            {props.children}
        </div>
    );
}

export default Caja;