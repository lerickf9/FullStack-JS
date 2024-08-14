
const registrar = (req, res) => {

    //Probando el request del body...
    const {email, password, nombre} = req.body

    console.log(email);
    console.log(password);
    console.log(nombre);


    res.json({msg: "Registrando usuario..."});
};

const perfil = (req, res ) => {
    res.json({msg: "Mostrando perfil"})
};

export {registrar, perfil}