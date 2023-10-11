<script setup async>
import axios from "axios";
import { ref, computed, defineProps } from "vue";
import { defineAsyncComponent } from "vue";
const Item = defineAsyncComponent(() => import("../../components/Item.vue"));
const Search = defineAsyncComponent(() =>
  import("../../components/Search.vue")
);
const AddCard = defineAsyncComponent(() =>
  import("../../components/AddCard.vue")
);

const props = defineProps({
  author: Object,
  item: Object,
  endpoint: String,
});

const { author, endpoint } = props;

const books = await axios
  .get("/api/books")
  .then(({ data }) => data)
  .catch((err) => console.log("err", err.response));
console.log("author", author);
</script>
<template>
  <v-col cols="12" sm="6" md="6">
    <v-text-field
      label="Name*"
      required
      @change="(e) => (author.name = e.target.value)"
    ></v-text-field>
  </v-col>
  <v-col cols="12" sm="6" md="6">
    <Search
      label="Books"
      :items="books"
      endpoint="/api/books"
      :addMultiple="true"
      @searchQuery="(props) => filterItems(props)"
    />
  </v-col>
</template>
