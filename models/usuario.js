
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre : {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo : {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique:true
    },
    username : {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique:true
    },
    password : {
        type: String,
        required: [true, 'La contrasena es obligatorio']
    },
    rol: {
        type: Number,
        required: true,
    }
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid= _id;
    return usuario;
}
module.exports = model('Usuario', UsuarioSchema);