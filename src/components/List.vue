<script setup async>
import axios from "axios";
import { ref, computed, defineProps } from "vue";
import { defineAsyncComponent } from "vue";
const Item = defineAsyncComponent(() => import("../components/Item.vue"));
const Search = defineAsyncComponent(() => import("../components/Search.vue"));

const props = defineProps({
  endpoint: String,
  required: true,
});

const { endpoint } = props;

const items = await axios
  .get(endpoint)
  .then(({ data }) => data)
  .catch((err) => console.log("err", err.response));

let query = null;
let filteredItems = ref(items);
const filterItems = (props) => {
  console.log("props", props);
  filteredItems.value = items.filter(
    (filteredItem) =>
      filteredItem.title?.includes(props.searchText) ||
      filteredItem.name?.includes(props.searchText)
  );
  console.log("filteredItems", filteredItems);
};
</script>
<template>
  <Search
    :items="items"
    :endpoint="endpoint"
    @searchQuery="(props) => filterItems(props)"
  />
  <v-infinite-scroll height="400" @load="load">
    <div class="listWrapper">
      <template v-for="(item, index) in filteredItems" :key="item._id">
        <Item :item="item" :endpoint="endpoint" />
      </template>
    </div>
    <template v-slot:empty>
      <v-alert type="warning">No more items!</v-alert>
    </template>
  </v-infinite-scroll>
</template>

<style scoped>
.listWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-content: center;
  width: 100vw;
  height: 100vh;
}
</style>
