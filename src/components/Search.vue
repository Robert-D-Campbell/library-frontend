<script setup>
import { defineProps } from "vue";
const emit = defineEmits(["searchQuery"]);

const props = defineProps({
  label: String,
  items: Array,
  endpoint: String,
});

const { endpoint, items } = props;
const itemEntry = endpoint === "/api/books" ? "title" : "name";

const customFilter = (itemTitle, queryText, item) => {
  const nameAndTitle = item.raw.name
    ? item.raw.name.toLowerCase()
    : item.raw.title.toLowerCase();
  //   const topic = item.raw.topic.toLowerCase();;
  const authorsAndBooks = item.raw.books
    ? item.raw.books.map(({ title }) => title)
    : item.raw.authors.map(({ name }) => name);
  //   const authorsAndBooks = item.raw.books.map(({ title }) => title);
  const searchText = queryText.toLowerCase();

  emit("searchQuery", {
    itemTitle,
    nameAndTitle,
    authorsAndBooks,
    searchText,
    item,
  });

  return (
    nameAndTitle.indexOf(searchText) > -1 ||
    authorsAndBooks.indexOf(searchText) > -1
  );
};
</script>
<template>
  <v-autocomplete
    clearable
    :label="label"
    :items="items"
    :custom-filter="customFilter"
    variant="solo-filled"
    :item-title="itemEntry"
    :item-value="itemEntry"
  ></v-autocomplete>
</template>
