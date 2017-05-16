<template>
   <div class="body">
      <div v-html="compiledMarkdown" class="md"></div>
   </div>
</template>


<script>
   import marked from 'marked'

   export default {
      data () {
         return {
            input: [
      "# Tutorial",
      "This plateform is a sandbox to write programs and experiment with SPL, a Simple Programming Language.  ",

      "### What's a program?",
      "It is a list of instructions written in the *Code* area. You should not place more than one instruction per line.  ",
      "Instructions are executed in the order in which they appear in the program, the only exception being the *go* instruction",
      "which may cause a *jump* to an instruction other than the next one.",
      "",
      "Here is an example of a valid program, composed of 2 instructions:",
       "```",
"here:  input[0] * input[0] -> output[0]",
"       go here",
      "```",
      ].join('\n')
         }
      },
      computed: {
         compiledMarkdown: function () {
            return marked(this.input, { sanitize: true })
         }
      },
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.body {
  margin: 20px;
}

.md pre {
  color: #86F;
  background: #eee;
}
</style>
