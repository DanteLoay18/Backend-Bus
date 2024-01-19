const { response, request } = require('express');
const Bus = require('../models/bus');
const { ObjectId } = require('mongodb'); // Importa ObjectId de mongodb

const busGet = async (req = request, res = response) => {

    const buses = await Bus.find();

    res.json(buses);
}
const busGetId = async (req = request, res = response) => {
    try {
       
        const { id } = req.params;

        // Utiliza findById para buscar el autobús por su _id
        const bus = await Bus.findById(id);

        // Si no se encuentra el autobús, responde con un código 404
        if (!bus) {
            return res.status(404).json({
                success: false,
                message: 'Autobús no encontrado',
            });
        }

        // Si se encuentra el autobús, responde con la información del autobús
        res.json({
            success: true,
            bus,
        });
    } catch (error) {
        // Manejo de errores: Log del error y respuesta con código 500
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
};


const busPost = async (req, res) => {

    try {

        let { placa, marca, modelo, asientos } = req.body;

        const placaEncontrada = await Bus.find({ placa });

        if (placaEncontrada.length > 0)
            return res.status(404).json({
                success: false,
                message: "El numero de placa ya existe"
            })

        let cantidad = asientos;

        asientos = [];

        for (i = 1; i <= cantidad; i++) {
            asientos.push({
                idAsiento: new ObjectId(),
                correlativo: i
            })
        }


        const bus = new Bus({ placa, marca, modelo, asientos });


        await bus.save();

        res.status(201).json({
            success: true,
            message: "Se registro correctamente"
        })
    } catch (error) {
        console.log(error)
    }

}


const busPut = async (req, res = response) => {
    try {
        const { id } = req.params; // Obtener el _id del autobús desde los parámetros de la URL
        const { placa, marca, modelo, asientos } = req.body; // Obtener los datos actualizados del autobús de req.body

        // Verificar si el autobús existe
        const busExistente = await Bus.findById(id);
        if (!busExistente) {
            return res.status(404).json({
                success: false,
                message: 'Autobús no encontrado',
            });
        }

        // Actualizar el autobús en la base de datos
        busExistente.placa = placa;
        busExistente.marca = marca;
        busExistente.modelo = modelo;
        busExistente.asientos = []; // Puedes ajustar esta parte según tu lógica

        for (let i = 1; i <= asientos; i++) {
            busExistente.asientos.push({
                idAsiento: new ObjectId(),
                correlativo: i,
            });
        }

        await busExistente.save();

        res.status(200).json({
            success: true,
            message: 'Se modificó el autobús correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
};


//metodo que sirve para eliminar un asiento
const busDelete = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el _id del autobús desde los parámetros de la URL

        // Verificar si el autobús existe
        const busExistente = await Bus.findById(id);
        if (!busExistente) {
            return res.status(404).json({
                success: false,
                message: 'Autobús no encontrado',
            });
        }

        // Eliminar el autobús de la base de datos
        await Bus.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'Se eliminó el autobús correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
};
const busDeleteAsientos = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el _id del autobús desde los parámetros de la URL
        const { idAsientos } = req.body; // Obtener los identificadores de los asientos a eliminar desde req.body

        // Verificar si el autobús existe
        const busExistente = await Bus.findById(id);
        if (!busExistente) {
            return res.status(404).json({
                success: false,
                message: 'Autobús no encontrado',
            });
        }

        // Filtrar los asientos a eliminar
        const asientosFiltrados = busExistente.asientos.filter(
            (asiento) => !idAsientos.includes(asiento.idAsiento.toString())
        );

        // Actualizar el autobús con los asientos restantes
        busExistente.asientos = asientosFiltrados;

        await busExistente.save();

        res.json({
            success: true,
            message: 'Se eliminaron los asientos correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
};



module.exports = {
    busGet,
    busGetId,
    busPost,
    busPut,
    busDelete,
    busDeleteAsientos
}