<template>
  <div class="text-center mt-5">
    <p class="font-weight-medium">No hay examenes pendientes</p>
    <div class="d-flex justify-center mb-5">
      <v-img
        contain
        max-height="250"
        max-width="250"
        src="../assets/dove.png"
      ></v-img>
    </div>
    <router-link to="/reporte">Ir al reporte</router-link>
  </div>
</template>

<script>
export default {
  name: "NotPendingExam",
};
</script>
