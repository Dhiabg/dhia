<template>
  <q-card class="mydialog">
    <q-form
      class="q-pa-md bg-white text-black"
      @submit="creerLivreur()"
      @reset="onCancel()"
      ref="myForm"
    >
      <br />
      <label class="title2">
        Formulaire livreur
      </label>
      <q-separator style="width:550px;" color="black" />

      <br />
      <br />
      <q-item>
        <q-item-section>
          <label class="title"> Nom et Prénom :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            style="width:160px"
            color="secondary"
            v-model="livreurCopy.nom"
            label="Nom"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
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
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            color="secondary"
            style="width:160px;margin-left:-40px"
            v-model="livreurCopy.prenom"
            label="Prénom"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
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
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Date de naissance :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            v-model="livreurCopy.date_naissance"
            type="date"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
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
        </q-item-section>
      </q-item>
      <!-- date -->
      <q-item>
        <q-item-section>
          <label class="title"> Sexe :</label>
        </q-item-section>
        <q-item-section>
          <q-select
            style="margin-left:-105px;width:330px"
            label="Genre"
            dense
            outlined
            color="secondary"
            v-model="livreurCopy.genre"
            :options="genreOptions"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="wc"
                />
              </div>
            </template>
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Email :</label>
        </q-item-section>
        <q-item-section>
          <br />
          <q-input
            outlined
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            type="email"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
            v-model="livreurCopy.email"
            label=""
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="mail"
                />
                Email
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Mot de passe :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
            v-model="livreurCopy.password"
            label="****************************"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="edit"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Confirmer mot de passe :</label>
        </q-item-section>
        <q-item-section>
          <br />
          <q-input
            outlined
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
            v-model="confirmPassword"
            label="****************************"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="edit"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Adresse :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            color="secondary"
            style="width:160px"
            v-model="livreurCopy.rue"
            label="Rue"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="home"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            color="secondary"
            style="width:160px;margin-left:-40px"
            v-model="livreurCopy.code_postal"
            label="Code postal"
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
      <q-input
        outlined
        dense
        style="margin-left:225px;width:330px"
        color="secondary"
        v-model="livreurCopy.ville"
        label="Ville"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="home" />
          </div>
        </template>
      </q-input>
      <q-item>
        <q-item-section>
          <label class="title"> Numéro téléphone :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            color="secondary"
            mask="## ### ###"
            unmasked-value
            style="margin-left:-105px;width:330px"
            v-model="livreurCopy.telephone"
            label=""
            lazy-rules
            :rules="[val => (val && val.length === 8) || 'Champ vide !!']"
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="phone"
                />
                ## ### ###
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title">Etat livreur : </label>
        </q-item-section>
        <q-item-section>
          <q-select
            label="Etat"
            dense
            outlined
            style="margin-left:-105px;width:330px"
            color="secondary"
            v-model="livreurCopy.etat"
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
          v-if="!this.livreur"
          label="Ajouter"
          type="submit"
          icon-right="assignment_turned_in"
          style="margin-right: 15px"
          glossy
          color="blue-10"
        />

        <q-btn
          v-if="this.livreur"
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
  props: ["livreur"],
  data() {
    return {
      genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],
      livreurCopy: {},
      isPwd: true,
      confirmPassword: null,
      selectedCopy: {}
    };
  },

  methods: {
    async creerLivreur() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          if (this.livreurCopy.password != this.confirmPassword) {
            return this.$q.notify({
              color: "red",
              message: "Confirmez le mot de passe"
            });
          } else if (this.livreurCopy.password === this.confirmPassword) {
            try {
              let response = await this.$axios.post(
                "/livreur/register",
                this.livreurCopy
              );
              console.log(response);
              // let token = response.data.token;
              // if (token) {
              //   localStorage.setItem("jwt", token);
              //this.$router.push("/");
              console.log("succes");
              return (
                this.$q.notify({
                  color: "warning",
                  message: "succes, livreur créer"
                }),
                // this.$router.push("/login")
                window.location.reload(true)
              );
            } catch {
              return this.$q.notify({
                color: "red",
                message: "Email deja utilisé"
              });
            }
          }
        }
      });
    },
    async onAdd() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          let res = await this.$axios.post(`/livreur/register`, {
            ...this.livreurCopy
          });
          window.location.reload(true);

          this.$emit("updated");
          await this.getAll();
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
  min-width: 740px;
  padding: 20px;
  height: 780px;
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
