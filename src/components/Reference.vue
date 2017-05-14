<template>
   <div class="body">
      <div v-html="compiledMarkdown"></div>
   </div>

   <!--div class="documentation">

      <h4>Instructions</h4>
      <p>
         An instruction is a line of text written in the `Code` area, which conforms to a specific syntax.
      </p>
      <p>
         There are only 4 kinds of instruction:
         <ul>
            <li>Assignment: `expression` -> `memory location`</li>
         </ul>
      </p>


      <h4>Input / Output</h4>

      <h5>The <code>input</code> memory array, or how to get information from the outside world</h5>
      <p>
         The only way to get information from the outside world is to read the <code>input</code> memory array, each location of which being dedicated
         to a particular input aspect. For example, <code>input[0]</code> continuously reflects the content of the 'Numeric input' box situated
         in the middle-right part of the sandbox:
      </p>
      <p><img src="azer"/></p>
      <p>
         The <code>input</code> memory array is displayed in the sandbox, but it cannot be modified directly, since it is a read-only data array.
         Its content may be modified only through interactions with the outside world.
      </p>

      <h5>The <code>output</code> memory array, or how to act on the outside world</h5>
      <p>
         Similarly, the only way to act on the outside world is to write in the <code>output</code> memory array, each location of which being dedicated
         to a particular output or acting aspect. For example, writing a number into <code>output[0]</code> has the effect of displaying
         this number in the 'Numeric output' field situated in the middle-right part of the sandbox:
      </p>
      <p><img src="azer"/></p>
      <p>
         The <code>output</code> memory array cannot be displayed in the sandbox, since it is a write-only memory array.
      </p>

      <h5>Example</h5>
      <p>
         The following 'input/output' example program continuously computes and displays in the 'Numeric output' field the square
         of the value typed in the 'Numeric input' box :
         <pre>
here:  input[0] * input[0] -> output[0]
       go here
         </pre>
      </p>

   </div-->
</template>


<script>
   import debounce from 'lodash/debounce'
   import marked from 'marked'

   export default {
      data () {
         return {
            input: [
      "# Introduction",
      
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
