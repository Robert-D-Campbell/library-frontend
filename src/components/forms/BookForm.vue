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
  item: Object,
  endpoint: String,
});

const { endpoint } = props;

const authors = await axios
  .get("/api/authors")
  .then(({ data }) => data)
  .catch((err) => console.log("err", err.response));
console.log("authors", authors);
</script>
<template>
  <v-col cols="12" sm="6" md="6">
    <v-text-field label="Title*" required></v-text-field>
  </v-col>
  <v-col cols="12" sm="6" md="6">
    <Search
      label="Authors"
      :items="authors"
      endpoint="/api/authors"
      :addMultiple="true"
      @searchQuery="(props) => filterItems(props)"
    />
  </v-col>
  <v-col cols="12" sm="6" md="6">
    <v-select
      :items="[
        'Non-fiction',
        'Fiction',
        'Literature',
        'Mystery',
        'Fantasy',
        'Science fiction',
        'Short stories',
        'History',
        'Biography',
        'Adventure fiction',
        'Thriller',
        'Literary fiction',
        'Picture book',
        'Memoir',
        'Animals',
        'Coming-of-age story',
        'Young adult',
        'Fairy tale',
        'Autobiography',
      ]"
      label="Topic*"
      required
    ></v-select>
  </v-col>
  <v-col cols="12" sm="6" md="6">
    <v-text-field
      label="Location*"
      hint="Example: Bookshelf 1, Box 2, etc.."
    ></v-text-field>
  </v-col>
</template>
