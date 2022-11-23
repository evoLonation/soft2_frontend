<template>
  <router-view/>
</template>

<script>
import LoginWindow from "@/components/loginWindow";

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    LoginWindow,
  }
}
</script>

<style></style>
