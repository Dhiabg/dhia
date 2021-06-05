<template>
  <q-page class="q-pa-lg">
    <!-- <q-card-section class="bg-primary text-white">-->
    <h4>Gestion des livreurs</h4>
    <!-- </q-card-section> -->
    <q-separator style="margin-bottom:10px;" color="black" />
    <br />

    <div>
      <div>
        <q-btn
          glossy
          v-if="userdata.isAdmin === true"
          rounded
          dense
          :disable="selected.length > 0"
          style="margin-left:30px;"
          icon-right="person_add_alt"
          icon="add_circle_outline"
          @click="addLivreur()"
          v-close-popup
          label="Ajouter un livreur "
          color="blue-10"
        ></q-btn>
      </div>
      <div align="right">
        <q-btn
          align="right"
          v-if="userdata.isAdmin === true"
          style="margin-right:30px;background-color:#148F77;color:white"
          size="13px"
          glossy
          icon-right="change_circle"
          label="Modifier"
          @click="EditLivreur()"
          :disable="!selected.length || selected.length > 1"
        ></q-btn>
        <q-btn
          align="right"
          size="13px"
          v-if="userdata.isAdmin === true"
          glossy
          rounded
          icon="delete_forever"
          v-close-popup
          color="red"
          @click="deleteLivreur()"
          :disable="!selected.length"
        ></q-btn>
      </div>
    </div>

    <q-space />
    <br />

    <br />
    <br />
    <br />
    <div v-if="userdata.isAdmin === true">
      <template class="q-pa-md">
        <q-table
          title="Liste des Livreurs "
          :filter="filter"
          separator="cell"
          :data="livreurs"
          :columns="columns"
          row-key="_id"
          selection="multiple"
          :selected.sync="selected"
          :pagination.sync="pagination"
          hide-pagination
          color="secondary"
        >
          <template v-slot:top-right>
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
          </template>
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
            color="blue-10"
            :max="pagesNumber"
            size="sm"
          />
        </div>
      </template>
    </div>
    <div v-else>
      <template class="q-pa-md">
        <q-table
          title="Liste des Livreurs "
          :filter="filter"
          separator="cell"
          :data="livreurs"
          :columns="columns"
          row-key="_id"
          :pagination.sync="pagination"
          hide-pagination
          color="secondary"
        >
          <template v-slot:top-right>
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
          </template>
        </q-table>
        <div class="row justify-center q-mt-md">
          <q-pagination
            v-model="pagination.page"
            color="blue-10"
            :max="pagesNumber"
            size="sm"
          />
        </div>
      </template>
    </div>
    <q-dialog v-model="editDialog" v-if="editDialog">
      <livreur-form :livreur="selected[0]" @updated="getAll" />
    </q-dialog>
  </q-page>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

import LivreurForm from "src/components/Forms/LivreurForm.vue";
export default {
  components: { LivreurForm },

  name: "Livreurs",
  data() {
    return {
      addShow: false,
      editDialog: false,
      user: [],

      pagination: {
        sortBy: "createdAt",
        page: 1,
        descending: true,
        rowsPerPage: 8
      },
      filter: "",
      livreurs: [],
      selected: [],
      userdata: [],
      userId: null,
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
          label: "Date de création",
          align: "center",
          field: "createdAt"
        }
      ]
    };
  },

  methods: {
    async getUser() {
      let token = localStorage.getItem("token");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      console.log(this.user);
      this.userId = this.user._id;
      console.log(this.userId);
    },
    async getUserData() {
      let res = await this.$axios.get(`/utilisateur/${this.userId}`);
      this.userdata = res.data;
      console.log(this.userdata);
    },
    addLivreur() {
      this.editDialog = true;
    },
    async getAll() {
      let res = await this.$axios.get("/livreur");
      this.livreurs = res.data;
    },

    async deleteLivreur() {
      await this.selected.forEach(element => {
        this.$axios.delete(`/livreur/delete/${element._id}`);
      });

      window.location.reload(true);
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
  async created() {
    await this.getAll();
    await this.getUser();
    await this.getUserData();
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
</style>
<style lang="sass">

.q-table__top,
thead tr:first-child th
  font-size: 15px,
  color: darkblue,
  font: monospace
</style>
