import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    let token; 
    console.log('Desde mi Middleware');

    //comprobamos que el usuario envia el token en la cabecera. el stasrtWith pide el token venga con 'Bearer'
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        console.log("Si tiene un token con bearer");
    }
    try{
        //Eliminamos el bearer con el split cuando encunetro el primer espacio y devuelve el token completo
        token = req.headers.authorization.split(' ')[1];
        //verify pide 2 parametro el primeros es el token enviado en el servidor y la siguiente es la palabra clave
        //Asi el sistema tiene certeza que el usuario a sido autenticado.
        //Luego el objeto decoded tiene las atributos del Veterinario y por puede acceder a su id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //el select - m,e arroja la respuestas menos las otras variables en este caso solo es id email y telefono
        //incoporamos reques a veterinario para crear la sesion con un Veterinario.
        req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
        //Si el codigo es correcto pasara al siguiente midlewere con next()
        return next()
    }catch(error){
        const e = new Error ('Token no valido');
        return res.status(403).json({msg: e.message})
    }
    
};

export default checkAuth;