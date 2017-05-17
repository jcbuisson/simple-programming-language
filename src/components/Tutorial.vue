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
      "For example, a text can be represented by a succession of numeric codes, one for each character, with a zero at the end.  ",
      "A number can be integer or real, positive or negative. It is written the usual way, for example: `123`, `-123`, `3.14`, `-0.01`",

      "### Data array",
      "The main area where these numbers are stored during the execution of a programe is the *data* array.",
      "",
      "![](static/data-array.png)",
      "",
      "During the execution of a program, this array contains its data state, its current working memory.  ",
      "It is potentially an infinite array, initially filled with zeros. You can edit it by hand to give initial values to a program.  ",
      "It is accessed through an integer index, from 0 to infinity. The syntax is, for example: `data[0]`, `data[1000]`.  Negative indexes are *not* allowed.  ",
      "In computer science, this index is generally called the *address* of the corresponding data number.",

      "### Program",
      "A program is a list of instructions written in the *Code* area. You should not place more than one instruction per line.  ",
      "Instructions are executed in the order they appear in the program, the only exception being the *go* instruction",
      "which may cause a *jump* to an instruction other than the next one.",
      "",
      "Here is an example of a valid program, composed of 2 instructions:",
       "```",
"       1 -> data[0]",
"       stop",
      "```",
      "![](static/first-prog.png)",
      "",
      "Copy/Paste this program into the *Code* area, then run it by clicking on the 'Run/Pause' button at the bottom, or on the 'Step' button several times.  ",
      "The picture shows the state after the program has stopped at the 'stop' instruction (line 1), after having copied 1 into data[0].",

      "### Input array: getting information from the outside world",
      "Reading in the *input[]* array at specific addresses gives information from the outside world.  ",
      "For example, when a number has been typed in the 'Numeric input' field, it can be accessed by reading `input[0]`, as can be seen in the following picture:",
      "![](static/input0.png)",
      "",
      "`input` is a read-only data array. Other kinds of input acquisition are described in the 'Reference' section.",

      "### Output array: acting on the outside world",
      "Writing into the *output[]* array at specific addresses can act on the outside world.  ",
      "For example, writing a number in `output[0]` has the effect of displaying this number in the 'Numeric output' field.  ",
      "`output` is write-only; this is the reason you do not see it in the sandbox, it would have no meaning. Other kinds of actions are described in the 'Reference' section.",

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
