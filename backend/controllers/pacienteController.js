import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
    //Se crea un nuevo paciente con los datos enviados en formato json
    const paciente = new Paciente(req.body);
    console.log(req.body);

    //Paciente requiere un veterinario como referencia y lo enlazamos con paciente
    paciente.veterinario = req.veterinario._id;
    try{
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    }catch(error){
        console.log(error);
    }

};

const obtenerPacientes = async (req, res) => {
    //Hace la busqueda del paciente por el veterinario encargado
    //Lo que se espera en traer desde el servidor todos los pacientes de un veterinario en especifico con los
    //metodos where y equals para mayor seguridad.
    const pacientes = await Paciente.find()
        .where('veterinario')
        .equals(req.veterinario);

    res.json(pacientes);
};

export { agregarPaciente, obtenerPacientes}