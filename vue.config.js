module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'URL shortener with lc.cx'
        }
    },

    transpileDependencies: [
      'vuetify'
    ],

    pluginOptions: {
      vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
    }
}
