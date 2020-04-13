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
              @click.prevent="indexCategories()"
            >
              <v-icon>mdi-table-of-contents</v-icon>
            </v-btn>
            <v-toolbar-title>{{ model.name }}</v-toolbar-title>
            <v-spacer/>
            <v-btn
              icon
              large
              @click.prevent="editCategory(model.id)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              large
              @click.prevent="deleteCategory(model.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CategoriesShow',
  components: {},
  data () {
    return {
      model: {}
    }
  },
  beforeMount () {
    axios
      .get('http://localhost:4000/api/categories/' + this.$route.params.id)
      .then(response => (this.model = response.data.data))
      .catch(errors => console.log(errors))
  },
  methods: {
    editCategory () {
      this.$router.push({
        name: 'Edit Category',
        params: { id: this.model.id }
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
