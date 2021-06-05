<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-white text-black" @submit="onAdd()" ref="myForm">
      <br />
      <label class="title2">
        Formulaire catégorie
      </label>
      <q-separator style="width:550px;" color="black" />

      <br />
      <br />
      <q-item>
        <label class="title"> Image URL du catégorie :</label>
      </q-item>
      <q-item>
        <q-input
          dense
          outlined
          style="width:500px"
          color="secondary"
          v-model="categorieCopy.imageUrl"
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
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            label="Code"
            v-model="categorieCopy.code"
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
      <!-- date -->
      <q-item>
        <q-item-section>
          <label class="title"> Nom :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            label="Nom "
            v-model="categorieCopy.nom"
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
            v-model="categorieCopy.etat"
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
          v-if="!this.categorie"
          label="Ajouter"
          type="submit"
          icon-right="assignment_turned_in"
          style="margin-right: 15px"
          glossy
          color="blue-10"
        />

        <q-btn
          v-if="this.categorie"
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
  props: ["categorie"],
  data() {
    return {
      // genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],

      categorieCopy: {}
    };
  },

  methods: {
    async onAdd() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          try {
            let res = await this.$axios.post(`/categorie/`, {
              ...this.categorieCopy
            });
            window.location.reload(true);

            // this.$emit("updated");

            // await this.getAll();
          } catch {
            return this.$q.notify({
              color: "red",
              message: "code deja utilisé"
            });
          }
        }
      });
    },
    async onEdit() {
      //  this.$refs.myForm.validate().then(async success => {
      ////    if (success) {
      ////    let res = await this.$axios.post(`/client/`, {
      //...this.clientCopy
      //  });
      //  console.log(res);
      //   }
      //});
      //} else {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          let res = await this.$axios.patch(
            `/categorie/update/${this.categorie._id}`,
            {
              ...this.categorieCopy
            }
          );
          window.location.reload(true);

          this.$emit("updated");

          await this.getAll();
        }
      });
    },

    onCancel() {
      this.$emit("closeDialog");
    }
  },
  mounted() {
    this.categorieCopy = { ...this.categorie };
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
