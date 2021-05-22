<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-white text-black" ref="myForm">
      <br />
      <label class="title">
        Finaliser la commande :
      </label>
      <br />
      <br />
      <q-item>
        <q-item-section>
          <q-input
            style="width:150px;"
            v-model="avance"
            color="secondary"
            type="number"
            label="Prix d'avance (TND)"
            lazy-rules
            :rules="[
              val => (val >= 0 && val <= this.prix) || 'Valeur incorrect'
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
            v-model="commande.prixTotal"
            :label="this.prix + ' TND'"
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

      <div>
        <label class="title2">
          Client :
        </label>
        <select v-model="commande.client">
          <option v-for="cl in clients" :key="cl._id" :value="cl._id">
            {{ cl.nom }} {{ cl.prenom }}
          </option>
        </select>
      </div>
      <br />
      <label class="title2"> Livreur : </label>
      <br />
      <br />
      <div>
        <label class="title2">
          Importer par :
        </label>
        <select v-model="commande.importer_par">
          <option v-for="liv in this.livreurs" :key="liv._id" :value="liv._id">
            {{ liv.nom }} {{ liv.prenom }}
          </option>
        </select>
      </div>
      <br />
      <div>
        <label class="title2">
          Livrer par :
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
          outline
          style="margin-right: 15px"
          rounded
          @click="onAdd()"
          color="blue"
        />

        <q-btn
          @click="onCancel()"
          label="Annuler"
          style="margin-right: 15px"
          outline
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
  props: ["panier", "prix"],

  data() {
    return {
      // genreOptions: ["Homme", "Femme"],
      // etatLivraison: ["Livrée", "En cours", "Prète"],
      // etatPaiement: ["Payée", "Non Payée"],
      livreurs: [],
      clients: [],
      produitsID: [],
      prixTotal: null,
      commande: {},
      rest: 0,
      avance: 0,
      produitPanier: {}
    };
  },

  methods: {
    prixRest() {
      return (this.rest = this.prix - this.avance);
    },

    ajoutProd() {
      this.commande.rest = this.rest;
      this.commande.avance = this.avance;
      this.commande.prixTotal = this.prix;
      if (this.rest === 0) {
        this.commande.etatPaiement = "Payer";
      } else {
        this.commande.etatPaiement = "Non Payer";
      }
      this.commande.etatLivraison = "Non Livrer";
      for (let el in this.produitPanier) {
        this.produitsID.push(this.produitPanier[el]._id);
      }
      this.commande.produits = this.produitsID;
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
    this.produitPanier = { ...this.panier };
    //  this.prixTotal = { ...this.prix };
    await console.log("prix total :", this.prix);
    await console.log("panier:", this.produitPanier);
    await this.getAllClients();
    await this.getAllLivreurs();
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
  font-family: monospace;
  font-size: large;
}
.mydialog {
  width: 700px;
  padding: 15px;
  height: 400px;
  background-color: white;
}
select {
  width: 100%;
  color: rgb(0, 0, 0);
  max-width: 150px;
  border: 1px solid rgb(2, 78, 2);
  border-radius: 5.25em;
  padding: 0.25em 0.5em;
  font-size: 0.9rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: rgb(255, 255, 255);
}
</style>
