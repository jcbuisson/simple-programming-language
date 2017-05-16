
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
            ctx.font = "14px"
            let commands = binding.value
            let penPosition = { 'x': 0, 'y': 0 }
            commands.forEach(function(command) {
               if (command.type === 'write-char') {
                  let c = String.fromCharCode(command.value)
                  ctx.fillText(c, penPosition.x, penPosition.y);
                  penPosition.x += ctx.measureText(c).width
               } else if (command.type === 'pen-position-x') {
                  penPosition.x = command.value
               } else if (command.type === 'pen-position-y') {
                  penPosition.y = command.value
               }
            })
            //this.$emit('penmoved', penPosition)
         }
      },
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .screen {
      background-color: #fcfcfc;
      width: 100%;
      height: 100%;

      /*display: flex;
      flex-direction: column;  
      justify-content: flex-start;

      align-items: stretch;
      align-content: stretch;*/
   }

   .title {
      margin-bottom: 0;
      padding-top: 6px;
      padding-bottom: 6px;
   }

   .area {
      /*flex: 1;*/
      width: 100%;
      hheight: 100%;

      color: black;
   }
</style>
