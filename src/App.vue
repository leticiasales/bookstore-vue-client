<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="primary"
    >
    <v-toolbar-title>
      <router-link :to="{'path': '/'}">
        <v-btn text dark class="d-flex align-center">
          <span>Bookstore</span>
        </v-btn>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link :to="{'name': 'Authors'}" v-if="this.$store.state.admin">
      <v-btn text dark class="mr-1">
        Authors
      </v-btn>
    </router-link>
    <router-link :to="{'name': 'Categories'}" v-if="this.$store.state.admin">
      <v-btn text dark class="mr-1">
        Categories
      </v-btn>
    </router-link>
    <router-link :to="{'name': 'Books'}" v-if="this.$store.state.admin">
      <v-btn text dark class="mr-1">
        Books
      </v-btn>
    </router-link>
    <router-link :to="{'name': 'Cart'}">
      <v-btn text dark class="mr-1">
        Cart
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
  name: 'app'
}
</script>
