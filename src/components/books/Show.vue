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
          <v-toolbar
            v-if="admin"
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
            <v-spacer/>
            <v-btn
              icon
              large
              @click.prevent="editBook(model.id)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              large
              @click.prevent="deleteBook(model.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-title>
            <h2 class="display-1">{{ model.name }}</h2>
            <v-spacer></v-spacer>
            <span class="title">{{ model.price | currency }}</span>
          </v-card-title>

          <v-card-subtitle>
            <span v-for="(author, i) in model.authors" :key="author.id">
              {{ author.name }}{{ (i + 1) < model.authors.length ? ", " : "" }}
            </span>
          </v-card-subtitle>

          <v-card-text class="d-flex">
            {{ model.summary }}
            <v-spacer></v-spacer>
            <v-list-item-avatar
              tile
              size="80"
              color="grey"
              height="auto"
            >
              <v-img :src="model.cover_url"/>
            </v-list-item-avatar>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <v-chip v-for="category in model.categories" :key="category.id" class="mr-1">
              {{ category.name }}
            </v-chip>
          </v-card-text>

          <v-card-actions>
            <v-btn
              block
              class="white--text"
              color="primary"
            >
              Add to Cart
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
  name: 'BooksShow',
  components: {},
  data () {
    return {
      model: {
        name: 'Title',
        cover_url: 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg',
        summary: 'Bla bla bla. This is the book\'s summary.',
        price: 19.9
      },
      admin: true
    }
  },
  beforeMount () {
    axios
      .get('http://localhost:4000/api/books/' + this.$route.params.id)
      .then(response => (this.model = response.data.data))
      .catch(errors => console.log(errors))
  },
  methods: {
    editBook () {
      this.$router.push({
        name: 'Edit Book',
        params: { id: this.model.id }
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
