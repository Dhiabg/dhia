<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-dark text-white" @reset="onCancel" ref="myForm">
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="livreurCopy.nom"
        label="Nom"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="person"
            />
          </div>
        </template>
      </q-input>
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="livreurCopy.prenom"
        label="Prénom"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="person"
            />
          </div>
        </template>
      </q-input>
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="livreurCopy.date_naissance"
        type="date"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="today"
            />
          </div>
        </template>
      </q-input>
      <!-- date -->

      <q-select
        label="Genre"
        dark
        rounded
        outlined
        color="secondary"
        v-model="livreurCopy.genre"
        :options="genreOptions"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="wc" />
          </div>
        </template>
      </q-select>
      <br />
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        type="mail"
        :offset="[0, 8]"
        v-model="livreurCopy.email"
        label=""
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="mail" />
            Email
          </div>
        </template>
      </q-input>
      <br />
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="livreurCopy.ville"
        label="Ville"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="home" />
            Ville
          </div>
        </template>
      </q-input>
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="livreurCopy.rue"
        label="Rue"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="home" />
          </div>
        </template>
      </q-input>
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="livreurCopy.code_postal"
        label="Code Postal"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="code" />
          </div>
        </template>
      </q-input>
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        mask="## ### ###"
        unmasked-value
        v-model="livreurCopy.telephone"
        label=""
        lazy-rules
        :rules="[val => (val && val.length === 8) || 'Please type something']"
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="phone"
            />
            Téléphone : ## ### ###
          </div>
        </template>
      </q-input>
      <q-select
        label="Etat"
        dark
        rounded
        outlined
        color="secondary"
        v-model="livreurCopy.etat"
        :options="etatOptions"
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
      <br />
      <div>
        <!-- <q-btn
          v-if="!this.livreur"
          label="Ajouter"
          outline
          style="margin-right: 15px"
          rounded
          @click="onAdd()"
          color="blue"
        /> -->

        <q-btn
          v-if="this.livreur"
          style="margin-right: 15px"
          label="Modifier"
          outline
          rounded
          @click="onEdit()"
          color="green"
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
  props: ["livreur"],
  data() {
    return {
      genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],
      livreurCopy: {},
      selectedCopy: {}
    };
  },

  methods: {
    // async onAdd() {
    //   this.$refs.myForm.validate().then(async success => {
    //     if (success) {
    //       let res = await this.$axios.post(`/client/`, {
    //         ...this.clientCopy
    //       });
    //       window.location.reload(true);

    //       this.$emit("updated");
    //       await this.getAll();
    //     }
    //   });
    // },
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
            `/livreur/update/${this.livreur._id}`,
            {
              ...this.livreurCopy
            }
          );
          window.location.reload(true);

          this.$emit("updated");
        }
      });
    },
    onCancel() {
      this.$emit("closeDialog");
    }
  },
  mounted() {
    this.livreurCopy = { ...this.livreur };
  }
};
</script>
<style scoped>
.mydialog {
  width: 700px;
  padding: 25px;
  height: 600px;
  background: rgb(32, 29, 29);
}
</style>
