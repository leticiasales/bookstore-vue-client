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
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-btn
              icon
              large
              @click.prevent="indexAuthors()"
            >
              <v-icon>mdi-table-of-contents</v-icon>
            </v-btn>
            <v-toolbar-title>{{ model.name }}</v-toolbar-title>
            <v-spacer/>
            <v-btn
              icon
              large
              @click.prevent="editAuthor(model.id)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              large
              @click.prevent="deleteAuthor(model.id)"
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
  name: 'AuthorsShow',
  components: {},
  data () {
    return {
      model: {}
    }
  },
  beforeMount () {
    axios
      .get('http://localhost:4000/api/authors/' + this.$route.params.id)
      .then(response => (this.model = response.data.data))
      .catch(errors => console.log(errors))
  },
  methods: {
    editAuthor () {
      this.$router.push({
        name: 'Edit Author',
        params: { id: this.model.id }
      })
    },
    deleteAuthor () {
      axios
        .delete('http://localhost:4000/api/authors/' + this.model.id)
        .then(
          this.$router.push({
            name: 'Authors'
          })
        )
    },
    indexAuthors () {
      this.$router.push({
        name: 'Authors'
      })
    }
  }
}
</script>
