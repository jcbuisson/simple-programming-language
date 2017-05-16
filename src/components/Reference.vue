<template>
   <div class="body">
      <div v-html="compiledMarkdown"></div>
   </div>

   <!--div class="documentation">

      <h4>Instruction syntax</h4>
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
   import marked from 'marked'

   export default {
      data () {
         return {
            input: [

"## Expressions",

"## Instructions",

"### Copy",

"### Compare",

"### Go",

"### Call / return",

"### Push / pop",

"### Stop",

"## Input map",
"| Address      | Value read    |",
"| ------------ | ------------- |",
"|  0           |  Number (integer or real) entered in the numeric input field",
"|  1           |  Pen x-coordinate",
"|  2           |  Pen y-coordinate",
"|  3           |  Pen orientation (degree, clockwise, default is 0 = towards right)",

"|  7           |  Pen font size in px",

"## Output map",
"| Address      | Effect of writing *value* |",
"| ------------ | ------------------------- |",
"|  0           |  Display *value* in the numeric output field",
"|  1           |  Set pen x-coordinate to *value* (origin is left side)",
"|  2           |  Set pen y-coordinate to *value* (origin is up side)",
"|  3           |  Set pen orientation to *value* (in degree)",
"|  4           |  Move pen to an extend of *value* in the current pen direction",

"|  6           |  Display character of code *value* at the current pen position. Pen is moved right after the character",
"|  7           |  Set font size in px (default is 14)",

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
