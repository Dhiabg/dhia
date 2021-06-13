<template>
  <q-page class="q-pa-lg">
    <!-- <q-card-section class="bg-primary text-white">-->
    <h4>Liste des commandes</h4>
    <!-- </q-card-section> -->
    <q-separator style="margin-bottom:10px;" color="black" />
    <br />
    <div>
      <q-btn
        glossy
        rounded
        dense
        style="margin-left:30px;padding-right:10px"
        icon="add_circle_outline"
        to="/commander"
        class="shadowbutton"
        v-close-popup
        label="Passer une commande"
        color="blue-10"
      />
    </div>
    <br />
    <br />

    <template class="q-pa-md">
      <q-table
        :data="commandes"
        :columns="columns"
        row-key="_id"
        :pagination.sync="pagination"
        :filter="filter"
        title="Liste des commandes"
        separator="cell"
        hide-pagination
        hide-bottom
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="client" :props="props">
              {{ NomClients[props.row.client] }}
              {{ PrenomClients[props.row.client] }}
            </q-td>
            <q-td key="avance" :props="props">
              {{ props.row.avance }} TND
            </q-td>
            <q-td key="rest" :props="props"> {{ props.row.rest }} TND </q-td>
            <q-td key="prixTotal" :props="props"
              >{{ props.row.prixTotal }} TND</q-td
            >
            <q-td key="MoyenPaiement" :props="props">{{
              props.row.MoyenPaiement
            }}</q-td>
            <q-td key="etatPaiement" :props="props">{{
              props.row.etatPaiement
            }}</q-td>
            <q-td key="livrer_par" :props="props"
              >{{ NomLivreurs[props.row.livrer_par] }}
              {{ PrenomLivreurs[props.row.livrer_par] }}
            </q-td>
            <q-td key="etatLivraison" :props="props">{{
              props.row.etatLivraison
            }}</q-td>
            <q-td key="dateLivraison" :props="props">{{
              props.row.dateLivraison
            }}</q-td>
            <q-td key="produits" :props="props"
              ><q-btn
                @click="show_dialog = true"
                color="blue"
                label="voir les produits"
                size="sm"
                no-caps
              >
                <q-dialog v-model="show_dialog" v-if="show_dialog">
                  <produits-commande :produit="props.row.produits" />
                </q-dialog>
              </q-btn>
            </q-td>
            <q-td key="facture" :props="props"
              ><q-btn color="blue" label="imprimer facture" size="sm" no-caps
            /></q-td>
            <q-td key="Action" :props="props"
              ><q-btn
                @click="confirm = true"
                color="red"
                icon-right="delete_forever"
                size="sm"
                no-caps/>
              <q-dialog v-model="confirm">
                <q-card>
                  <q-card-section class="row items-center">
                    <q-avatar
                      icon="delete_outline"
                      color="white"
                      text-color="red"
                    />

                    <span class="q-ml-sm"
                      >êtes-vous sûr de vouloir supprimer la commande ?
                    </span>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn
                      dense
                      rounded
                      flat
                      label="Annuler"
                      color="red"
                      v-close-popup
                    />
                    <q-btn
                      glossy
                      dense
                      no-caps
                      icon-right="delete_forever"
                      @click="deleteCommande(props.row._id)"
                      label="Supprimer"
                      color="red"
                      v-close-popup
                    />
                  </q-card-actions>
                </q-card> </q-dialog
            ></q-td>
            <!-- <q-td key="actions" :props="props">
              <q-btn
                color="blue"
                label="Update"
                @click="editItem(props.row)"
                size="sm"
                no-caps
              ></q-btn>
              <q-btn
                color="red"
                label="Delete"
                @click="deleteItem(props.row)"
                size="sm"
                no-caps
              ></q-btn>
            </q-td> -->
          </q-tr>
        </template>
        <template v-slot:top-right>
          <q-input
            class="searchy"
            dense
            style="margin-right:25px"
            v-model="filter"
            placeholder="  Chercher...."
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            color="primary"
            icon-right="download"
            label=""
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Aucune commande trouvée... {{ message }}</span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>

        <template>
          <q-btn
            color="primary"
            icon-right="download"
            label=""
            no-caps
            @click="exportTable"
          />
        </template>
      </q-table>

      <div class="row justify-center q-mt-md" style="margin-top:30px">
        <q-pagination
          v-model="pagination.page"
          color="blue-10"
          :max="pagesNumber"
          size="sm"
        />
      </div>
    </template>
  </q-page>
</template>

<script>
import ProduitsCommande from "src/components/ProduitsCommande.vue";

import { exportFile } from "quasar";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted
    //.split('"').join('""');
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    //.split('\n').join('\\n')
    .split("\r")
    .join("\\r");

  return `"${formatted}"`;
}
export default {
  name: "Commandes",
  components: { ProduitsCommande },

  data() {
    return {
      //addShow: false,
      editDialog: false,

      pagination: {
        sortBy: "createdAt",
        page: 1,
        descending: true,
        rowsPerPage: 10
      },
      filter: "",
      selected: [],
      commandes: [],
      NomClients: [],
      PrenomClients: [],
      NomLivreurs: [],
      PrenomLivreurs: [],

      show_dialog: false,
      confirm: false,
      columns: [
        {
          name: "createdAt",
          label: "Date de création",
          align: "center",
          field: "createdAt"
        },
        {
          name: "client",
          label: "Client",
          align: "center",
          field: "client"
        },
        {
          name: "avance",
          label: "Prix d'avance",
          align: "center",
          field: "avance"
        },
        {
          name: "rest",
          field: "rest",
          label: "Rest à payer",
          align: "center"
        },
        {
          name: "prixTotal",
          label: "Prix total",
          align: "center",
          field: "prixTotal"
        },
        {
          name: "MoyenPaiement",
          label: "Moyen de paiement",
          align: "center",
          field: "MoyenPaiement"
        },
        {
          name: "etatPaiement",
          align: "center",
          label: "Etat de paiement",
          field: "etatPaiement"
        },
        {
          name: "livrer_par",
          label: "Livreur",
          align: "center",
          field: "livrer_par"
        },
        {
          name: "etatLivraison",
          label: "Etat de livraison",
          align: "center",
          field: "etatLivraison"
        },
        {
          name: "dateLivraison",
          label: "Date de livraison",
          align: "center",
          field: "dateLivraison"
        },

        {
          name: "produits",
          label: "Produits commandés",
          align: "center",
          field: "produits"
        },
        {
          name: "facture",
          label: "Facture",
          align: "center",
          field: "facture"
        },
        {
          name: "Action",
          label: "Action",
          align: "center",
          field: "Action"
        }
      ]
    };
  },

  methods: {
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.commandes.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    },
    async getAllNomClients() {
      let res = await this.$axios.get("/client");
      let NomClients = {};
      res.data.forEach(el => {
        NomClients[el._id] = el.nom;
      });
      this.NomClients = { ...NomClients };
    },

    async getAllNomLivreurs() {
      let res = await this.$axios.get("/livreur");
      let NomLivreurs = {};
      res.data.forEach(el => {
        NomLivreurs[el._id] = el.nom;
      });
      this.NomLivreurs = { ...NomLivreurs };
    },
    async getAllPrenomClients() {
      let res = await this.$axios.get("/client");
      let PrenomClients = {};
      res.data.forEach(el => {
        PrenomClients[el._id] = el.prenom;
      });
      this.PrenomClients = { ...PrenomClients };
    },

    async getAllPrenomLivreurs() {
      let res = await this.$axios.get("/livreur");
      let PrenomLivreurs = {};
      res.data.forEach(el => {
        PrenomLivreurs[el._id] = el.prenom;
      });
      this.PrenomLivreurs = { ...PrenomLivreurs };
    },
    async getAll() {
      let res = await this.$axios.get("/commande");
      this.commandes = res.data;
    },

    async deleteCommande(id_commande) {
      // await this.selected.forEach(element => {
      //   this.$axios.delete(`/service/delete/${element._id}`);
      // });
      //  window.location.reload(true);

      let res = await this.$axios.delete(`/commande/delete/${id_commande}`);
      if (res.status === 200) {
        return (
          this.$q.notify({
            color: "warning",
            message: "Commande Supprimé"
          }),
          window.location.reload(true)
        );
      }
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.commandes.length / this.pagination.rowsPerPage);
    }
  },
  watch: {},
  async mounted() {
    await this.getAll();
    console.log(this.commandes);

    await this.getAllNomClients();
    await this.getAllNomLivreurs();
    await this.getAllPrenomClients();
    await this.getAllPrenomLivreurs();
  }
};
</script>
<style scoped>
.searchy {
  max-width: 250px;
  border: solid 1px rgb(224, 224, 224);
}
h4 {
  font-family: monospace;
  font-size: 2em;
  margin-top: 0.5em;
  margin-bottom: 0.15em;
  margin-left: 0;
  margin-right: 0;
  letter-spacing: 3px;
  font-weight: bold;
}
.transform:hover {
  transform: translateY(-3px);
}
.shadowbutton {
  box-shadow: 0 9px #999;
}
.shadowbutton:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
<style lang="sass">

.q-table__top,
thead tr:first-child th
  font-size: 15px,
  color: darkblue,
  font: monospace
</style>
