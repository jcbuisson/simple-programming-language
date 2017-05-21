
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

      "## Level 1",

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
      "```",
       "```",
"       -147 -> m[5] // 'memory' can be shortened 'm' or 'mem'",
      "```",
      "##### Invalid instructions:",
       "```",
"       3.1415 -> memory[-10] // WRONG - negative indexes not allowed",
      "```",
       "```",
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
      "`memory[0] + 1` is an *expression*, that is a formula to be evaluated. The result of this evaluation is then affected to the destination, here `memory[0]`.  ",
      "Expressions may contain the usual arithmetic operations, which are written `+`, `-`, `*`, `/` for add, subtract, multiply and divide respectively.",
      "You can use any array like `memory` and parenthesis when needed.",

      "##### Valid expressions:",
       "```",
"       m[0] * m[1] + 3",
      "```",
       "```",
"       (2 * 3.1415 * m[10] + m[11]) / (m[0] + m[1])",
      "```",

      "### Fibonacci suite",
      "Now we are ready to explain the first *Sandox* example, 'Fibonacci sequence'. This sequence was presented in 1201 by italian",
      "mathematician Fibonacci; it starts with 0 and 1, then each new value is the sum of the two previous. Here is the code:",
       "```",
"0 /* Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8,...",
"1    Each value is the sum of the two previous ones",
"2    Values are computed and displayed continuously */",
"3",
"4          0 -> memory[0]",
"5          1 -> memory[1]",
"6          // compute next value",
"7 loop:    memory[0] + memory[1] -> memory[2]",
"8          // display value in 'Numeric output' box",
"9          memory[2] -> output[0]",
"10         // shift last two values",
"11         memory[1] -> memory[0]",
"12         memory[2] -> memory[1]",
"13         go loop",
      "```",
      "Lines 0 to 2 are comments, which are not executed. They are enclosed by `/*` and `*/` and may span multiple lines.",
      "At lines 8 and 10 we can see the other way to make comments, on a single line: everything after `//` in the line is ignored for execution.  ",
      "Instructions are executed one after the other, the only exception being the `go` instruction.",
      "This program never stops, going continuously from line 13 to line 7. At each cycle, a new value of the sequence is computed and displayed.",
      "`memory[0]` and `memory[1]` hold the last 2 values of the sequence. On line 4 and 5 they are initialized with the first two values",
      "of the sequence, 0 and 1, then on line 7 the new value is computed as the sum of the two previous, and stored in `memory[2]`.",
      "At this point, `memory[0]`, `memory[1]` and `memory[2]` hold three successive values of the Fibonacci sequence.  ",
      "At line 9, the latest value in `memory[2]` is copied in `output[0]`, and you can check in the *Sandbox* that",
      "it has the effect to display it in the 'Numeric output' field.",
      "",
      "![](static/fibonacci.png)",
      "",
      "`output` is a new array we've not seen yet. For now, enough is to know that you can only write into it,",
      "and that what you write is immediately visible in the 'Numeric output' field.  ",
      "In lines 11 and 12, the last two values `memory[1]` and `memory[2]` are shifted in `memory[0]` and `memory[1]` before going back to `loop`",
      "for a new cycle.",

      "### Sum of the nth first integers",
      "Load and try the next *Sandbox* example, 'Sum of the nth first integers':",
      "```",
         "0  /* Compute the sum of the first integers\n" +
         "1     up to the value entered in the 'Numeric input' field.\n" +
         "2     Ex: 5 -> 1 + 2 + 3 + 4 + 5 = 15\n" +
         "3     The result is visible in the 'Numeric output' field\n" +
         "4  */\n" +
         "5           input[0] -> memory[0]\n" +
         "6           0 -> memory[1]\n" +
         "7  here:    compare memory[0] to 0\n" +
         "8           go end if smaller_or_equal\n" +
         "9           memory[0] + memory[1] -> memory[1]\n" +
         "10          memory[0] - 1 -> memory[0]\n" +
         "11          go here\n" +
         "12 end:     memory[1] -> output[0]\n" +
         "13          stop",
      "```",




      "### Input array: getting information from the outside world",
      "Reading in the *input[]* array at specific addresses gives information from the outside world.  ",
      "For example, when a number has been typed in the 'Numeric input' field, it can be accessed by reading `input[0]`, as can be seen in the following picture:",
      "![](static/input0.png)",
      "",
      "Try changing the content of the 'Numeric input' field and see how the content of `input[0]` changes accordingly.  ",
      "`input` is a read-only data array. Other kinds of input acquisition are described in the 'Reference' section.",

      "### Output array: acting on the outside world",
      "Writing into the *output[]* array at specific addresses may act on the outside world.  ",
      "For example, writing a number in `output[0]` has the effect of displaying this number in the 'Numeric output' field.  ",
      "`output` is write-only; this is the reason you do not see it in the *Sandbox*, you see only its side-effects.  ",
      "Other kinds of actions are described in the 'Reference' section.",


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
