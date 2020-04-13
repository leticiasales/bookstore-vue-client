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
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">About</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="author in authors" :key="author.id">
                <td>{{ author.name }}</td>
                <td>
                  <span
                    class="d-inline-block text-truncate"
                    style="max-width: 250px;"
                  >{{ author.about }}</span>
                </td>
                <td>
                  <v-btn class="ma-2" text icon @click.prevent="showAuthor(author.id)" color="teal">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" text icon @click.prevent="editAuthor(author.id)" color="amber">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" text icon @click.prevent="deleteAuthor(author.id)" color="red darken-2">
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
  name: 'AuthorsIndex',
  components: {},
  data () {
    return {
      loading: true,
      fields: [{ key: 'name' }, { key: 'actions' }],
      authors: []
    }
  },
  mounted () {
    this.setAuthors()
  },
  methods: {
    showAuthor (id) {
      this.$router.push({
        name: 'Author',
        params: { id: id }
      })
    },
    editAuthor (id) {
      this.$router.push({
        name: 'Edit Author',
        params: { id: id }
      })
    },
    deleteAuthor (id) {
      axios
        .delete('http://localhost:4000/api/authors/' + id)
        .then(this.setAuthors())
    },
    setAuthors () {
      this.loading = true
      axios
        .get('http://localhost:4000/api/authors')
        .then(response => {
          this.authors = response.data.data
          this.loading = false
        })
    }
  }
}
</script>
