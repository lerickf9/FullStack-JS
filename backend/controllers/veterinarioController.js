import Veterinario from '../models/Veterinario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarid.js';

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
    //console.log(req.veterinario);
    const { veterinario } = req;
    res.json({ veterinario });
};

const confirmar = async (req, res) => {
    const { token } = req.params

    const usuarioConfirmar = await Veterinario.findOne({token});

    if(!usuarioConfirmar){
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message});
    }
    
    try{
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({ msg: "Usuario confirmando correctamente"});
    }catch(error){
        console.log(error)
    }
};

const autenticar = async (req, res) => {
    const { email, password} = req.body

    //Comporbar si un usuario existe
    const usuario = await Veterinario.findOne({ email });
    if(!usuario){
        const Error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message });
    }

    //Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada')
        return res.status(403).json({msg: error.message})
    }
    
    //Revisar el password
    if(await usuario.comprobarPassword(password)){
        //Autenticar
        res.json({token: generarJWT(usuario.id) })
    }else{
        const error = new Error('El password es incorrecto')
        return res.status(403).json({msg: error.message})
    }


};

const olvidePassword = async(req, res) => {
    const { email } = req.body;

    // console.log(email);
    const existeVeterinario = await Veterinario.findOne({email});
    if(!existeVeterinario){
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message});
    }

    try{
        existeVeterinario.token = generarId()
        await existeVeterinario.save()
        res.json({msg: 'Hemos enviado un email con las instrucciones'});

    }catch(error){
        console.log(error);
    }


};

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Veterinario.findOne({ token });

    if(tokenValido){
        //el token es valido el usuario existe
        res.json({ msg: 'Token valido y el usuario existe'})
    }else{
        const error = new Error("token no valido");
        return res.status(400).json({ msg: error.message });
    }
};
const nuevoPassword = async(req, res) => {
    const { token} = req.params; //params viene desde la url
    const { password } = req.body; //body viene desde el usuario escriba

    const veterinario = await Veterinario.findOne({ token });
    if(!veterinario){
        const error = new Error("Hubo un error");
        return res.status(400).json({ msg: error.message });
    }

    try{
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg: "Password modificado correctamente"});
    }catch(error){
        console.log(error);
    }
 
};

export {registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword };