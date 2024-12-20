import React from 'react';

function ContainerLogin({ children }) {

    return (
        <div className='bg-gray-100 min-h-screen animated-element'>
            <div className="flex flex-col min-h-screen justify-center items-center px-4 md:px-0">
                <div className="bg-white dark:bg-gray-950 w-full max-w-[1000px] rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row min-h-[550px]">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ContainerLogin