<template>
   <div>
      <top-bar v-bind:name="'reference'" v-on:buttonclick="onButtonClick"></top-bar>
      <div v-html="compiledMarkdown" class="mymd"></div>
   </div>
</template>


<script>
   import marked from 'marked'

   import topbar from '@/components/TopBar'

   export default {
      components: {
         TopBar: topbar,
      },
      methods: {
         onButtonClick: function(name) {
            this.$emit('changeview', name)
         }
      },
      data () {
         return {
            input: [


"### Instructions",

"##### call",
"```",
"       call <label>",
"```",
"Call subroutine situated at `label`.",

"##### compare",
"```",
"       compare <expression1> to <expression2>",
"```",
"Compares the values of <expression1> and <expression2> and set one of the three flags `smaller`, `equal`, `greater`.",
"These flags retain their values as long as no other `compare` instruction is executed.",

"##### copy",
"```",
"       <expression> -> <destination>",
"```",
"Copies the value of <expression> into <destination>",

"##### go",
"```",
"       go <label>",
"```",
"Go to the `label` in the program, unconditionnaly.",

"```",
"       go <label> if <condition>",
"```",
"Go to the `label` in the program, if <condition> is true. <condition> can be `smaller`, `smaller_or_equal`, `equal`, `greater`, `greater_or_equal`.",

"##### pop",
"```",
"       pop <destination>",
"```",
"Pull the value situated on top of the stack, and copies it in <destination>.",

"```",
"       pop",
"```",
"Pull the value situated on top of the stack, but does not copy it anywhere.",

"##### push",
"```",
"       push <expression>",
"```",
"Push onto the `stack` array the value of <expression>.",

"##### return",
"```",
"       return",
"```",
"Return in the program the line after the last executed `call`.",

"##### stop",
"```",
"       stop",
"```",
"Stops the execution of the program.",

"### Input / Output addresses",

"##### Input array (read-only)",
"Reading in the *input[]* array at specific addresses gives information from the outside world.",
"The specifics of each address are described in the following table:  ",

"| Address      | Value read    |",
"| ------------ | ------------- |",
"|  0           |  Number (integer or real) entered in the numeric input field",
"|  1           |  Pen x-coordinate",
"|  2           |  Pen y-coordinate",
"|  3           |  Pen orientation (degree, clockwise, default is 0 = towards right)",

"|  7           |  Pen font size in px",

"##### Output array (write-only)",
"Writing into the *output[]* array at specific addresses act on the outside world.",
"The specifics of each address are described in the following table:  ",

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
