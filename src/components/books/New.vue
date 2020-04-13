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
        <v-card class="elevation-12">
          <v-form @submit.prevent="save">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-btn
                icon
                large
                @click.prevent="indexBooks()"
              >
                <v-icon>mdi-table-of-contents</v-icon>
              </v-btn>
              <v-toolbar-title>{{ model.id ? 'Edit Book' : 'New Book' }}</v-toolbar-title>
            <v-spacer/>
            <v-btn
              icon
              large
              v-if="model.id"
              @click.prevent="showBook(model.id)"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn
              icon
              large
              v-if="model.id"
              @click.prevent="deleteBook(model.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="model.name"
                label="Name"
                type="text"
                required
              ></v-text-field>
              <v-autocomplete
                v-model="model.authors"
                :items="authors"
                chips
                label="Authors"
                item-text="name"
                item-value="name"
                multiple
              ></v-autocomplete>
              <v-textarea
                v-model="model.summary"
                label="Summary"
                rows="1"
                counter="300"
                auto-grow
                required
              ></v-textarea>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="model.price"
                    label="Price"
                    type="decimal"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="model.cover_url"
                    label="Cover image url"
                    type="url"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-autocomplete
                v-model="model.categories"
                :items="categories"
                chips
                label="Categories"
                item-text="name"
                item-value="name"
                multiple
              ></v-autocomplete>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" type="submit">{{ model.id ? 'Update' : 'Create' }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BooksNew',
  components: {},
  data () {
    return {
      loading: false,
      model: {
        categories: []
      },
      categories: [],
      authors: []
    }
  },

  mounted () {
    if (this.$route.params.id) {
      axios
        .get('http://localhost:4000/api/books/' + this.$route.params.id)
        .then(response => (this.model = response.data.data))
        .catch(errors => console.log(errors))
    }

    axios
      .get('http://localhost:4000/api/authors/')
      .then(response => (this.authors = response.data.data))
      .catch(errors => console.log(errors))

    axios
      .get('http://localhost:4000/api/categories/')
      .then(response => (this.categories = response.data.data))
      .catch(errors => console.log(errors))
  },
  methods: {
    save () {
      const book = this.model
      if (this.$route.params.id) {
        // Post to server
        axios.put('http://localhost:4000/api/books/' + this.$route.params.id, { book }).then(res => {
          // Post a status message
          this.loading = true
          if (res.status === 200) {
            // now send the user to the next route
            this.$router.push({
              name: 'Book',
              params: {
                id: res.data.data.id
              }
            })
          } else {
            this.status = res.data.message
          }
        })
      } else {
        // Post to server
        axios.post('http://localhost:4000/api/books', { book }).then(res => {
          // Post a status message
          this.loading = true
          if (res.status === 201) {
            // now send the user to the next route
            this.$router.push({
              name: 'Book',
              params: {
                id: res.data.data.id
              }
            })
          } else {
            this.status = res.data.message
          }
        })
      }
    },
    showBook () {
      this.$router.push({
        name: 'Book',
        id: this.model.id
      })
    },
    deleteBook () {
      axios
        .delete('http://localhost:4000/api/books/' + this.model.id)
        .then(
          this.$router.push({
            name: 'Books'
          })
        )
    },
    indexBooks () {
      this.$router.push({
        name: 'Books'
      })
    }
  }
}
</script>
