import mongoose from 'mongoose'

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
        deafult: null,
        trim: true,
    },
    web: {
        type: String,
        deafult: null,
    },
    token:{
        type: String
    },
    confirmado: {
        type: Boolean,
        deafult: false
    }
});

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;