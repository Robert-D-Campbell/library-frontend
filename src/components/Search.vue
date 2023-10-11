<script setup>
import { ref, defineProps } from "vue";

const emit = defineEmits(["searchQuery"]);

const props = defineProps({
  author: Object,
  book: Object,
  label: String,
  items: Array,
  addMultiple: Boolean,
  endpoint: String,
});
const { author, book, endpoint, items } = props;

const itemEntry = endpoint === "/api/books" ? "title" : "name";

let searchValue = ref();
const customFilter = (itemTitle, queryText, item) => {
  const nameAndTitle = item.raw.name
    ? item.raw.name.toLowerCase()
    : item.raw.title.toLowerCase();
  const authorsAndBooks = item.raw.books
    ? item.raw.books.map(({ title }) => title)
    : item.raw.authors.map(({ name }) => name);
  const topic = item.raw.topic?.toLowerCase();
  const searchText = queryText.toLowerCase();
  emit("searchQuery", { searchText });

  return (
    nameAndTitle.indexOf(searchText) > -1 ||
    authorsAndBooks.indexOf(searchText) > -1 ||
    topic.indexOf(searchText) > -1
  );
};
</script>
<template>
  <v-combobox
    :multiple="addMultiple"
    clearable
    :label="label"
    :items="items"
    :custom-filter="customFilter"
    variant="solo-filled"
    :item-title="itemEntry"
    :item-value="itemEntry"
    return-object
    :chips="addMultiple"
    :closable-chips="addMultiple"
    auto-select-first
    :v-model="
      label === 'Authors'
        ? author?.books
        : label === 'Authors'
        ? book?.authors
        : searchValue
    "
  ></v-combobox>
</template>
