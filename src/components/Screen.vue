
<template>
   <div class="screen">
      <b-alert show class="title"> {{ title }} </b-alert>
      <div class="area">AA</div>
   </div>
</template>

<script>

export default {
   props: {
      title: String,
   },
   data () {
      return {
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .title {
      margin-bottom: 0;
      padding-top: 6px;
      padding-bottom: 6px;
   }
   .area {
      color: black;
   }
   .screen {
      height: 100%;
      background-color: #eeeeee;
   }
</style>
