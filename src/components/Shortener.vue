<template>
  <v-card>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Shorten link with lc.cx</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn href icon large target="_blank" v-on="on">
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>
        </template>
        <span>Source</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-text>
      <v-form @keyup.native.enter="shorten()">
        <v-text-field label="Link" name="link" prepend-icon="mdi-link" type="text" v-model="link"></v-text-field>
        <v-text-field
          id="shortlink"
          label="ShortLink"
          name="shortlink"
          prepend-icon="mdi-link"
          type="text"
          v-model="shortlink"
          append-icon="mdi-content-copy"
          @click:append="copylink"
          readonly
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="shorten()">Shorten</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    token: String
  },
  data() {
    return {
      link: "",
      shortlink: ""
    };
  },
  methods: {
    shorten() {
      this.axios.get('/api/shorten?url='+this.link)
      .then((response) => {
        this.shortlink = response.data;
      });
    },
    copylink() {
      
    }
  }
};
</script>
