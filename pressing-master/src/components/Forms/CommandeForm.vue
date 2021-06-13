<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-white text-black" ref="myForm">
      <br />
      <label class="title2">
        Finaliser la commande
      </label>
      <q-separator style="width:450px;" color="black" />
      <label class="title">
        veuillez vous assurer que les informations de la commande<br />
        sont exactes.
      </label>
      <br />
      <br />
      <br />
      <q-item>
        <q-item-section>
          <label class="title"> Paiement : </label>
        </q-item-section>
        <q-item-section>
          <q-select
            dense
            style="width:250px;margin-left:-120px"
            label="Moyen de paiement"
            outlined
            color="secondary"
            v-model="commande.MoyenPaiement"
            :options="optionsPaiement"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide ']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="account_box"
                />
              </div>
            </template>
          </q-select>
        </q-item-section>
      </q-item>
      <br />
      <q-item>
        <q-item-section>
          <q-input
            style="width:150px;"
            dense
            v-model="avance"
            color="secondary"
            type="number"
            label="Prix d'avance (TND)"
            lazy-rules
            :rules="[
              val => (val >= 0 && val <= this.prixTotal) || 'Valeur incorrect'
            ]"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="monetization_on"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>

        <q-item-section style="margin-left:30px">
          <q-input
            readonly
            style="width:120px;"
            color="secondary"
            hint="Rest à payer"
            dense
            v-model="commande.rest"
            :label="prixRest() + ' TND'"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="monetization_on"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
        <q-item-section>
          <q-input
            readonly
            hint="Prix total"
            style="width:120px;"
            dense
            v-model="commande.prixTotal"
            :label="this.prixTotal + ' TND'"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="money"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <br />

      <br />

      <div>
        <label class="title">
          Choisir le client :
        </label>
        <select v-model="commande.client">
          <option v-for="cl in clients" :key="cl._id" :value="cl._id">
            {{ cl.nom }} {{ cl.prenom }}
          </option>
        </select>
      </div>
      <br />
      <!-- <label class="title"> Livreur : </label>
      <br /> -->
      <!-- <br /> -->
      <!-- <div>
        <label class="title">
          Importer par :
        </label>
        <select v-model="commande.importer_par">
          <option v-for="liv in this.livreurs" :key="liv._id" :value="liv._id">
            {{ liv.nom }} {{ liv.prenom }}
          </option>
        </select>
      </div> -->
      <br />
      <div>
        <label class="title">
          Choisir le livreur :
        </label>
        <select v-model="commande.livrer_par">
          <option v-for="liv in this.livreurs" :key="liv._id" :value="liv._id">
            {{ liv.nom }} {{ liv.prenom }}
          </option>
        </select>
        <br />
        <br />
        <br />
      </div>

      <br />

      <!-- <q-select
        outlined
        color="secondary"
        label="etat Livraison"
        v-model="commande.etatLivraison"
        :options="etatLivraison"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="light"
            />
          </div>
        </template>
      </q-select>
      <q-select
        outlined
        color="secondary"
        label="etat Paiement"
        v-model="commande.etatPaiement"
        :options="etatPaiement"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="light"
            />
          </div>
        </template>
      </q-select> -->
      <br />
      <div align="center">
        <q-btn
          label="Confirmer"
          style="margin-right: 15px"
          glossy
          icon-right="add_task"
          @click="onAdd()"
          color="secondary"
        />

        <q-btn
          @click="onCancel()"
          label="Annuler"
          style="margin-right: 15px"
          rounded
          v-close-popup
          color="red"
        />
      </div>
    </q-form>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      // genreOptions: ["Homme", "Femme"],
      // etatLivraison: ["Livrée", "En cours", "Prète"],
      // etatPaiement: ["Payée", "Non Payée"],
      livreurs: [],
      clients: [],
      optionsPaiement: ["Espéces", "Chéque Bancaire", "Carte Bancaire"],
      prixTotal: 0,
      commande: {},
      rest: 0,
      avance: 0,
      prix: 0,
      produitPanier: {}
    };
  },

  methods: {
    CalculPrix() {
      let panier = JSON.parse(localStorage.getItem("panier"));
      panier.forEach(element => {
        element.services.forEach(el => {
          if (el.checked) {
            //  console.log("liste prix :", el.prix);
            this.prix = this.prix + parseFloat(el.prix);
          }
        });
        //console.log("liste quantité :", element.quantity);

        this.prix = this.prix * parseInt(element.quantity);
        //console.log("prix :", this.prix);
        this.prixTotal = this.prixTotal + this.prix;
        this.prix = 0;
      });
      //console.log("prix : ", this.prixTotal);
      return this.prixTotal;
    },
    prixRest() {
      return (this.rest = this.prixTotal - this.avance);
    },

    ajoutProd() {
      // let com = {};
      // let QteCmd = JSON.parse(localStorage.getItem("qtecmd"));
      // for (let i in QteCmd) {
      //   com.produit = i;
      //   com.quantite = QteCmd[i];
      //   this.produitsID.push(com);
      //   com = {};
      // }
      // this.commande.produits = this.produitsID;
      let comm = [];
      let prix = 0;
      let panier = JSON.parse(localStorage.getItem("panier"));
      panier.forEach(element => {
        let produits = {};
        let commandeServices = [];
        produits.produit = element._id;
        produits.quantite = element.quantity;
        element.services.forEach(el => {
          if (el && el.checked) {
            prix = prix + parseFloat(el.prix);
            commandeServices.push(el.service);
          }
        });
        produits.prix = prix * parseInt(produits.quantite);
        prix = 0;
        produits.services = commandeServices;
        comm.push(produits);
      });
      this.commande.produits = comm;

      this.commande.rest = this.rest;
      this.commande.avance = this.avance;
      this.commande.prixTotal = this.prixTotal;
      if (this.rest === 0) {
        this.commande.etatPaiement = "Payer";
      } else {
        this.commande.etatPaiement = "Non Payer";
      }
      this.commande.etatLivraison = "Non Livrer";
      //   for (let el in this.produitPanier) {
      //     this.produitsID.push(this.produitPanier[el]._id);
      //   }
      //   this.commande.produits = this.produitsID;
    },
    async getAllClients() {
      let res = await this.$axios.get("/client");
      this.clients = res.data;
    },
    async getAllLivreurs() {
      let res = await this.$axios.get("/livreur");
      this.livreurs = res.data;
    },
    async onAdd() {
      this.ajoutProd();

      this.$refs.myForm.validate().then(async success => {
        if (success) {
          let res = await this.$axios.post(`/commande`, {
            ...this.commande
          });
          window.location.reload(true);
          localStorage.removeItem("panier");

          //this.$emit("updated");
        }
      });
    },

    onCancel() {
      this.$emit("closeDialog");
    }
  },
  computed() {
    this.prixRest();
  },
  async mounted() {
    // this.produitPanier = { ...this.panier };
    //   this.prixTotal = { ...this.prix };
    // await console.log("prix total :", this.prix);
    // await console.log("panier:", this.produitPanier);
    await this.getAllClients();
    await this.getAllLivreurs();
    let panier = JSON.parse(localStorage.getItem("panier"));
    await console.log("panier :", panier);
    await this.CalculPrix();
    console.log(this.prixTotal);
  }
};
</script>
<style scoped>
.title {
  color: gray;
  font-family: monospace;
}
.title2 {
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  font-size: large;
}
.mydialog {
  width: 530px;
  padding: 15px;
  height: 650px;
  background-color: white;
}
select {
  width: 230px;
  height: 35px;
  color: rgb(0, 0, 0);
  border: 1px solid #009688;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
}
</style>
