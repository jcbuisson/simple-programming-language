<template>
   <div v-html="compiledMarkdown" class="mymd"></div>
</template>


<script>
   import marked from 'marked'

   export default {
      data () {
         return {
            input: [

/*
"## Expressions",

"### Copy",

"### Compare",

"### Go",

"### Call / return",

"### Push / pop",

"### Stop",
*/

"## Instructions",
"### compare",
"```",
"       compare <expression1> to <expression2>",
"```",


"## Input[] map",
"| Address      | Value read    |",
"| ------------ | ------------- |",
"|  0           |  Number (integer or real) entered in the numeric input field",
"|  1           |  Pen x-coordinate",
"|  2           |  Pen y-coordinate",
"|  3           |  Pen orientation (degree, clockwise, default is 0 = towards right)",

"|  7           |  Pen font size in px",

"## Output[] map",
"| Address      | Effect of writing *value* |",
"| ------------ | ------------------------- |",
"|  0           |  Display *value* in the numeric output field",
"|  1           |  Set pen x-coordinate to *value* (origin is left side)",
"|  2           |  Set pen y-coordinate to *value* (origin is up side)",
"|  3           |  Turn: add *value* to current pen orientation (in degree)",
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
<style>
  .mymd {
    margin: 20px;
  }

  .mymd pre {
    color: #86F;
    background: #eee;
  }

  .mymd td, .mymd tt {
    border: 1px;
    border-color: black;
  }
</style>
