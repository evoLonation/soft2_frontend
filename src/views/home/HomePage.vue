<template>
  <div class="home-root">
    <navigation-bar :is-home-top="isHomeTop"></navigation-bar>
    <div class="up-area" ref="upArea">
      <div class="logo">
        <div>
          <span> 这里是主页</span>
        </div>

      </div>
      <div class="search">
        <search-box>
        </search-box>
      </div>
    </div>

    <div class="field">

    </div>
  </div>

</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import {ref, onMounted} from "vue";
export default {
  name: "HomePage",
  components: {NavigationBar},
  setup(){
    const upArea = ref(null);
    const isHomeTop = ref(true);
    const scrollListener = () => {
      console.log("scroll");
      let top = upArea.value.getBoundingClientRect().top + 400 - 50;
      if(top > 0){
        isHomeTop.value = true;
        console.log("top > 0!");
      }else{
        isHomeTop.value =  false;
        console.log("top < 0!");
      }
    };
    onMounted(() => {
      window.addEventListener("scroll", scrollListener,true);

    });

    return{
      upArea,
      isHomeTop,
    }
  },


}
</script>

<style scoped>

*{
  margin: auto;
}
/*影响子组件的root*/
.navigation-bar-root {
  position: sticky;
  top: 0;
}
.home-root{
  display: flex;
  flex-direction: column;
}
.up-area{
  height: 400px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-image: url("@/assets/nightsky.jpeg");
}
.logo{

  text-align: center;
}
.search{
  height: 50px;
}
.field{
  height: 2000px;
}
</style>