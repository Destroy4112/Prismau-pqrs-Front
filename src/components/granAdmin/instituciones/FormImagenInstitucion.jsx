import React from 'react';

function FormImagenInstitucion({ handleChangeImage }) {
    return (
        <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Imagen</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"
                    type="file" name='logo' onChange={handleChangeImage} accept='image/*' />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG (MAX. 1MB).</p>
            </div>
        </div>
    );
}

export default FormImagenInstitucion;   