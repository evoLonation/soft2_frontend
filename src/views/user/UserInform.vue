<template>
<!--  顶部栏-->
  <div style="height: 56px;text-align: center;background-color: #007dfa">
    顶部栏
  </div>
  <div class="main_body">
    <div class="main_left">
        <div class="left_inform">
          
        </div>
    </div>
    <div class="main_right">

    </div>
  </div>

</template>

<script>
export default {
  name: "UserHome"
}
</script>

<style scoped>

.main_body{
  background-color: #FAF9F6;
}

.main_left{
  background-color: white;
  display: inline-block;
  vertical-align: top;
  border: 3px red solid;
  margin-left: 50px;
  margin-top: 50px;
  width: 20%;
  height: 200px;
}

.main_right{
  background-color: white;
  display: inline-block;
  vertical-align: top;
  border: 3px mediumpurple solid;
  margin-left: 50px;
  margin-top: 50px;
  width: 60%;
  height: 1000px;
}


</style>