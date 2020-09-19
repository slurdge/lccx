<template>
  <v-card>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Shorten link</v-toolbar-title>
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
    <!--
    <v-card-text>
      <v-form>
        <v-text-field label="Link" name="link" prepend-icon="mdi-link" type="text" v-model="link"></v-text-field>

        <v-text-field
          id="shortlink"
          label="ShortLink"
          name="shortlink"
          prepend-icon="mdi-link"
          type="text"
          readonly
        ></v-text-field>
      </v-form>
    </v-card-text>
    -->
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
      link: ""
    };
  },
  methods: {
    shorten() {
      console.log(this.token);
      var data = JSON.stringify({"destination":"https://www.google.com","custom_path":"custom_path","domain":"00000000-0000-0000-0000-000000000000","tags":["6762494c-4ff9-4c93-840d-fa00a2c6ad63"],"note":"Lorem ipsum dolor sit ametr"});

var config = {
  method: 'post',
  url: 'https://api.lc.cx/v1/shorten',
  headers: { 
    'Content-Type': 'application/json', 
    'apikey': ''
  },
  data : data
};
console.log(config);
      this.axios.request(config)
        .then(function(response) {
          console.log(response);
          this.output = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      console.log(this.link);
    }
  }
};
</script>
