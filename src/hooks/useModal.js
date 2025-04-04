import { useState } from 'react';

export default function useModal() {

    const [openModal, setOpenModal] = useState(false);

    const toggleModal = () => setOpenModal(!openModal);

    return {
        openModal,
        toggleModal
    }
}
