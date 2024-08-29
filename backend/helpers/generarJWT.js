import jwt from 'jsonwebtoken';


//JWT_SECRET gneramos una palabra clave para que sea más dificil de detectar o crakear el token
const generarJWT = (id) =>{

    //El metodo sign envia 2 parametros de entrada. 1 es nombre de la variable que se quedará guardado y el segundo la palabra clave
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",

    });
};

export default generarJWT;