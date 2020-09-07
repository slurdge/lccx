<template>
<v-card>
  <v-toolbar
    color="primary"
    dark
    flat
  >
    <v-toolbar-title>Shorten link</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          :href="source"
          icon
          large
          target="_blank"
          v-on="on"
        >
          <v-icon>mdi-code-tags</v-icon>
        </v-btn>
      </template>
      <span>Source</span>
    </v-tooltip>
  </v-toolbar>
  <v-card-text>
    <v-form>
      <v-text-field
        label="Link"
        name="link"
        prepend-icon="mdi-link"
        type="text"
      ></v-text-field>

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
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="primary">Login</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
  export default {
    props: {
      token: String,
    },
  }
</script>
