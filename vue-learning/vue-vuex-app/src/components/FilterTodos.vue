<template>
  <div>
    筛选：
    <select v-model="count" @change="filterTodos(count)">
      <option value="200">200</option>
      <option value="150">150</option>
      <option value="100">100</option>
      <option value="50">20</option>
      <option value="20">10</option>
      <option value="5">5</option>
    </select>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FilterTodos",
  props: {

  },
  data() {
    return {
      count: 200
    };
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  watch: {

  },
  methods: mapActions(["filterTodos"]),
  components: {

  },
};
</script>

<style scoped>
select {
  margin-top: 20px;
  padding: 6px;
  border: #41b883 1px solid;
}
</style>
