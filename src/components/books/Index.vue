<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <v-btn
          icon
          large
          color="red"
          @click.prevent="newBook()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Summary</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book.id">
                <td>{{ book.name }}</td>
                <td>
                  <span
                    class="d-inline-block text-truncate"
                    style="max-width: 250px;"
                  >{{ book.summary }}</span>
                </td>
                <td>
                  <v-btn class="ma-2" text icon @click.prevent="showBook(book.id)" color="primary">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" text icon @click.prevent="editBook(book.id)" color="teal">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" text icon @click.prevent="deleteBook(book.id)" color="red darken-2">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BooksIndex',
  components: {},
  data () {
    return {
      loading: true,
      fields: [{ key: 'name' }, { key: 'actions' }],
      books: []
    }
  },
  beforeMount () {
    this.getBooks()
  },
  methods: {
    showBook (id) {
      this.$router.push({
        name: 'Book',
        params: { id: id }
      })
    },
    newBook () {
      this.$router.push({
        name: 'New Book'
      })
    },
    editBook (id) {
      this.$router.push({
        name: 'Edit Book',
        params: { id: id }
      })
    },
    deleteBook (id) {
      this.loading = true
      axios
        .delete('http://localhost:4000/api/books/' + id)
        .then(response => this.getBooks())
        .catch(err => console.log(err))
    },
    getBooks () {
      axios
        .get('http://localhost:4000/api/books')
        .then(response => {
          this.books = response.data.data
          this.loading = false
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
