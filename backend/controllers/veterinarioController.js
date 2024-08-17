import Veterinario from '../models/Veterinario.js';

const registrar = async (req, res) => {

    //Probando el request del body...
    
    //Prevenir email duplicados
    const { email } = req.body;
    const existeUsuario = await Veterinario.findOne({email});

    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message})
    }

    try{
        //Guardar un Nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const VeterinarioGuardado = await veterinario.save();

        

        res.json(VeterinarioGuardado);
    }catch(error){
        console.log(error);
    }

};

const perfil = (req, res ) => {
    res.json({msg: "Mostrando perfil"})
};

export {registrar, perfil}