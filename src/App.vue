<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <router-view/>
  <login-window/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LoginWindow from "@/components/loginWindow";

export default {
  name: 'App',
  components: {
    LoginWindow,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
