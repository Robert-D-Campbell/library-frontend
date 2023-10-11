<script setup async>
import axios from "axios";
import { ref, defineProps } from "vue";
import { defineAsyncComponent } from "vue";
const Item = defineAsyncComponent(() => import("../components/Item.vue"));
const Search = defineAsyncComponent(() => import("../components/Search.vue"));
const BookForm = defineAsyncComponent(() =>
  import("../components/forms/BookForm.vue")
);
const AuthorForm = defineAsyncComponent(() =>
  import("../components/forms/AuthorForm.vue")
);
const emit = defineEmits(["refetch"]);

const props = defineProps({
  item: Object,
  endpoint: String,
  verbiage: String,
});

const { item, endpoint, verbiage } = props;

let dialog = ref(false);

let book = ref({
  title: item ? item?.title : "",
  topic: item ? item?.topic : "",
  authors: item ? item?.authors : [],
  location: item ? item?.location : "",
});
let author = ref({
  name: item ? item?.name : "",
  books: item ? item?.books : [],
});

const save = async () => {
  if (verbiage === "Create") {
    endpoint === "/api/authors"
      ? await axios
          .post(`${endpoint}/create`, {
            name: author.value.name,
            books: author.value.books !== [] && author.value.books,
          })
          .then(({ data }) => data)
          .catch((err) => console.log("err", err.response))
      : await axios
          .post(`${endpoint}/create`, {
            title: book.value.title,
            authors: book.value.books !== [] && book.value.authors,
            topic: book.value.topic,
            location: book.value.location,
          })
          .then(({ data }) => data)
          .catch((err) => console.log("err", err.response));
  } else {
    endpoint === "/api/authors"
      ? await axios
          .patch(`${endpoint}/${item._id}`, {
            name: author.value.name,
            books: author.value.books !== [] && author.value.books,
          })
          .then(({ data }) => data)
          .catch((err) => console.log("err", err.response))
      : await axios
          .patch(`${endpoint}/${item._id}`, {
            title: book.value.title,
            authors: book.value.books !== [] && book.value.authors,
            topic: book.value.topic,
            location: book.value.location,
          })
          .then(({ data }) => data)
          .catch((err) => console.log("err", err.response));
  }
  dialog.value = false;
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="600">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          {{ verbiage }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5"
            >{{ verbiage }}
            {{
              endpoint === "/api/books" && verbiage === "Create"
                ? "a new book"
                : endpoint === "/api/authors" && verbiage === "Create"
                ? "a new author"
                : null
            }}
            {{ item?.name || item?.title }}</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-if="endpoint === '/api/books'">
              <BookForm :item="item" :endpoint="endpoint" :book="book" />
            </v-row>
            <v-row v-else>
              <AuthorForm :item="item" :endpoint="endpoint" :author="author" />
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
