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
  book: Object,
  item: Object,
  endpoint: String,
});

const { book, endpoint } = props;

const authors = await axios
  .get("/api/authors")
  .then(({ data }) => data)
  .catch((err) => console.log("err", err.response));
console.log("authors", authors);
console.log("book", book);
</script>
<template>
  <v-col cols="12" sm="6" md="6">
    <v-text-field
      @change="(e) => (book.title = e.target.value)"
      label="Title*"
      v-model="book.title"
      required
    ></v-text-field>
  </v-col>
  <v-col cols="12" sm="6" md="6">
    <v-combobox
      chips
      multiple
      label="Authors"
      :items="authors"
      auto-select-first
      v-model="book.authors"
      return-object
      item-title="name"
      required
    ></v-combobox>
  </v-col>
  <v-col cols="12" sm="6" md="6">
    <v-combobox
      label="Topic*"
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
      auto-select-first
      v-model="book.topic"
      required
    ></v-combobox>
  </v-col>
  <v-col cols="12" sm="6" md="6">
    <v-text-field
      label="Location*"
      hint="Example: Bookshelf 1, Box 2, etc.."
      v-model="book.location"
      @change="(e) => (book.location = e.target.value)"
    ></v-text-field>
  </v-col>
</template>
