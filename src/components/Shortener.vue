<template>
  <v-card flat>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Shorten link with <a href="https://lc.cx/">lc.cx</a></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular
        indeterminate
        v-if="working"
        color="white"
      ></v-progress-circular>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid" @keyup.enter="shorten()">
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
          <template v-slot:activator="{ attrs }">
            <v-text-field
              id="shortlink"
              ref="shortlink"
              label="ShortLink"
              :prepend-icon="shortlink ? 'mdi-qrcode-scan' : 'mdi-link'"
              type="text"
              v-model="shortlink"
              :append-icon="shortlink ? 'mdi-content-copy' : ''"
              @click:append="copylink"
              @click:prepend="shortlink ? (dialog = true) : {}"
              v-bind="attrs"
              readonly
            ></v-text-field>
          </template>
          <span>Copied!</span>
        </v-tooltip>
        <v-container dense>
          <v-row dense>
            <v-col>
              <v-switch
                class="mb-2"
                v-model="advanced"
                label="Advanced settings"
              />
            </v-col>
            <v-col>
              <v-scroll-x-reverse-transition>
                <v-text-field
                  label="Custom URL"
                  v-model="custom"
                  :rules="customURLRules"
                  v-if="advanced"
                ></v-text-field>
              </v-scroll-x-reverse-transition>
            </v-col>
            <v-col>
              <v-scroll-x-reverse-transition>
                <v-text-field
                  label="Note"
                  v-model="note"
                  v-show="advanced"
                ></v-text-field>
              </v-scroll-x-reverse-transition>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-alert
        class="my-auto"
        dense
        transition="fade-transition"
        :model-value="alert.show"
        :type="alert.type"
        >{{ alert.message }}</v-alert
      >
      <v-spacer></v-spacer>
      <v-btn :disabled="!valid" color="primary" @click="shorten()" large>Shorten</v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" max-width="290">
      <v-card flat>
        <v-toolbar color="secondary" dark flat>
          <v-toolbar-title>QR Code</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-row justify="center">
            <qrcode-vue :model-value="shortlink" size="150" level="M"></qrcode-vue>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import isURL from "validator/es/lib/isURL";

export default {
  name: "ShortenerDialog",
  components: {
    QrcodeVue,
  },
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
      advanced: false,
      working: false,
      dialog: false,
      link: "",
      note: "",
      custom: "",
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
      customURLRules: [(v) => ( /^\S*$/gi.test(v) ) || "No whitespace is allowed"],
    };
  },
  methods: {
    shorten() {
      if (!this.valid) {
        return;
      }
      this.working = true;
      this.axios
        .post("/api/shorten", {
          url: this.link,
          custom: this.custom,
          note: this.note,
        })
        .then((response) => {
          this.working = false;
          if (response.data.success) {
            this.shortlink = response.data.shorturl;
            this.notify("Done");
          } else {
            this.notify("Error: " + response.data.message, "error");
          }
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
