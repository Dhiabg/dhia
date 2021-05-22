<template>
  <q-page class="q-pa-lg">
    <h4>Commander</h4>
    <div align="right">
      <q-btn
        to="/panier"
        flat
        dense
        rounded
        icon="shopping_cart"
        class="shopicon"
        size="20px"
      >
        Panier
      </q-btn>
    </div>

    <!-- Categories -->

    <q-table
      :data="cat"
      row-key="_id"
      grid
      selection="single"
      :pagination.sync="paginationCat"
      hide-pagination
      hide-header
    >
      <template #item="props">
        <div>
          <q-list>
            <q-card class="catservcard" @click="changeCatName(props.row.nom)">
              <q-img class="catservcard" :src="props.row.imageUrl">
                <div class="absolute-bottom text-subtitle text-center">
                  {{ props.row.nom }}
                </div>
              </q-img>
            </q-card>
            <div class="row absolute-bottom q-mt-md">
              <q-pagination
                v-model="paginationCat.page"
                color="secondary"
                class="pagin"
                :max="pagesNumberCat"
                size="sm"
              />
            </div>
          </q-list>
        </div>
      </template>
    </q-table>

    <!-- Categories -->
    <br />

    <!-- Services -->

    <q-table
      :data="serv"
      row-key="_id"
      grid
      selection="single"
      :pagination.sync="paginationServ"
      hide-pagination
      hide-header
    >
      <template #item="props">
        <div class="catservcard">
          <q-card
            @click="changeServName(props.row.nom)"
            class="catservcard"
            :class="props.row.nom === servName ? 'bg-grey-3' : ''"
          >
            <q-separator />
            <q-list dense>
              <q-list>
                <q-card :class="props.row.nom === servName ? 'bg-grey-3' : ''">
                  <q-img
                    :class="props.row.nom === servName ? 'bg-grey-3' : ''"
                    class="catservcard"
                    :src="props.row.imageUrl"
                  >
                    <div class="absolute-bottom text-subtitle text-center">
                      {{ props.row.nom }}
                    </div>
                  </q-img>
                </q-card>
              </q-list>
            </q-list>
          </q-card>
        </div>
        <div class="row absolute-bottom q-mt-md">
          <q-pagination
            v-model="paginationServ.page"
            color="secondary"
            class="pagin"
            :max="pagesNumberServ"
            size="sm"
          />
        </div>
      </template>
    </q-table>

    <!-- Services -->
    <br />
    <q-space />

    <div>
      <q-input
        class="searchy"
        dense
        v-model="filter"
        placeholder="  Chercher...."
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <br />

    <q-table
      :filter="filter"
      :data="produits"
      row-key="_id"
      grid
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="pagination"
      hide-header
      hide-pagination
    >
      <template #item="props">
        <div
          class="mycard"
          v-if="
            services[props.row.service] === servName &&
              categories[props.row.categorie] === catName
          "
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card class="mycard" :class="props.selected ? 'bg-grey-3' : ''">
            <q-list dense>
              <q-card :class="props.selected ? 'bg-grey-3' : ''">
                <!-- {{ props.row.imageUrl }} -->
                <img class="mycard" :src="props.row.imageUrl" />

                <q-separator horizontal />

                <q-list>
                  <!-- <q-item>
                    <q-item-section avatar>
                      <q-item-label caption> Nom</q-item-label>
                    </q-item-section>
                    <q-item-section>
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
                  </q-item> -->
                  <q-separator horizontal />

                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Prix</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label
                        >{{ props.row.prix }}
                        <q-space></q-space> Dinars</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />

                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Etat</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label
                        ><q-badge
                          :class="
                            props.row.etat === 'Actif'
                              ? 'actifcss'
                              : 'inactifcss'
                          "
                          >{{ props.row.etat }}</q-badge
                        ></q-item-label
                      >
                      <q-separator vertical />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <q-btn
                          @click="ajoutPanier(props.row)"
                          flat
                          dense
                          round
                          icon="add_shopping_cart"
                          style="margin-left:80px"
                          class="iconitem"
                        />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />
                </q-list>
              </q-card>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>

    <div class="row absolute-bottom q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="secondary"
        class="pagin"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </q-page>
</template>
<script>
export default {
  name: "Commander",
  data() {
    return {
      expanded: false,
      pagination: {
        rowsPerPage: 5,
        page: 1
      },
      paginationCat: {
        rowsPerPage: 3,
        page: 1
      },
      paginationServ: {
        rowsPerPage: 3,
        page: 1
      },
      filter: "",
      produits: [],
      categories: [],
      services: [],
      selected: [],
      catName: "Adulte",
      servName: "Lavage",
      cat: [],
      ajoutTest: true,
      serv: [],
      panier: [],
      editDialog: false
    };
  },
  methods: {
    ajoutPanier(element) {
      if (localStorage.getItem("panier")) {
        this.panier = JSON.parse(localStorage.getItem("panier"));

        for (let i in this.panier) {
          if (element._id === this.panier[i]._id) {
            this.ajoutTest = false;
          }
        }
      }
      if (element.etat === "Actif" && this.ajoutTest) {
        this.panier.push(element);
        console.log(this.panier);
        localStorage.setItem("panier", JSON.stringify(this.panier));
        return this.$q.notify({
          color: "green",
          message: "Produit ajouté au panier avec succés"
        });
      } else if (element.etat === "Inactif") {
        return this.$q.notify({
          color: "red",
          message: "Produit n'est pas actif pour le moment"
        });
      } else if (this.ajoutTest === false) {
        return this.$q.notify({
          color: "red",
          message: "Produit déja ajouté"
        });
      }
    },
    changeServName(y) {
      this.servName = y;
    },
    changeCatName(x) {
      this.catName = x;
    },
    async getServices() {
      let res = await this.$axios.get("/service");
      this.serv = res.data;
      console.log("Services :", this.serv);
    },
    async getCategories() {
      let res = await this.$axios.get("/categorie");
      this.cat = res.data;
      console.log("Categories :", this.cat);
    },
    async getAllCategories() {
      let res = await this.$axios.get("/categorie");
      let categories = {};
      res.data.forEach(el => {
        categories[el._id] = el.nom;
      });
      this.categories = { ...categories };
    },
    async getAll() {
      let res = await this.$axios.get("/produit");
      this.produits = res.data;
      console.log("Produits :", this.produits);
    },
    async getAllServices() {
      let res = await this.$axios.get("/service");
      let services = {};
      res.data.forEach(el => {
        services[el._id] = el.nom;
      });
      this.services = { ...services };
    },
    addProduit() {
      if (this.selected[0]) {
        return this.$q.notify({
          color: "warning",
          message: "produit selected"
        });
      } else {
        this.editDialog = true;
      }
    },
    async deleteFromPanier() {
      this.selected.forEach(element => {
        this.$axios.delete(`/produit/delete/${element._id}`);
      });
      await this.$emit("updated");
      window.location.reload(true);
    },
    EditProduit() {
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "no client selected"
        });
      }
      this.editDialog = true;
    },
    getPanier() {
      if (JSON.parse(localStorage.getItem("panier"))) {
        return (this.panier = JSON.parse(localStorage.getItem("panier")));
      }
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.produits.length / this.pagination.rowsPerPage);
    },
    pagesNumberServ() {
      return Math.ceil(this.serv.length / this.paginationServ.rowsPerPage);
    },
    pagesNumberCat() {
      return Math.ceil(this.cat.length / this.paginationCat.rowsPerPage);
    }
  },

  async created() {
    await this.getAllServices();
    await this.getAll();
    await this.getServices();
    await this.getAllCategories();
    await this.getCategories();
    await this.getPanier();

    // await console.log("panier : ", this.panier);
  }
};

//  async asyncData() {
//   try {
//    let categories = await this.$axios.get("/categorie");
//    let services = await this.$axios.get("/service");
//   const { catResponse, servResponse } = await Promise.all([
//    categories,
//    services
//  ]);
//  console.log(catResponse);

// return {
//   categories: catResponse,
//   services: servResponse
//  };
//  } catch (err) {
//    console.log(err);
//  }
// },
</script>
<style scoped>
.mycard {
  width: 200px;
  height: 160px;
  margin-right: 20px;
}
.catservcard {
  width: 150px;
  height: 110px;
  margin-right: 20px;
}

.catservcard:hover {
  font-weight: bold;
  border: 1.5px solid #4082c0;
}

.actifcss {
  background-color: green;

  color: white;
}
.inactifcss {
  background-color: red;
  color: white;
}
.searchy {
  max-width: 200px;
  border: 1px solid black;
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
.pagin {
  margin-left: 750px;
  margin-bottom: 20px;
}
.iconitem {
  color: rgb(5, 100, 5);
}
.iconitem:hover {
  color: rgb(93, 199, 102);
}
.shopicon {
  color: rgb(85, 209, 85);

  background-color: rgb(235, 233, 233);
}
.shopicon:hover {
  color: rgb(93, 199, 102);
  background-color: rgb(231, 255, 231);
}
</style>
