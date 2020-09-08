<template>
 <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <Shortener token=""/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Shortener from './components/Shortener';

export default {
  name: 'App',

  components: {
    Shortener,
  },

  data: () => ({
    //
  }),
};
</script>
