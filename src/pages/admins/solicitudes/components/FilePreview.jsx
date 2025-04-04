import { Label } from 'flowbite-react';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function FilePreview({ fileUrl }) {

    if (!fileUrl) return null;

    return (
        <div className="w-full">
            <Label value="Archivo adjunto" />
            <div className="flex items-center mt-2">
                <Link
                    color="light"
                    to={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 border border-gray-300 py-2 px-5 rounded"
                >
                    <FaEye /> <span>Ver archivo</span>
                </Link>
            </div>
        </div>
    );
}
