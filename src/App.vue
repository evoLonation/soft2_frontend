<template>
  <router-view/>
  <login-window/>
  <p>???</p>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import LoginWindow from "@/components/loginWindow";

export default {
  name: 'App',
  components: {
    LoginWindow,
  }
}
</script>

<style></style>
