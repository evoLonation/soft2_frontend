<template>
  <div style="display: flex">
    <admin-navigation-bar class="navigation"></admin-navigation-bar>
<!--    <div style="width: 1300px;height: 2000px;border: 1px solid #000000;margin: auto;"></div>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Admin"
}
</script>

<style scoped>

</style>