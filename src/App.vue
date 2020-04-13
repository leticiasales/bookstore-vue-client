<template>
  <v-app id="inspire">
    <v-content>
      <!-- routes will be rendered here -->
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      user: null
    }
  },
  methods: {
    login () {
      this.$auth.loginRedirect()
    },
    async refreshActiveUser () {
      this.user = {}
    },
    async logout () {
      this.user = null
      this.$router.push('/')
    }
  }
}
</script>
