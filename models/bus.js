const { Schema, model } = require('mongoose');

const AsientoSchema = new Schema({
  correlativo: {
    type: String,
    required: true,
  },
});

const BusSchema = new Schema({
  placa: {
    type: String,
    required: [true, 'La placa es obligatoria'],
  },
  marca: {
    type: String,
    required: [true, 'La marca es obligatoria'],
  },
  modelo: {
    type: String,
    required: [true, 'El modelo es obligatorio'],
  },
  asientos: {
    type: [AsientoSchema],
    required: true,
  },
});
//esprit
BusSchema.methods.toJSON = function () {
  const { __v, _id, ...bus } = this.toObject();
  bus.uid = _id;
  return bus;
}

module.exports = model('Bus', BusSchema);
