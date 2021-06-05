<template>
  <q-page class="q-pa-lg">
    <!-- <q-card> -->
    <!-- <q-card-section class="bg-primary text-white"> -->
    <div>
      <h4>Gestion des services</h4>
    </div>
    <q-separator style="margin-bottom:10px;" color="black" />
    <br />

    <div>
      <div>
        <q-btn
          glossy
          rounded
          dense
          :disable="selected.length > 0"
          style="margin-left:30px;padding-right:10px"
          icon="add_circle_outline"
          @click="addService()"
          v-close-popup
          label="Ajouter un service "
          color="blue-10"
        ></q-btn>
      </div>
      <div align="right">
        <q-btn
          align="right"
          style="margin-right:30px;background-color:#148F77;color:white"
          size="13px"
          glossy
          icon-right="change_circle"
          label="Modifier"
          @click="EditService()"
          :disable="!selected.length || selected.length > 1"
        ></q-btn>
        <q-btn
          align="right"
          size="13px"
          glossy
          rounded
          icon="delete_forever"
          v-close-popup
          color="red"
          @click="deleteService()"
          :disable="!selected.length"
        ></q-btn>
      </div>
    </div>

    <br />
    <br />
    <br />
    <div align="right">
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
      :data="services"
      :columns="columns"
      row-key="_id"
      grid
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="pagination"
      hide-pagination
      hide-header
    >
      <template #item="props">
        <div
          class="mycard"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card class="mycard" :class="props.selected ? 'bg-grey-3' : ''">
            <q-card-section>
              <q-checkbox
                dense
                v-model="props.selected"
                :label="props.row.name"
              />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-card :class="props.selected ? 'bg-grey-3' : ''">
                <!-- {{ props.row.imageUrl }} -->

                <img
                  v-if="props.row.imageUrl"
                  class="mycard"
                  :src="props.row.imageUrl"
                />
                <img
                  v-else
                  class="mycard"
                  src="https://www.radiobeton.com/www/wp-content/uploads/2017/01/arton17969.jpg"
                />
                <q-separator horizontal />

                <q-list>
                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Code</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label>{{ props.row.code }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />
                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Nom</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label>{{ props.row.nom }}</q-item-label>
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
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />
                  <!-- <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Description</q-item-label>
                    </q-item-section>
                    <q-separator vertical />
                    <q-item-section>
                      <q-item-label class="absolute-center">
                        {{ props.row.description }}</q-item-label
                      >
                    </q-item-section>
                  </q-item> -->
                  <!-- description list -->
                  <!-- <q-card-actions>
                    <label caption>
                      Description
                    </label>

                    <q-space />

                    <q-btn
                      color="grey"
                      round
                      flat
                      dense
                      :icon="
                        expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                      "
                      @click="expanded = !expanded"
                    />
                  </q-card-actions>
                  <q-slide-transition>
                    <div v-show="expanded">
                      <q-card-section class="text-subitle2">
                        {{ props.row.description }}
                      </q-card-section>
                    </div>
                  </q-slide-transition> -->
                </q-list>
              </q-card>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>

    <!--  Carte   -->

    <!--<q-data-table
      selection="single"
      :data="services"
      row-key="_id"
      :columns="columns"
      :selected.sync="selected"
    > -->
    <div class="q-pa-md row items-start q-gutter-md"></div>

    <q-dialog v-model="editDialog" v-if="editDialog">
      <service-form :service="selected[0]" @updated="getAll" />
    </q-dialog>
    <div class="absolute-bottom q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="blue-10"
        class="pagin"
        size="sm"
        :max="pagesNumber"
      />
    </div>
  </q-page>
</template>
<script>
import ServiceForm from "src/components/Forms/ServiceForm.vue";
export default {
  components: { ServiceForm },
  name: "Services",
  data() {
    return {
      pagination: {
        rowsPerPage: 7,
        page: 1
      },
      filter: "",
      //categories: [],
      etatcss: true,
      expanded: false,
      services: [],
      selected: [],
      // filter: "",

      columns: [
        {
          name: "_id",
          label: "Id",
          align: "center",
          field: "_id"
        },
        {
          name: "nom",
          label: "Nom",
          align: "center",
          field: "nom"
        },
        {
          name: "code",
          label: "Code",
          align: "center",
          field: "code"
        },
        {
          name: "etat",
          field: "etat",
          label: "Etat",
          align: "center"
        },
        {
          name: "imageUrl",
          label: "imageUrl",
          align: "center",
          field: "imageUrl"
        },

        {
          name: "description",
          align: "center",
          label: "Descriotion",
          field: "description"
        }
      ],
      editDialog: false
    };
  },
  methods: {
    async getAll() {
      let res = await this.$axios.get("/service");
      this.services = res.data;
    },
    addService() {
      if (this.selected[0]) {
        return this.$q.notify({
          color: "warning",
          message: "service selected"
        });
      } else {
        this.editDialog = true;
      }
    },
    async deleteService() {
      await this.selected.forEach(element => {
        this.$axios.delete(`/service/delete/${element._id}`);
      });
      //  window.location.reload(true);

      // let res = await this.$axios.delete(
      //   `/service/delete/${this.selected[0]._id}`
      // );
      // if (res.status === 204) {
      //   return (
      //     this.$q.notify({
      //       color: "red",
      //       message: "Service Supprimé"
      //     }),
      // this.$emit("updated");
      window.location.reload(true);

      // );
      // }
    },
    EditService() {
      console.log(this.selected);
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "no Service selected"
        });
      }
      this.editDialog = true;
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.services.length / this.pagination.rowsPerPage);
    }
  },
  watch: {},
  async mounted() {
    await this.getAll();
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
.actifcss {
  background-color: green;

  color: white;
}
.inactifcss {
  background-color: red;
}
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
.pagin {
  margin-left: 750px;
  margin-bottom: 170px;
}
</style>
