
const examples = {

   input_output: {
      code:
         "here:  input[0] * input[0] -> output[0]\n" +
         "       go here",
      memory: [],
      stack: [],
      input: [12]
   },

   fibonacci: {
      code: [
"/* Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8,...",
"   Each value is the sum of the two previous ones",
"   Values are computed and displayed continuously */",
"",
"         0 -> memory[0]",
"         1 -> memory[1]",
"loop:    // compute next value",
"         memory[0] + memory[1] -> memory[2]",
"         // display value in 'Numeric output' box",
"         memory[2] -> output[0]",
"         // shift last two values",
"         memory[1] -> memory[0]",
"         memory[2] -> memory[1]",
"         go loop",
      ].join('\n'),
      memory: [],
      stack: [],
      input: []
   },

   sum_of_nth_first_integers: {
      code:
         "/* Compute the sum of the first integers\n" +
         "   up to the value entered in the 'Numeric input' field.\n" +
         "   Ex: 5 -> 1 + 2 + 3 + 4 + 5 = 15\n" +
         "   The result is visible in the 'Numeric output' field\n" +
         "*/\n" +
         "         input[0] -> memory[0]\n" +
         "         0 -> memory[1]\n" +
         "here:    compare memory[0] to 0\n" +
         "         go end if smaller_or_equal\n" +
         "         memory[0] + memory[1] -> memory[1]\n" +
         "         memory[0] - 1 -> memory[0]\n" +
         "         go here\n" +
         "end:     memory[1] -> output[0]\n" +
         "         stop",
      memory: [],
      stack: [],
      input: [5]
   },


   polygon: {
      code: [
"          // move pen towards center",
"          30 -> pen_turn",
"          80 -> pen_move",
"          -30 -> pen_turn",
"          // put side count (n) in memory[0] ",
"          input -> memory[0]",
"loop:     // draw with pen for length = 500 / n",
"          500 / input[0] -> pen_draw",
"          // turn pen of an angle 360/n",
"          360 / input[0] -> pen_turn",
"          // decrement n",
"          memory[0] - 1 -> memory[0]",
"          // leave loop when zero",
"          compare memory[0] to 0",
"          go loop if greater",
"          stop",
      ].join('\n'),
      memory: [],
      stack: [],
      input: [6]
   },


   hello_world: {
      code: [
         "/* Display the string 'Hello World!' in the 'Screen' area\n" +
         "   at coordinates (30, 30)\n" +
         "   The string is in the memory array, starting at address 1\n" +
         "   It is composed of ascii codes, ended by a zero\n" +
         "*/\n" +
         "        // memory[0] holds current character address",
         "        1 -> memory[0]",
         "        // set pen position towards center",
         "        30 -> pen_turn",
         "        80 -> pen_move",
         "next:   // last character?",
         "        compare memory[memory[0]] to 0",
         "        // check end of string",
         "        go end if equal",
         "        // write current character",
         "        memory[memory[0]] -> pen_write_char",
         "        // increment address of current character",
         "        memory[0] + 1 -> memory[0]",
         "        go next",
         "end:    stop"
      ].join('\n'),
      memory: [0, 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33, 0],
      stack: [],
      input: []
   },

   spiral: {
      code: [
"         /* Draws a spiral */",
"",
"         // move pen to (60, 60)",
"         60 -> output[1]",
"         60 -> output[2]",
"         // memory[0]: counter",
"         20 -> memory[0]",
"         // memory[1]: line length",
"         10 -> memory[1]",
"loop:    // move pen with length memory[1]",
"         memory[1] -> output[4]",
"         // add 5 to length",
"         memory[1] + 5 -> memory[1]",
"         // turn 90 degrees",
"         90 -> output[3]",
"         // decrement memory[0]",
"         memory[0] - 1 -> memory[0]",
"         // counter zero ?",
"         compare memory[0] to 0",
"         go loop if greater",
"         stop",
      ].join('\n'),
      memory: [],
      stack: [],
      input: []
   },

   recursive_factorial: {
      code: [
"           push input[0]",
"           call fact",
"           pop output[0]",
"           stop",
"",
"fact:      // check if argument is terminal case 0 or 1",
"           compare stack[0] to 1",
"           // if so, return with value 1",
"           go term if smaller_or_equal",
"           // push parameter for the recursive call",
"           push stack[0] - 1",
"           call fact",
"           // on return, the top of stack contains the result",
"           stack[0] * stack[1] -> stack[1]",
"           pop",
"           go end",
"term:      1 -> stack[0]",
"end:       return",
      ].join('\n'),
      memory: [],
      stack: [],
      input: [5]
   },

}

export { examples };
