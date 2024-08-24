import mongoose from 'mongoose'

const conectarDB = async () => {
    try{
        //mongoose.connect nos permite conectarnos a una bd
        const db = await mongoose.connect(
            process.env.MONGO_URI,
            
        // Error 
        //{
        //    useNewUrlParser: true,
        //    useUnifiedTopology: true,
        //}
        );

        //${db.connection.host}:${db.connection.port} ==> nos dara una url y el puerto
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en: ${url}`)
    }catch(error){
        console.log(`error: ${error.message}`);
        process.exit(1); //estos nos imprime un mensaje de error
    }
};

export default conectarDB;