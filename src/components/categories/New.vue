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
              <v-btn
                icon
                large
                @click.prevent="indexCategories()"
              >
                <v-icon>mdi-table-of-contents</v-icon>
              </v-btn>
              <v-toolbar-title>{{ model.id ? 'Edit Category' : 'New Category' }}</v-toolbar-title>
            <v-spacer/>
            <v-btn
              icon
              large
              v-if="model.id"
              @click.prevent="showCategory(model.id)"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn
              icon
              large
              v-if="model.id"
              @click.prevent="deleteCategory(model.id)"
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
  name: 'CategoriesNew',
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
        .get('http://localhost:4000/api/categories/' + this.$route.params.id)
        .then(response => (this.model = response.data.data))
        .catch(errors => console.log(errors))
    }
  },
  methods: {
    save () {
      const category = this.model
      if (this.$route.params.id) {
        // Post to server
        axios.put('http://localhost:4000/api/categories/' + this.$route.params.id, { category }).then(res => {
          // Post a status message
          this.loading = true
          if (res.status === 200) {
            // now send the user to the next route
            this.$router.push({
              name: 'Category',
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
        axios.post('http://localhost:4000/api/categories', { category }).then(res => {
          // Post a status message
          this.loading = true
          if (res.status === 201) {
            // now send the user to the next route
            this.$router.push({
              name: 'Category',
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
    showCategory () {
      this.$router.push({
        name: 'Category',
        id: this.model.id
      })
    },
    deleteCategory () {
      axios
        .delete('http://localhost:4000/api/categories/' + this.model.id)
        .then(
          this.$router.push({
            name: 'Categories'
          })
        )
    },
    indexCategories () {
      this.$router.push({
        name: 'Categories'
      })
    }
  }
}
</script>
