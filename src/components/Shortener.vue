<template>
  <v-card flat>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Shorten link with lc.cx</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular
      indeterminate
      v-if="working"
      color="white"
    ></v-progress-circular>

      <v-alert
        class="my-auto"
        dense
        transition="fade-transition"
        :value="alert.show"
        :type="alert.type"
      >{{alert.message}}</v-alert>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid" @keyup.native.enter="shorten()">
        <v-text-field
          required
          :rules="shortRules"
          label="Link"
          name="link"
          prepend-icon="mdi-link"
          type="text"
          v-model="link"
        ></v-text-field>
        
        <v-tooltip bottom v-model="tooltip.show">
          <template v-slot:activator="{attrs}">
            <v-text-field
              id="shortlink"
              label="ShortLink"
              prepend-icon="mdi-link"
              type="text"
              v-model="shortlink"
              append-icon="mdi-content-copy"
              @click:append="copylink"
              v-bind="attrs"
              readonly
            ></v-text-field>
          </template>
          <span>Copied!</span>
        </v-tooltip>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="!valid" color="primary" @click="shorten()" large>Shorten</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import isURL from "validator/es/lib/isURL";

export default {
  props: {
    token: String,
  },
  data() {
    return {
      alert: {
        show: false,
        type: "success",
        fadetime: 2500,
      },
      tooltip: {
        show: false,
      },
      working: false,
      link: "",
      shortlink: "",
      valid: true,
      shortRules: [
        (v) => !!v || "Link is required",
        (v) =>
          isURL(v, {
            protocols: ["http", "https"],
            require_tld: false,
            require_protocol: false,
            require_host: true,
            require_valid_protocol: true,
            allow_underscores: false,
            host_whitelist: false,
            host_blacklist: false,
            allow_trailing_dot: false,
            allow_protocol_relative_urls: false,
            disallow_auth: false,
          }) || "A valid URL is required",
      ],
    };
  },
  methods: {
    shorten() {
      this.working = true;
      this.axios.get("/api/shorten?url=" + this.link).then((response) => {
        this.working = false;
        this.shortlink = response.data;
        this.notify("Done");
      });
    },
    notify(message, type = "success") {
      this.alert.type = type;
      this.alert.message = message;
      this.alert.show = true;
      window.setTimeout(() => {
        this.alert.show = false;
      }, this.alert.fadetime);
    },
    copylink() {
      let self = this;
      navigator.clipboard.writeText(this.shortlink).then(
        function () {
          self.tooltip.show = true;
          window.setTimeout(() => {
            self.tooltip.show = false;
          }, self.alert.fadetime);
        },
        function () {
          /* clipboard write failed */
        }
      );
    },
  },
};
</script>
