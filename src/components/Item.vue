<script setup async>
import axios from "axios";
import { defineProps } from "vue";
import { defineAsyncComponent } from "vue";
const Modal = defineAsyncComponent(() => import("../components/Modal.vue"));

const props = defineProps({
  item: Object,
  endpoint: String,
});

const { item, endpoint } = props;
console.log("item._id", item._id);

const deleteItem = async () => {
  await axios
    .delete(`${endpoint}/${item._id}`)
    .then(({ data }) => data)
    .catch((err) => console.log("err", err.response));
};
</script>

<template>
  <v-card class="ma-1" max-width="300" height="max-content">
    <v-img
      class="align-end text-white"
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
      <v-card-title>{{ item.name || item.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4" v-if="endpoint === '/api/books'">
      {{ `${item.authors.length} Authors` }}
    </v-card-subtitle>
    <v-card-subtitle class="pt-4" v-else>
      {{ `${item.books.length} Books` }}
    </v-card-subtitle>

    <v-card-text>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </v-card-text>

    <v-card-actions>
      <Modal :item="item" verbiage="Edit" />
      <v-row justify="center">
        <v-btn color="primary" variant="text" @click="deleteItem">
          Delete
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-row {
  margin: 0;
}
</style>
