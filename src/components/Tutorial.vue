
<template>
   <div>
      <top-bar v-bind:name="'tutorial'" v-on:buttonclick="onButtonClick"></top-bar>
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
      "# Tutorial",
      "This tutorial will teach you how to write and execute programs in the Simple Programming Language (SPL).  ",
      "The *Sandbox* shows you all the internals of a program, so you can fully understand what happens",
      "when an instruction is executed. Programming is a matter of writing and organizing instructions in a meaningful way.  ",

      "## Part 1: Simple instructions",

      "#### Input/output instructions",
      "Go to the *Sandbox* and choose the 'Cube calculator' example. You should see the following lines in the *Code* area:",
       "```",
         "0        // compute cube of input",
         "1        input * input * input -> output",
         "2        stop",
      "```",
      "Now run it by clicking on the 'Run/Pause' button at the bottom, or on the 'Step' button twice:  ",
      "",
      "![](static/cube.png)",
      "",
      "Everything written after `//` is ignored and used to write comments, so there are only two instructions, at lines 1 and 2.  ",
      "At the beginning the control (visible with the dark blue line) is situated on the first instruction, at line 1.",
      "`input` represents the number which has been typed in the 'Numeric input' field, `12` in this case. Whenever this value is changed by hand,",
      "the value of `input` in a program is changed accordingly. The expression `input * input * input` is computed (it makes `1728`)",
      "and the arrow `->` indicates that it is to be copied into `output`.  ",
      "The 'Numeric output' field has been designed to permanently reflect the content of what has been copied into `output`,",
      "so executing instruction at line 1 writes `1728` into 'Numeric output'.  ",
      "When this first instruction is executed, control goes to next instruction at line 2. Its execution stops the program.",
      "",

      "#### Drawing instructions",
      "Go to the *Sandbox* and choose the 'Square drawing' example.",
      "If you run it, you'll see a square drawn in the *Screen* area, in the lower right part of the page:",
      "",
      "![](static/square_draw.png)",
      "",
      "The program is a simple sequence of drawing instructions, which all start by the prefix `draw_`.",
      "At line 0 there is a new kind of comment, enclosed by `/*` and `*/`, and which may span several lines.  ",
      "At line 3, `pen_turn 90` turns the drawing orientation of the (virtual) pen of 90 degrees, clockwise.",
      "Since initially the pen is supposed to be oriented to the right, it is now oriented to the bottom:",
      "",
      "![](static/pen_turn_90.png)",
      "",
      "At line 4, `pen_move 100` moves the pen of 100 pixels in the current direction, that is 100px down.",
      "At line 5 a new turn of `-90` which orients it back to the right, then a move of `100` which now places the pen at coordinates `(100, 100)`.  ",
      "Then start a series of 4 drawing and turning instructions, to draw the 4 sides of a square.",
      "The instruction `pen_draw` is similar to `pen_move`, except it draws a black line on the screen while it moves.",


      "## Part 2: Algorithms",

      "#### Memory",
      "Go to the *Sandbox* and copy/paste the two following lines in the *Code* area:",
       "```",
"       1 -> memory[0]",
"       stop",
      "```",
      "Now run it by clicking on the 'Run/Pause' button at the bottom, or on the 'Step' button twice:  ",
      "",
      "![](static/memory0.png)",
      "",
      "You can see that the first instruction copied the number '1' in the 'memory' array, at index 0. When it is executed,",
      "the control goes to the next instruction `stop`, which halts the execution.  ",
      "The `memory` array is the working memory of a program, each of its slot being accessible for reading or writing.",
      "It is potentially infinite, from index 0 upwards (negative indexes are not allowed).  ",
      "This index is generally called the `address` by programmers. For example in the picture above, they would say that 1 is located at address 0.",
      "You can store in the slots of the `memory` array any kind of integer or real number, but no other types of data.",
      "We'll see later how to represent types of data such as strings or sets with such numbers.",

      "##### Valid instructions:",
       "```",
"       3.1415 -> memory[100]",
"       -147 -> m[5] // 'memory' can be shortened 'm' or 'mem'",
      "```",
      "##### Invalid instructions:",
       "```",
"       3.1415 -> memory[-10] // WRONG - negative indexes not allowed",
"       'hello' -> memory[-10] // WRONG - only numbers are allowed",
      "```",

      "#### Expressions",
      "Now try and execute the following code:",
       "```",
"here:    memory[0] + 1 -> memory[0]",
"         go here",
      "```",
      "This program never stops: when control reaches instruction `go here`, it goes back at previous instruction (marked with the label `here`),",
      "and so on for ever. The only way to stop it is to click on the `pause` or the `reset` button. At each cycle, you can see that the memory",
      "slot `memory[0]` increments, taking the successive values 0, 1, 2,...  ",
      "`memory[0] + 1` is an **expression**, that is a formula to be evaluated. The result of this evaluation is then affected to the destination, here `memory[0]`.  ",
      "Expressions may contain the usual arithmetic operations, which are written `+`, `-`, `*`, `/` for add, subtract, multiply and divide respectively.",
      "You can use any array like `memory` and parenthesis when needed.",

      "##### Valid expressions:",
       "```",
"       m[0] * m[1] + 3",
      "```",
       "```",
"       (2 * 3.1415 * m[10] + m[11]) / (m[0] + m[1])",
      "```",

      "### Sum of the nth first integers",
      "Now we are ready to explain the next *Sandbox* example, 'Sum of the nth first integers':",
      "",
      "![](static/sum_integers.png)",
      "",
      "Lines 0 to 4 are comments which are not executed. They are enclosed by `/*` and `*/` and may span multiple lines.",
      "At lines 5, 6, etc. we can see the other way to make comments on a single line: everything after `//` in the line is ignored for execution.",
      "",
      "This program implements a fairly simple algorithm: `memory[0]` holds the current index value, initialized with input,",
      "and its value is decremented at each cycle, down to 1. `memory[1]` is where the result is computed;",
      "it is initialized with 0 at line 6, and its value is augmented with the index value `memory[0]` at each cycle so in the end",
      "it contains the sum of all integers from 1 to initial value.",
      "",
      "The new `compare` and conditional `go` instructions are used to check at the beginning of each cycle whether to stay in the cycle",
      "or to get out of it. On line 11, the index value `memory[0]` is compared to 0, which sets one of the flags `smaller`, `equal`, `greater`",
      "visible in the *Sandbox*:",
      "",
      "![](static/flags.png)",
      "",
      "In the situation pictured where `memory[0]` is 3, the `compare` instruction set the flag `greater`, since 3 is greater than 0.",
      "The three `smaller`, `equal` and `greater` flags will keep their value as long as no other `compare` instruction is executed.",
      "These values are used at next line 13, where the `go` instruction is conditionned by them: if the condition is true,",
      "the jump is done, otherwise the program goes on at the next instruction. In our case, the condition `smaller_or_equal`",
      "means that the jump is done either when the flag `smaller` or the flag `equal` is on.",
      "The only possible values for the condition of `go` are: `smaller`, `smaller_or_equal`, `equal`, `greater`, `greater_or_equal`",
      "When the last cycle has been run and the computation is over, the result is displayed in 'Numerical output' by writing the value",
      "in `output[0]`.",
      "",
      "#### Training exercices",
      "- Write a program which computes the factorial of a number `n` (entered in the *input* field), that is the product of all integers from 1 to `n`.  ",
      "For example, fact(5) = 1 x 2 x 3 x 4 x 5 = 120.  ",
      "- Write a program which runs cyclicly and never stops, which computes and displays on the output field at each cycle",
      "a new value of the *Fibonacci* sequence 0, 1, 1, 2, 3, 5, 8,... where the first two values are 0, 1, and each new value",
      "is the sum of the two previous ones ",
      "",

      "## Part 3: String experiments",

      "The `Simple Programming Language` knows only about numbers, so all other data structures such as strings, lists, etc.",
      "have to be constructed with such numbers, organized in the memory area.  ",
      "A string is usually repesented in memory as the sequence of its character codes, ended by a zero.",
      "For exemple, the string `'Hellow world'` will be represented by the sequence `72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33, 0`,",
      "where `72` is the ASCII code for `'H'`, `101` the code for `'e'`, etc. The final `0` marks the end of the character string.  ",
      "Load and run the `Hellow world` example:",
      "",
      "![](static/hello_world.png)",
      "",
      "In this example, the memory is already filled with initial data. Addresses `1` to `13` are set with the character codes of `'Hello world'`,",
      "so we'll say that this string is located at address `1`.  ",
      "Now memory location `0` is interesting: its content is not a piece of data as it has always been the case previously,",
      "it is the **address** of a piece of data, in our case the address of the current character of the string while it is displayed.  ",
      "So to access the current character before printing, we need to use the expression `memory[memory[0]]`.",
      "In the following situation, it evaluated to `108`, since the current character address (in `memory[0]`) is `4`:",
      "",
      "![](static/memory_memory.png)",
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
  .mymd pre {
    margin: 20px;
    color: #86F;
    background: #eee;
  }
</style>
