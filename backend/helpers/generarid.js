
//Crea un codigo concatenado con Math.random() para generar un id unico. el substring(2) elimina los primeros 2 digitos.
const generarId = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

export default generarId;