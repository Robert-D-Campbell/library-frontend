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
  endpoint: String,
  required: true,
});

const { endpoint } = props;

const books = await axios
  .get("/api/books")
  .then(({ data }) => data)
  .catch((err) => console.log("err", err.response));
console.log("books", books);
</script>
<template>
  <v-col cols="12" sm="6" md="6">
    <v-text-field
      :label="`${endpoint === '/api/books' ? 'Title*' : 'Name*'}`"
      required
    ></v-text-field>
  </v-col>
  <v-col cols="12" sm="6" md="6">
    <Search
      label="Books"
      :items="books"
      endpoint="/api/books"
      @searchQuery="(props) => filterItems(props)"
    />
  </v-col>
  <v-col cols="12" sm="6" md="6">
    <v-text-field
      label="Legal middle name"
      hint="example of helper text only on focus"
    ></v-text-field>
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
</template>
