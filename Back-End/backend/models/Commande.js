const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commandes = new Schema({
  createdAt: { type: Date, default: Date.now },
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  importer_par: { type: Schema.Types.ObjectId, ref: "Livreur" },

  livrer_par: { type: Schema.Types.ObjectId, ref: "Livreur" },
  avance: { type: String },
  rest: { type: String },
  prixTotal: { type: String },
  etatPaiement: { type: String },
  etatLivraison: { type: String },
  dateLivraison: { type: String },
  produits: [
    {
      type: Schema.Types.ObjectId,
      ref: "Produit",
    },
  ],
});

module.exports = mongoose.model("commandes", commandes);
