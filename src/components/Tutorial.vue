<template>
   <div v-html="compiledMarkdown" class="mymd"></div>
</template>


<script>
   import marked from 'marked'

   export default {
      data () {
         return {
            input: [
      "# Tutorial",
      "This tutorial will teach you how to write and execute programs in the Simple Programming Language (SPL).  ",
      "In the *Sandbox* you can see all the internals of a program while it is executed. You can fully understand what happens",
      "when an instruction is executed. It is then up to you to write and organize instructions in a meaningful way.  ",
      "After a short description of preliminary concepts, we'll describe examples in detail, from the most simple to more complex ones.",

      "## Preliminary concepts",
      "### Numbers",
      "Every piece of information in this language is represented with numbers.",
      "For example, a text can be represented by a succession of numeric codes, one for each character, with a zero at the end.  ",
      "A number may be integer or real, positive or negative. It is written the usual way, for example: `123`, `-123`, `3.14`, `-0.01`",

      "### Data array",
      "The *data* array is a place where such numbers are stored during the execution of a program. This array is visible in the Sandbox:",
      "",
      "![](static/data-array.png)",
      "",
      "During the execution of a program, the *data* array contains its current working memory.  ",
      "It is potentially an infinite array, initially filled with zeros. You can edit it by hand to give initial values to a program.  ",
      "It is accessed through an integer index, from 0 to infinity. The syntax is, for example: `data[0]`, `data[1000]`.  Negative indexes are *not* allowed.  ",
      "This index is generally called by programmers, the *address* of the corresponding data. For example in the picture above, `3.14` is located at address 2.",

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
      "Try changing the content of the 'Numeric input' field and see how the content of `input[0]` changes accordingly.  ",
      "`input` is a read-only data array. Other kinds of input acquisition are described in the 'Reference' section.",

      "### Output array: acting on the outside world",
      "Writing into the *output[]* array at specific addresses may act on the outside world.  ",
      "For example, writing a number in `output[0]` has the effect of displaying this number in the 'Numeric output' field.  ",
      "`output` is write-only; this is the reason you do not see it in the *Sandbox*, you see only its side-effects.  ",
      "Other kinds of actions are described in the 'Reference' section.",

      "# Level 1 - beginner skills",
      "## Input / output",

      "Let's start with the exemple program 'Input / output':",
       "```",
         "0 here:  input[0] * input[0] -> output[0]\n" +
         "1        go here",
       "```",
       "If you execute it, you'll see that it runs continuously, and that whenever you enter a number in the 'Numeric input' field,",
       "its square is displayed in the 'Numeric output' field.",
       "",
       "![](static/input-output.png)",
       "",
       "The first instruction is actually only `input[0] * input[0] -> output[0]`; `here:` is only a *label* which marks",
       "a particular place in the program.  ",
       "This first instruction evaluates the expression `input[0] * input[0]`, then copies the result in the location `output[0]`.",
       "As we've seen before, `input[0]` reflects the content of 'numeric input' field, so this value will be squared,",
       "and whatever we copy in `output[0]` will be visible in the 'Numeric output' field.  ",
       "The second instruction `go here` tells the program to go back to `here` (instead of going to the next instruction),",
       "which explains why it runs continuously.",
       
       "## Sum of the nth first integers",
       "```",
         "5           input[0] -> data[0]\n" +
         "6           0 -> data[1]\n" +
         "7  here:    compare data[0] to 0\n" +
         "8           go end if smaller_or_equal\n" +
         "9           data[0] + data[1] -> data[1]\n" +
         "10          data[0] - 1 -> data[0]\n" +
         "11          go here\n" +
         "12  end:    data[1] -> output[0]\n" +
         "13          stop",
      "```",
      "If you run this program, ",

      "",
      "### Do more",
      "You should now be able to write simple computation programs. Try for example to compute the *factorial* of an integer entered",
      "in 'Numeric input' field (e.g. fact(5) = 5*4*3*2*1 = 120",


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
