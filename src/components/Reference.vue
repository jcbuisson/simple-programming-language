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
"****",

"##### `<expression> -> <destination>`",
"Copies the value of <expression> into <destination>  ",
"Examples:  ",
"```",
"       0 -> memory[100]",
"       memory[10] + 1 -> memory[11]",
"       1 -> stack[0]",
"       2 * input -> output",
"```",
"****",

"##### `call <label>`",
"Call subroutine situated at `label`.",
"****",

"##### `compare <expression1> to <expression2>`",
"Compares the values of <expression1> and <expression2> and set one of the three flags `smaller`, `equal`, `greater`.",
"These flags retain their values as long as no other `compare` instruction is executed.  ",
"Examples:  ",
"```",
"       compare input to 0",
"       compare memory[memory[0]] to memory[11]",
"```",
"****",

"##### `go <label>`",
"Go to the `label` in the program, unconditionnaly.",
"****",

"##### `go <label> if <condition>`",
"Go to the `label` in the program, if <condition> is true. <condition> can be `smaller`, `smaller_or_equal`, `equal`, `greater`, `greater_or_equal`.  ",
"Examples:  ",
"```",
"       go here if smaller_or_equal",
"       go there if equal",
"```",
"****",

"##### `pen_draw <expression>`",
"",
"Draw a line from current pen position, in the current pen orientation, of length <expression>.  ",
"Examples:  ",
"```",
"       pen_draw 50",
"       pen_draw 2 * (memory[5] + 1)",
"```",
"",
"****",

"##### `pen_move <expression>`",
"",
"Move pen, in the current pen orientation, of length <expression>.  ",
"Examples:  ",
"```",
"       pen_move 50",
"       pen_move 2 * (memory[5] + 1)",
"```",
"****",

"##### `pen_turn <expression>`",
"Add <expression> to the pen orientation (in degrees). Pen orientation is initially of 0, that is towards right. Angle are counted clockwise.  ",
"Examples:  ",
"```",
"       pen_turn 45",
"       pen_turn 2 * (memory[5] + 1)",
"```",
"****",

"##### `pen_write_char <expression>`",
"Write charcter of code <expression> at current pen position. Pen position is then moved past the character.  ",
"Examples:  ",
"```",
"       pen_write_char 65",
"       pen_write_char 2 * (memory[5] + 1)",
"```",
"****",

"##### `pop`",
"Pull the value situated on top of the stack, but does not copy it anywhere.",
"****",

"##### `pop <destination>`",
"Pull the value situated on top of the stack, and copies it in <destination>.  ",
"Examples:  ",
"```",
"       pop memory[10]",
"       pop output",
"```",
"****",

"##### `push <expression>`",
"Push onto the `stack` array the value of <expression>.  ",
"Examples:  ",
"```",
"       push memory[memory[1]]",
"       push 2*input",
"```",
"****",

"##### `return`",
"Return in the program the line after the last executed `call`.",
"****",

"##### `stop`",
"Stops the execution of the program.",
"****",

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
