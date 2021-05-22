const express = require("express");
const mongoose = require("mongoose");
const commandes = require("../models/Commande");
const route = express.Router();

route.post("/", async (req, res) => {
  const {
    client,
    livreur,
    avance,
    rest,
    prixTotal,
    etatPaiement,
    etatLivraison,
    dateLivraison,
    produits,
  } = req.body;
  let date = new Date()
    .toISOString()
    .replace(/T/, " ") // replace T with a space
    .replace(/\..+/, ""); // delete the dot and everything after
  let date2 = new Date();
  date2.setDate(date2.getDate() + 3);
  let Commandes = {};
  Commandes.client = client;
  Commandes.livreur = livreur;
  Commandes.avance = avance;
  Commandes.rest = rest;
  Commandes.prixTotal = prixTotal;
  Commandes.etatPaiement = etatPaiement;
  Commandes.etatLivraison = etatLivraison;
  Commandes.dateLivraison = dateLivraison;
  Commandes.produits = produits;
  Commandes.createdAt = date;
  commandes.dateLivraison = date2;

  let commandesModel = new commandes(Commandes);
  await commandesModel.save();
  res.json(commandesModel);
});

route.get("/", async (req, res) => {
  const Commandes = await commandes.find();
  res.json(Commandes);
});

module.exports = route;
