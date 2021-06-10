<template>
  <v-container fluid>
    <v-tabs color="deep-purple accent-4" v-model="tab">
      <v-tab>COMIPEMS</v-tab>
      <v-tab>Universidad</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <report type="comipems" />
      </v-tab-item>
      <v-tab-item>
        <report type="universidad" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import Report from "@/components/Report.vue";
export default {
  components: { Report },
  name: "MainReport",
  data: () => ({
    tab: null,
  }),
};
</script>

<style></style>
