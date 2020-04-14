<template>
  <v-container
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <v-btn
          depressed
          small
          color="primary"
          @click.prevent="newCategory()"
        >
          New Category
        </v-btn>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" :key="category.id">
                <td>{{ category.name }}</td>
                <td>
                  <v-btn class="ma-2" text icon @click.prevent="showCategory(category.id)" color="primary">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" text icon @click.prevent="editCategory(category.id)" color="teal">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" text icon @click.prevent="deleteCategory(category.id)" color="red darken-2">
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
  name: 'CategoriesIndex',
  components: {},
  data () {
    return {
      loading: true,
      fields: [{ key: 'name' }, { key: 'actions' }],
      categories: []
    }
  },
  beforeMount () {
    this.getCategories()
  },
  methods: {
    showCategory (id) {
      this.$router.push({
        name: 'Category',
        params: { id: id }
      })
    },
    newCategory () {
      this.$router.push({
        name: 'New Category'
      })
    },
    editCategory (id) {
      this.$router.push({
        name: 'Edit Category',
        params: { id: id }
      })
    },
    deleteCategory (id) {
      this.loading = true
      axios
        .delete('http://localhost:4000/api/categories/' + id)
        .then(response => this.getCategories())
        .catch(err => console.log(err))
    },
    getCategories () {
      axios
        .get('http://localhost:4000/api/categories')
        .then(response => {
          this.categories = response.data.data
          this.loading = false
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
