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
        md="6"
      >
        <v-card class="elevation-12">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="model.cover_url"
          >
            <v-card-title>Top 10 Australian beaches</v-card-title>
          </v-img>
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
            <v-toolbar-title>{{ model.name }}</v-toolbar-title>
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
          <v-card-text>
            {{ model.about }}
          </v-card-text>
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
      model: {}
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
