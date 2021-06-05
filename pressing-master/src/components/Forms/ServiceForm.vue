<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-white text-black" @submit="onAdd()" ref="myForm">
      <br />
      <label class="title2">
        Formulaire service
      </label>
      <q-separator style="width:550px;" color="black" />

      <br />
      <br />
      <q-item>
        <label class="title"> Image URL du service :</label>
      </q-item>
      <q-item>
        <q-input
          outlined
          style="width:500px"
          color="secondary"
          dense
          v-model="serviceCopy.imageUrl"
          label="Image Url"
        >
          <template v-slot:prepend>
            <div class="row items-center all-pointer-events">
              <q-icon
                class="q-mr-xs"
                color="secondary"
                size="20px"
                name="image"
              />
            </div>
          </template>
        </q-input>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Code :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            style="margin-left:-105px;width:330px"
            color="secondary"
            label="Code"
            dense
            v-model="serviceCopy.code"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="code"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Nom :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            style="margin-left:-105px;width:330px"
            color="secondary"
            label="Nom "
            dense
            v-model="serviceCopy.nom"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="drive_file_rename_outline"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title">Etat : </label>
        </q-item-section>
        <q-item-section>
          <q-select
            label="Etat"
            outlined
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            v-model="serviceCopy.etat"
            :options="etatOptions"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="published_with_changes"
                />
              </div>
            </template>
          </q-select>
        </q-item-section>
      </q-item>

      <br />
      <br />

      <div align="center">
        <q-btn
          v-if="!this.service"
          label="Ajouter"
          type="submit"
          icon-right="assignment_turned_in"
          style="margin-right: 15px"
          glossy
          color="blue-10"
        />

        <q-btn
          v-if="this.service"
          style="margin-right: 15px"
          label="confirmer la modification"
          icon-right="assignment_turned_in"
          glossy
          type="submit"
          @click="onEdit()"
          color="secondary"
        />

        <q-btn
          @click="onCancel()"
          label="Annuler"
          style="margin-right: 15px"
          rounded
          icon-right="cancel_presentation"
          glossy
          v-close-popup
          color="red"
        />
      </div>
    </q-form>
  </q-card>
</template>
<script>
export default {
  props: ["service"],
  data() {
    return {
      // genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],

      serviceCopy: {}
    };
  },

  methods: {
    //  async onSubmit() {
    //   this.$refs.myForm.validate().then(async success => {
    //   if (success) {
    //   let res = await this.$axios.post(`/service/`, {
    //   ...this.serviceCopy
    ////  });

    // if (res.status === "200") {
    //   await this.getAll();
    //  }
    //  }
    // });
    //  }
    // },
    async onAdd() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          try {
            let res = await this.$axios.post(`/service/`, {
              ...this.serviceCopy
            });
            window.location.reload(true);
            return this.$q.notify({
              color: "green",
              message: "Service ajouté avec succées"
            });
            // this.$emit("updated");

            // await this.getAll();
          } catch {
            return this.$q.notify({
              color: "red",
              message: "Code deja utilisé"
            });
          }
        }
      });
    },
    async onEdit() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          console.log(this.service);
          let res = await this.$axios.patch(
            `/service/update/${this.service._id}`,
            {
              ...this.serviceCopy
            }
          );
          window.location.reload(true);

          this.$emit("updated");

          await this.getAll();
        }
      });
      //  }
    },

    onCancel() {
      this.$emit("closeDialog");
    }
  },
  mounted() {
    this.serviceCopy = { ...this.service };
  }
};
</script>
<style scoped>
.mydialog {
  min-width: 600px;
  padding: 20px;
  height: 670px;
  background: white;
}
.title2 {
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 18px;

  font-family: monospace;
}
.title {
  color: rgb(0, 0, 0);
  font-family: monospace;
}
</style>
