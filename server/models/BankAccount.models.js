const { Schema, model } = require('mongoose');

const BankAccountSchema = new Schema(
  {
    tutor: { type: Types.ObjectId, ref: 'Tutor' },
    accountNumber: { type: String, required: true },
    accountHolder: { type: String, required: true },
    bankName: { type: String, required: true },
    branchCode: { type: String }, //Opcional para almacenar sucursal o filial bancaria
    accountType: {
      type: String,
      enum: ['Corriente', 'Ahorros', 'Inversion', 'Empresarial'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('BanckAccount', BankAccountSchema);