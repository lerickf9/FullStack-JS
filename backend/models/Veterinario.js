import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarid.js';

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    telefono: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null,
    },
    token:{
        type: String,
        default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
});

veterinarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Registrado este metodo que solo se ocupará aquí 
veterinarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    //compare() compara sin hashear o el que iongresa el usuario y lo compara con el password hasheado.
    //Tambien el metodo compare toma 2 parametros uno de ellos es el passwordFormulario que es que escribe el usuario
    //mas el segundo parametro que hace la comparacion y en este caso es el password hasheado y es nombrado 
    //como this.password
    return await bcrypt.compare(passwordFormulario, this.password);
}

//Registra veterinario como modelo en la bd
const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
//Esto exporta el modelo en otras partes que lo necesitemos
export default Veterinario;