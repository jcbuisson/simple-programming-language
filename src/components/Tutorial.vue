<template>
   <div class="body">
      <div v-html="compiledMarkdown"></div>
   </div>
</template>


<script>
   import debounce from 'lodash/debounce'
   import marked from 'marked'

   export default {
      data () {
         return {
            input: [
      "# Tutorial",
      
      "This plateform is a sandbox to make experiments with SPL, a simple programming language.  ",
      "You'll be able to write programs in this language, and simulate their execution.",

      "## Language concepts",
      "### Program",
      "A program is a list of instructions written in the Code area. You should not place more than one instruction per line.",
      "",
      "This is an example of a valid program, composed of 2 instructions:",
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
<style scoped>
.body {
  margin: 20px;
}

code {
  color: #f66;
  background: green;
}
</style>