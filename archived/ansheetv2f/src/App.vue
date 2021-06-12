<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/app/Navbar'
export default {
  components:{
    Navbar
  }
}
</script>