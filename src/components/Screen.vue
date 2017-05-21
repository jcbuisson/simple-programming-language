
<template>

    <div class="card screen">
        <div class="card-header">Screen</div>
        <div class="card-block area">
          <canvas height="200px" class="canvas-area" v-insert-message="commands"></canvas>
        </div>
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
            ctx.clearRect(0, 0, 1000, 1000)
            // Insert stuff into canvas
            ctx.fillStyle = "black"
            ctx.font = "14px"
            ctx.beginPath()
            let commands = binding.value
            let penPosition = { 'x': 0, 'y': 0 }
            let penOrientation = 0.
            commands.forEach(function(command) {
               if (command.type === 'write-char') {
                  let c = String.fromCharCode(command.value)
                  ctx.fillText(c, penPosition.x, penPosition.y);
                  penPosition.x += ctx.measureText(c).width
               } else if (command.type === 'pen-position-x') {
                  penPosition.x = command.value
                  ctx.moveTo(penPosition.x, penPosition.y)
               } else if (command.type === 'pen-position-y') {
                  penPosition.y = command.value
                  ctx.moveTo(penPosition.x, penPosition.y)
               } else if (command.type === 'turn') {
                  penOrientation += command.value
               } else if (command.type === 'move') {
                  let length = command.value
                  penPosition.x += length * Math.cos(penOrientation*2.*Math.PI/360.)
                  penPosition.y += length * Math.sin(penOrientation*2.*Math.PI/360.)
                  ctx.lineTo(penPosition.x, penPosition.y)
                  ctx.stroke()
               }
            })
            //this.$emit('penmoved', penPosition)
         }
      },
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
