<template>
  <q-page class="q-pa-lg">
    <!-- <q-card-section class="bg-primary text-white">-->
    <h4>Livreurs</h4>
    <!-- </q-card-section> -->

    <div align="right">
      <q-btn
        align="right"
        outline
        rounded
        v-close-popup
        glossy
        label="Modifier"
        color="green"
        @click="EditLivreur"
        :disable="!selected.length || selected.length > 1"
      ></q-btn>
      <q-btn
        align="right"
        outline
        glossy
        rounded
        v-close-popup
        label="Supprimer"
        color="red"
        @click="deleteLivreur"
        :disable="!selected.length"
      ></q-btn>
    </div>

    <!-- <q-separator /> -->

    <q-space />
    <br />
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
    <template class="q-pa-md">
      <q-table
        :filter="filter"
        separator="horizontal"
        :data="livreurs"
        :columns="columns"
        row-key="_id"
        selection="multiple"
        :selected.sync="selected"
        :pagination.sync="pagination"
        hide-pagination
        color="secondary"
      >
        <!-- <template v-slot:top-right>
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
        </template> -->
      </q-table>
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="secondary"
          :max="pagesNumber"
          size="sm"
        />
      </div>
    </template>
    <q-dialog v-model="editDialog" v-if="editDialog">
      <livreur-form :livreur="selected[0]" @updated="getAll" />
    </q-dialog>
  </q-page>
</template>

<script>
import LivreurForm from "src/components/Forms/LivreurForm.vue";
export default {
  components: { LivreurForm },

  name: "Livreurs",
  data() {
    return {
      addShow: false,
      editDialog: false,
      pagination: {
        sortBy: "createdAt",
        page: 1,
        descending: true,
        rowsPerPage: 8
      },
      filter: "",
      livreurs: [],
      selected: [],
      columns: [
        {
          name: "nom",
          label: "Nom",
          align: "center",
          field: "nom"
        },
        {
          name: "prenom",
          label: "Prénom",
          align: "center",
          field: "prenom"
        },
        {
          name: "date_naissance",
          field: "date_naissance",
          label: "Date de naissance",
          align: "center"
        },
        { name: "genre", label: "Genre", align: "center", field: "genre" },

        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email"
        },

        // {
        //  name: "imageUrl",
        //  label: "imageUrl (g)",
        //  align: "center",
        //  field: "imageUrl"
        //},
        {
          name: "ville",
          label: "Ville",
          align: "center",
          field: "ville"
        },
        { name: "rue", label: "Rue", align: "center", field: "rue" },
        {
          name: "code_postal",
          label: "Code Postal",
          align: "center",
          field: "code_postal"
        },

        {
          name: "telephone",
          label: "Téléphone",
          align: "center",
          field: "telephone"
        },
        {
          name: "etat",
          label: "Etat",
          align: "center",
          field: "etat"
        },
        {
          name: "createdAt",
          label: "Créer le",
          align: "center",
          field: "createdAt"
        }
      ]
    };
  },

  methods: {
    async getAll() {
      let res = await this.$axios.get("/livreur");
      this.livreurs = res.data;
    },

    async deleteLivreur() {
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "aucun Livreur selectionner"
        });
      }
      this.selected.forEach(element => {
        this.$axios.delete(`/livreur/delete/${element._id}`);
      });
      window.location.reload(true);

      this.$emit("updated");
      await this.getAll();
    },
    EditLivreur() {
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "no livreur selected"
        });
      }
      this.editDialog = true;
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.livreurs.length / this.pagination.rowsPerPage);
    }
  },
  watch: {},
  async mounted() {
    await this.getAll();
  }
};
</script>
<style scoped>
.searchy {
  max-width: 250px;
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
</style>
<style lang="sass">

.q-table__top,
thead tr:first-child th
  background-color: darkblue,
  color: #fff,
  font: 100% Helvetica, sans-serif
</style>
