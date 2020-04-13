<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="primary"
    >
    <v-toolbar-title>
      <v-btn text icon href="/" dark>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <span class="white--text">Bookstore</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link :to="{'name': 'Authors'}">
      <v-btn text dark class="mr-1">
        Authors
      </v-btn>
    </router-link>
    <router-link :to="{'name': 'Categories'}">
      <v-btn text dark class="mr-1">
        Categories
      </v-btn>
    </router-link>
    </v-app-bar>
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
      admin: true
    }
  }
}
</script>
