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
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>{{ model.name }}</v-toolbar-title>
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
  mounted () {
    axios
      .get('http://localhost:4000/api/authors/' + this.$route.params.id)
      .then(response => {
        console.log('batata')
        console.log(response.data)
        this.model = response.data.data
      })
      .catch(errors => console.log(errors))
  },
  methods: {
    editAuthor () {
      this.$router.push({
        name: 'Edit Author',
        params: { id: this.model._id }
      })
    },
    deleteAuthor () {
      axios
        .delete('http://localhost:4000/api/authors/' + this.model._id)
        .then(
          this.$router.push({
            name: 'Authors'
          })
        )
    }
  }
}
</script>
