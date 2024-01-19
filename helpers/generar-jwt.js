const jwt = require('jsonwebtoken');

const generarJWT= (uid='') => {
    return new Promise((resolve, reject)=>{
        const payload = {uid};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn:'4h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })
    })
}


const validarToken= (req, res) => {
    return new Promise((resolve, reject)=>{
        
        const authHeader = req.header('Authorization');
        if (!authHeader) return res.status(401).send('Acceso denegado.');

        const [bearer, token] = authHeader.split(' ');

        jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, data) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(data);
            }
          });
    })
}

module.exports = {
    generarJWT,
    validarToken
}