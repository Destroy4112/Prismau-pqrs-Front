export const crearStorage = (itemName, data) => {
    localStorage.setItem(itemName, JSON.stringify(data));
}

export const removerStorage = (itemName) => {
    localStorage.removeItem(itemName);
}

export const usarStorage = (itemName) => {
    const localstorageItem = localStorage.getItem(itemName);
    return JSON.parse(localstorageItem);
}


 
