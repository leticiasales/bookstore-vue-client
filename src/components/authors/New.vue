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
          <v-form @submit.prevent="save">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>{{ model._id ? 'Edit Author' : 'New Author' }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="model.name"
                label="Name"
                type="text"
                required
              ></v-text-field>
              <v-textarea
                v-model="model.about"
                label="About"
                rows="2"
                counter="300"
                auto-grow
                required
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" type="submit">Create</v-btn>
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
  name: 'AuthorsNew',
  components: {},
  data () {
    return {
      loading: false,
      model: {
        movies: []
      },
      movies: []
    }
  },
  mounted () {
    if (this.$route.params.id) {
      axios
        .get('http://localhost:4000/api/authors/' + this.$route.params.id)
        .then(response => (this.model = response.data))
        .catch(errors => console.log(errors))
    }
  },
  methods: {
    save () {
      const author = this.model
      if (this.$route.params.id) {
        // Post to server
        axios.put('http://localhost:4000/api/authors/' + this.$route.params.id, { author }).then(res => {
          // Post a status message
          this.loading = true
          if (res.status === 200) {
            // now send the user to the next route
            this.$router.push({
              name: 'Author',
              params: {
                id: res.data._id
              }
            })
          } else {
            this.status = res.data.message
          }
        })
      } else {
        // Post to server
        axios.post('http://localhost:4000/api/authors', { author }).then(res => {
          // Post a status message
          this.loading = true
          if (res.status === 201) {
            // now send the user to the next route
            this.$router.push({
              name: 'Author',
              params: {
                id: res.data.data.id
              }
            })
          } else {
            this.status = res.data.message
          }
        })
      }
    }
  }
}
</script>
