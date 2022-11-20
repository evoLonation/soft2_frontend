<template>
  <router-view/>
  <login-window/>
  <p>???</p>
</template>

<script>
import LoginWindow from "@/components/loginWindow";

export default {
  name: 'App',
  components: {
    LoginWindow,
  }
}
</script>

<style></style>
