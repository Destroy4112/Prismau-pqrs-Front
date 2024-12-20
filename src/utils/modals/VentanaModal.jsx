import { Button, Modal } from 'flowbite-react';
import React from 'react';
import SpinnerUtil from '../spinner/SpinnerUtil';

function VentanaModal({ titulo, size, children, openModal, cerrarModal, hanleSubmit, loading }) {

    return (
        <Modal dismissible size={size} show={openModal} onClose={cerrarModal}>
            <Modal.Header>{titulo}</Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={hanleSubmit}>{loading ? <SpinnerUtil size={5} /> : 'Guardar'}</Button>
                <Button color="gray" onClick={cerrarModal}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VentanaModal;