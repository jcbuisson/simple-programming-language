
<template>
   <div class="screen">
      <b-alert show class="title"> {{ title }} </b-alert>
      <canvas class="area" style="border:1px solid #BBB;" v-insert-message="commands"></canvas>
   </div>
</template>

<script>

   export default {
      props: {
         title: String,
         commands: Array,
      },
      data () {
         return {
         }
      },
      directives: {
         insertMessage: function(canvasElement, binding) {
            // Get canvas context
            var ctx = canvasElement.getContext("2d")
            // Clear the canvas
            ctx.clearRect(0, 0, 300, 150)
            // Insert stuff into canvas
            ctx.fillStyle = "black"
            ctx.font = "20px Georgia"
            let commands = binding.value
            commands.forEach(function(command) {
               if (command.type === 'char') {
                  let c = String.fromCharCode(command.value)
                  ctx.fillText(c, 10, 50);
               }
            })
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
