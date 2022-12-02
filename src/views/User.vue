<template>
  <div style="width: 100%; display: flex;flex-direction: column">
    <div class="navigation">
      <navigation-bar :is-home-top="false"></navigation-bar>
    </div>
<!--    <div style="height: 50px"></div>-->
    <router-view></router-view>
  </div>
  <login-window></login-window>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  components: {}

}
</script>

<style scoped>
.navigation{
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>