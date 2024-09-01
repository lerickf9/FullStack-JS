import Veterinario from '../models/Veterinario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarid.js';

const registrar = async (req, res) => {

    //Probando el request del body...
    
    //Prevenir email duplicados
    const { email } = req.body; //Aplicamos destruction
    const existeUsuario = await Veterinario.findOne({email}); //Definimos donde enviar los datos desde el modelo Veterianrio
    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message});
    }

    try{
        //Se crea un try catch para asegurar si perfil tiene un error y lo manejamos de la mejor forma
        //Guardar un Nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const VeterinarioGuardado = await veterinario.save();

        res.json(VeterinarioGuardado);
    }catch(error){
        console.log(error);
    }

};

const perfil = (req, res ) => {
    // console.log(req.veterinario);
    // Tenemos datos del servidor
    const { veterinario } = req;
    res.json({ veterinario });
};


//Creamos la function confirmar que envia el token para cambiar el parametro de la bd confirmado de false a true.
//Dependiendo que el token sea valido o correcto.
const confirmar = async (req, res) => {
    const { token } = req.params //req.params lee datos desde la url

    //Se crea el async y await para arrojar el error y que no se bloquee la pagina
    //Se crea findOne para encontrar el primer parametro encontrado con el token buscado
    const usuarioConfirmar = await Veterinario.findOne({token});

    if(!usuarioConfirmar){
        const error = new Error('Token no válido');
        //Error 404 es un valor no encontrado
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

//En postman se coloca en raw en formato json el correo y password
const autenticar = async (req, res) => {
    const { email, password } = req.body

    //Comporbar si un usuario existe
    const usuario = await Veterinario.findOne({ email });
    if(!usuario){
        const Error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message });
    }

    //Comprobar si el usuario esta confirmado
    //Si no esta confirmado no se le permitirá el acceso
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
    //Buscamos el veterinario con el primero que encuntre con el email buscado.
    const existeVeterinario = await Veterinario.findOne({email});
    if(!existeVeterinario){
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message});
    }

    try{
        //Ya se creo la instancia de existeVeterinario y ahora generamos un nuevo id con el helpers creado 
        existeVeterinario.token = generarId()

        //Guardamos en la BD el nuevo id
        await existeVeterinario.save()
        res.json({msg: 'Hemos enviado un email con las instrucciones'});

    }catch(error){
        console.log(error);
    }


};

const comprobarToken = async (req, res) => {
    //Por estar leyendo desde la url se coloca re.params
    const { token } = req.params;

    //CON ESTO VALIDAMOS QUE EXISTE EL USUARIO 
    const tokenValido = await Veterinario.findOne({ token });

    //No se colaca nada en la BD pq solo estamos validando el token
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