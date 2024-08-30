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

        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
        return next()
    }catch(error){
        const e = new Error ('Token no valido');
        return res.status(403).json({msg: e.message})
    }
    
};

export default checkAuth;