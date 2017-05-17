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
      "This tutorial will teach you how to write and execute programs in the Simple Programming Language (SPL) sandbox.  ",
      "After a short description of basic notions, we'll describe examples in detail, from the most simple to more complex ones.",

      "## Basic notions",
      "### Numbers",
      "Every piece of information in this language is represented with numbers.",
      "For example, a text can be represented by a succession of numeric codes, one for each character, ended by a zero for the end of the string.  ",
      "A number can be integer or real, positive or negative. It is written the usual way, for example: 123, -123, 3.14, -0.01",

      "### Data array",
      "The main area where these numbers are stored during the execution of a programe is the *data* array.",
      "",
      "![](static/data-array.png)",
      "",
      "It is potentially an infinite array, initially filled with zeros. You can edit it by hand to give initial values to a program, bu",

      "### Program",
      "It is a list of instructions written in the *Code* area. You should not place more than one instruction per line.  ",
      "Instructions are executed in the order they appear in the program, the only exception being the *go* instruction",
      "which may cause a *jump* to an instruction other than the next one.",
      "",
      "Here is an example of a valid program, composed of 2 instructions:",
       "```",
"       1 -> data[0]",
"       stop",
      "```",
      "",

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
