
const registrar = (req, res) => {
    res.json({url: "Desde api/veterinarios"});
};

const perfil = (req, res ) => {
    res.json({url: "Desde api/veterinarios/perfil"})
};

export {registrar, perfil}