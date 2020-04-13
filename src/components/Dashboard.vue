<template>
   <v-container fluid>
      <v-row dense>
        <v-col
          v-for="book in books"
          :key="book.id"
          :cols="4"
        >
          <v-card class="mr-2">
            <v-img
              :src="book.cover_url"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="book.name"></v-card-title>
            </v-img>

            <v-card-actions>
              <span>{{ book.price }}</span>

              <v-spacer></v-spacer>

              <v-btn text flat @click.prevent="showBook(book.id)" color="primary">
                See more
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Dashboard',
  components: {},
  data () {
    return {
      books: []
    }
  },
  beforeMount () {
    axios
      .get('http://localhost:4000/api/books/')
      .then(response => (this.books = response.data.data))
      .catch(errors => console.log(errors))
  },
  methods: {
    showBook (id) {
      this.$router.push({
        name: 'Book',
        params: { id: id }
      })
    }
  }
}
</script>
