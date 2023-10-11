<script setup async>
import axios from "axios";
import { ref, defineProps, defineAsyncComponent } from "vue";
const Item = defineAsyncComponent(() => import("../components/Item.vue"));
const Search = defineAsyncComponent(() => import("../components/Search.vue"));
const AddCard = defineAsyncComponent(() => import("../components/AddCard.vue"));

const props = defineProps({
  endpoint: String,
  required: true,
});
const { endpoint } = props;

// declare items in setup so they're available in the dom right away
let items = await axios
  .get(endpoint)
  .then(({ data }) => data)
  .catch((err) => console.log("err", err.response));

// filter list of rendered items
let filteredItems = ref(items);
const filterItems = (props) => {
  filteredItems.value = items.filter((filteredItem) => {
    let lowercaseTitle = filteredItem.title?.toLowerCase();
    let lowercaseName = filteredItem.name?.toLowerCase();
    let lowercaseTopic = filteredItem.topic?.toLowerCase();
    if (
      lowercaseTitle?.includes(props.searchText) ||
      lowercaseName?.includes(props.searchText) ||
      lowercaseTopic?.includes(props.searchText)
    ) {
      return true;
    } else {
      false;
    }
  });
};
</script>
<template>
  <Search
    label="Search Database..."
    :items="items"
    :endpoint="endpoint"
    @searchQuery="(props) => filterItems(props)"
  />
  <v-infinite-scroll height="400" @load="load">
    <div class="listWrapper">
      <AddCard :endpoint="endpoint" />
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
}
</style>
