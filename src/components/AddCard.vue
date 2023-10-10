<script setup async>
import axios from "axios";
import { defineProps } from "vue";
import { defineAsyncComponent } from "vue";
const Modal = defineAsyncComponent(() => import("../components/Modal.vue"));

const props = defineProps({
  endpoint: String,
});

const { item, endpoint } = props;

const addItem = async () => {
  await axios
    .post(`${endpoint}/create`)
    .then(({ data }) => data)
    .catch((err) => console.log("err", err.response));
};
</script>
<template>
  <v-card class="ma-1 add-card" width="300" height="400">
    <div>
      <v-img
        class="align-end text-white"
        height="100"
        src="https://cdn-icons-png.flaticon.com/512/6711/6711415.png"
        contain
      >
      </v-img>

      <v-card-actions>
        <Modal :endpoint="endpoint" verbiage="Create" />
      </v-card-actions>
    </div>
  </v-card>
</template>
<style scoped>
.v-card {
  display: flex;
  justify-content: center;
}
.v-card > div {
  margin: auto 0 !important;
  display: flex;
  flex-direction: column;
}
</style>
