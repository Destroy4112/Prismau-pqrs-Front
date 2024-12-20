import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';

export default function FilePreview({ fileUrl }) {

    if (!fileUrl) return null;

    const fileExtension = fileUrl.split('.').pop().toLowerCase();

    return fileExtension.match(/(jpg|jpeg|png|gif)/) ? (
        <Link target='_blank' to={fileUrl}>
            <img src={fileUrl} alt="Vista previa" className="mt-2 w-20 h-20" />
        </Link>
    ) : (
        <Button color="light" href={fileUrl} target="_blank" rel="noopener noreferrer">
            <FaDownload className="mr-2" /> Descargar archivo
        </Button>
    );
}
