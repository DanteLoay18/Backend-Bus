const { response, request } = require('express');
const Chofer = require('../models/chofer');
const { ObjectId } = require('mongodb');

const choferGet = async (req = request, res = response) => {
  try {
    const choferes = await Chofer.find();
    res.json(choferes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
    });
  }
};

const choferPost = async (req, res) => {
  try {
    let { dni, nombre, fechaIngreso } = req.body;

    const choferEncontrado = await Chofer.findOne({ dni });
    //el error 404 es cuando no se encuentra el parametro
    if (choferEncontrado) {
      return res.status(404).json({
        success: false,
        message: 'El número de DNI ya existe',
      });
    }

    const chofer = new Chofer({ dni, nombre, fechaIngreso });

    await chofer.save();
    //el error 201 confirma la solicitud completada
    res.status(201).json({
      success: true,
      message: 'Se registró el chofer correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
    });
  }
};

const choferPut = async (req, res = response) => {
  try {
    // Obtener el id del chofer de req.params o req.body según tu implementación
    const { id } = req.params;
    // Obtener los datos actualizados del chofer de req.body
    const { nombre, fechaIngreso } = req.body;

    // Actualizar el chofer en la base de datos
    await Chofer.findByIdAndUpdate(id, { nombre, fechaIngreso });

    res.status(200).json({
      success: true,
      message: 'Se modificó el chofer correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error al modificar el chofer',
    });
  }
};

const choferDelete = async (req, res) => {
  try {
    // Obtener el id del chofer de req.params o req.body según tu implementación
    const { id } = req.params;
    // Eliminar el chofer de la base de datos
    await Chofer.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Se eliminó el chofer correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el chofer',
    });
  }
};

module.exports = {
  choferGet,
  choferPost,
  choferPut,
  choferDelete,
};