<template>
  <q-page vertical class="q-pa-lg">
    <br />

    <h4 align="center">Récapitulatif de mon panier</h4>

    <br />
    <br />

    <div class="mydiv">
      <q-scroll-area
        class="myscroll"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <q-table
          :data="Panier"
          :columns="columns"
          row-key="_id"
          grid
          selection="multiple"
          :pagination.sync="pagination"
          :selected.sync="selected"
          hide-header
          hide-pagination
        >
          <template #item="props">
            <q-card
              class="mycard"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <!-- <q-card class="mycard" :class="props.selected ? 'bg-grey-3' : ''">
            <q-card-section>
              <q-checkbox
                dense
                v-model="props.selected"
                :label="props.row.name"
              />
            </q-card-section>
            <q-separator /> -->
              <q-card-section
                horizontal
                :class="props.selected ? 'bg-grey-3' : ''"
              >
                <!-- <q-btn
              flat
              dense
              round
              icon="delete_forever"
              @click="deleteFromPanier(props.row)"
              class="iconitem"
            /> -->
                <!-- {{ props.row.imageUrl }} -->

                <img class="myimg" :src="props.row.imageUrl" />
                <q-separator vertical />

                <q-card-section horizontal>
                  <q-list dense class="mylist">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption> Nom</q-item-label>
                      </q-item-section>
                      <q-item-section class="absolute-center">
                        <q-item-label>{{ props.row.nom }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-separator horizontal />
                    <q-item>
                      <q-item-section avatar>
                        <q-item-label caption>Categorie</q-item-label>
                      </q-item-section>

                      <q-item-section class="absolute-center">
                        <q-item-label>
                          {{ categories[props.row.categorie] }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator horizontal />
                    <q-item>
                      <q-item-section avatar>
                        <q-item-label caption>Service</q-item-label>
                      </q-item-section>

                      <q-item-section class="absolute-center">
                        <q-item-label>{{
                          services[props.row.service]
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator horizontal />

                    <q-item>
                      <q-item-section avatar>
                        <q-item-label caption>Prix</q-item-label>
                      </q-item-section>

                      <q-item-section class="absolute-center">
                        <q-item-label>{{ props.row.prix }} TND</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>

                  <q-separator vertical />
                  <!-- <q-card-section vertical> -->

                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Quantité</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-input type="number" class="inputQte" outlined />
                    </q-item-section>
                  </q-item>
                  <!-- <q-card-section vertical>
                    <q-btn
                      flat
                      round
                      icon="delete_forever"
                      @click="deleteFromPanier(props.row)"
                      class="iconitem"
                    />
                  </q-card-section> -->
                  <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        size="12px"
                        flat
                        round
                        icon="delete_forever"
                        @click="deleteFromPanier(props.row)"
                        class="iconitem"
                      />
                    </div>
                  </q-item-section>
                </q-card-section>
              </q-card-section>
            </q-card>
          </template>
        </q-table>
      </q-scroll-area>
    </div>

    <div
      class="fixed-top-right, absolute-top-right"
      style="margin-top:200px; margin-right:200px;width:350px"
    >
      <q-list bordered align="center">
        <q-item>
          <!-- <q-item-section>
            <q-icon color="primary" name="money" />
          </q-item-section> -->

          <q-item-section class="totalcss">Produits :</q-item-section>
          <q-item-section class="totalcss"
            >{{ this.totalPrice }} TND</q-item-section
          >
        </q-item>

        <q-item>
          <q-item-section class="totalcss">Frais de livraison :</q-item-section>
          <q-item-section class="totalcss"
            >{{ this.frais_livraison }} TND</q-item-section
          >
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section avatar>
            <q-icon color="green" name="attach_money" />
          </q-item-section>
          <q-item-section class="total">Prix Total :</q-item-section>
          <q-item-section class="total"
            >{{ this.totalPrice + this.frais_livraison }} TND</q-item-section
          >
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn
              style="width:230px;margin-left:50px"
              rounded
              glossy
              icon-right="shopping_cart"
              color="green"
              @click="passerCommande()"
              label="Valider la commande"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <!-- <q-card flat bordered align="center" class="priceCard">
        <q-card-section>
          <h5>
            Prix Total :
          </h5>
        </q-card-section>

        <q-card-section> {{ this.totalPrice }} Dinars</q-card-section>
        <q-card-section>
          <q-btn
            @click="passerCommande()"
            align="right"
            label="Valider la commande"
          />
        </q-card-section>
      </q-card> -->
    </div>
    <br />

    <div
      class="fixed-bottom-left, absolute-bottom-left"
      style="margin-bottom:50px; margin-left:40px"
    >
      <h5>
        <router-link to="/commander">continuer mes commandes</router-link>
      </h5>
    </div>
    <q-dialog v-model="editDialog" v-if="editDialog">
      <commande-form :panier="Panier" :prix="this.totalPrice" />
    </q-dialog>
  </q-page>
</template>

<script>
import CommandeForm from "src/components/Forms/CommandeForm.vue";
export default {
  components: { CommandeForm },

  name: "Panier",
  data() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2
      },
      pagination: {
        page: 1,
        rowsPerPage: 100
      },
      quantite: [],
      selected: [],
      editDialog: false,
      filter: "",
      totalPrice: 0,
      frais_livraison: 7,
      categories: [],
      services: [],
      Panier: [],
      columns: [
        {
          name: "imageUrl",
          label: "imageUrl",
          align: "center",
          field: "imageUrl"
        },
        {
          name: "code",
          label: "Code",
          align: "center",
          field: "code"
        },
        {
          name: "nom",
          label: "Nom",
          align: "center",
          field: "nom"
        },
        {
          name: "categorie",
          field: "categorie",
          label: "Categorie",
          align: "center"
        },
        {
          name: "service",
          label: "Service",
          align: "center",
          field: "service"
        },

        {
          name: "prix",
          align: "center",
          label: "Prix en dinars",
          field: "prix"
        },
        {
          name: "quantite",
          align: "center",
          label: "Quantité",
          field: "quantite"
        }
      ]
    };
  },

  methods: {
    passerCommande() {
      this.editDialog = true;
    },
    deleteFromPanier(_id) {
      //  console.log(_id);
      this.Panier.splice(this.Panier.indexOf(_id), 1);
      localStorage.setItem("panier", JSON.stringify(this.Panier));
      window.location.reload(true);
    },
    async getAllCategories() {
      let res = await this.$axios.get("/categorie");
      let categories = {};
      res.data.forEach(el => {
        categories[el._id] = el.nom;
      });
      this.categories = { ...categories };
    },

    async getAllServices() {
      let res = await this.$axios.get("/service");
      let services = {};
      res.data.forEach(el => {
        services[el._id] = el.nom;
      });
      this.services = { ...services };
    },
    getPanier() {
      this.Panier = JSON.parse(localStorage.getItem("panier"));
      return console.log("Panier :", this.Panier);
    },
    prixTotal() {
      for (let elem in this.Panier) {
        this.totalPrice = this.totalPrice + parseFloat(this.Panier[elem].prix);
        console.log(elem.prix);
      }
      return this.totalPrice;
    }
  },
  computed: {},
  watch: {},

  async mounted() {
    await this.getPanier();
    await this.prixTotal();
    await this.getAllCategories();
    await this.getAllServices();
  }
};
</script>
<style scoped>
.mydiv {
  margin-left: 150px;
  width: 300px;
}
.searchy {
  max-width: 250px;
  border: 1px solid black;
}
.iconitem {
  color: rgb(255, 0, 0);
}

h4 {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 2.37em;
  margin-top: 0.33em;
  color: #1a037e;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  letter-spacing: 3px;
  font-weight: bold;
}
h5 {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 1.37em;
  margin-top: 0.33em;
  color: #1a037e;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  letter-spacing: 3px;
  font-weight: bold;
}

.priceCard {
  width: 400px;
}
.mycard {
  width: 600px;
  box-shadow: 3 0px 10px rgba(199, 200, 204, 0.39);

  height: 170px;
  margin-right: 20px;
  margin-left: 10px;
  margin-bottom: 20px;
}
.inputQte {
  width: 60px;
}
.myimg {
  width: 150px;
  margin-left: 15px;
  margin-right: 15px;
  max-height: 150px;
  margin-top: 10px;
}
.mylist {
  width: 210px;
  margin-top: 20px;
}
.myscroll {
  height: 370px;
  width: 630px;
  border: 5px;
  box-shadow: 0 0px 2px rgb(20, 2, 104);
  padding: 0.5rem;
  background-color: #ffffff;
}
.total {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: medium;
}
.totalcss {
  font-family: "Times New Roman", Times, serif;
  font-size: small;
  color: gray;
}
</style>
