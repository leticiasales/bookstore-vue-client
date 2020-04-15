<template>
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
      >
        <v-card
          class="mx-auto"
        >
          <v-list
            v-if="$store.state.cart.length > 0"
            two-line
          >
            <template v-for="(item, index) in $store.state.cart">
              <v-list-item>
                <v-list-item-avatar class="mr-2">
                  <v-img :src="item.cover_url"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="d-flex">
                    {{ item.name }}
                    <v-spacer></v-spacer>
                    {{ item.price | currency }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <span v-for="(author, i) in item.authors" :key="author.id">
                      {{ author.name }}{{ (i + 1) < item.authors.length ? ", " : "" }}
                    </span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-btn icon class="ml-2" @click="removeFromCart(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item>
              <v-divider v-if="index < $store.state.cart.length - 1"></v-divider>
            </template>
          </v-list>
          <v-card-title v-else>
              Cart is empty
          </v-card-title>
          <div class="text-right">
            <v-divider></v-divider>
            <v-btn text disabled color="black">
              {{ totalPrice | currency }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CartShow',
  components: {},
  data () {
    return {
      totalPrice: this.$store.state.cart.reduce((a, b) => a + b.price, 0)
    }
  },
  watch: {
    '$store.state.cart': function() {
      this.totalPrice = this.$store.state.cart.reduce((a, b) => a + b.price, 0)
    }
  },
  methods: {
    removeFromCart (item) {
      this.$store.commit('removeFromCart', item)
      this.$store.commit('saveCart')
    }
  }
}
</script>
