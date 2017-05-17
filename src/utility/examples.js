
const examples = {

   input_output: {
      code:
         "here:  input[0] * input[0] -> output[0]\n" +
         "       go here",
      data: [],
      stack: [],
      input: [12]
   },

   sum_of_nth_first_integers: {
      code:
         "/* Compute the sum of the first integers\n" +
         "   up to the value entered in the 'Numeric input' field.\n" +
         "   Ex: 5 -> 1 + 2 + 3 + 4 + 5 = 15\n" +
         "   The result is visible in the 'Numeric output' field\n" +
         "*/\n" +
         "         input[0] -> data[0]\n" +
         "         0 -> data[1]\n" +
         "here:    compare data[0] to 0\n" +
         "         go end if smaller_or_equal\n" +
         "         data[0] + data[1] -> data[1]\n" +
         "         data[0] - 1 -> data[0]\n" +
         "         go here\n" +
         "end:     data[1] -> output[0]\n" +
         "         stop",
      data: [],
      stack: [],
      input: [5]
   },

   hello_world: {
      code: [
         "/* Display the string 'Hello World!' in the 'Screen' area\n" +
         "   at coordinates (30, 30)\n" +
         "   The string is in the data array, starting at address 1\n" +
         "   It is composed of ascii codes, ended by a zero\n" +
         "*/\n" +
         "			// data[0] holds current character address",
         "			1 -> data[0]",
         "			// set pen position to (30, 30)",
         "			30 -> output[1]",
         "			30 -> output[2]",
         "next:   compare data[data[0]] to 0",
         "			// check end of string",
         "			go end if equal",
         "			// write current character",
         "			data[data[0]] -> output[6]",
         "			data[0] + 1 -> data[0]",
         "			go next",
         "end:    stop"
      ].join('\n'),
      data: [0, 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33, 0],
      stack: [],
      input: []
   },

   fibonacci: {
      code: [
"/* Fibonacci series: 1, 1, 2, 3, 5, 8,...",
"   Each value is the sum of the two previous ones",
"   Values are computed and displayed continuously */",
"",
"         1 -> data[0]",
"         1 -> data[1]",
"         // compute next value",
"loop:    data[0] + data[1] -> data[2]",
"         // display value in 'Numeric output' box",
"         data[2] -> output[0]",
"         // shift last two values",
"         data[1] -> data[0]",
"         data[2] -> data[1]",
"         go loop",
      ].join('\n'),
      data: [],
      stack: [],
      input: []
   },

   spiral: {
      code: [
"/* Draw a spiral */",
"",
"         // move pen to (60, 60)",
"         60 -> out[1]",
"         60 -> out[2]",
"         // d[0]: counter",
"         20 -> d[0]",
"         // d[1]: line length",
"         10 -> d[1]",
"         // move pen with length d[1]",
"loop:    d[1] -> out[4]",
"         // add 5 to length",
"         d[1] + 5 -> d[1]",
"         // turn 90 degrees",
"         90 -> out[3]",
"         // decrement d[0]",
"         d[0] - 1 -> d[0]",
"         // counter zero ?",
"         compare d[0] to 0",
"         go loop if greater",
"         stop",
      ].join('\n'),
      data: [],
      stack: [],
      input: []
   },

   recursive_factorial: {
      code: [
"           push input[0]",
"           call fact",
"           pop out[0]",
"           stop",
"",
"fact:      compare stack[0] to 1",
"           go term if smaller_or_equal",
"           push stack[0] - 1",
"           call fact",
"           stack[0] * stack[1] -> stack[1]",
"           pop",
"           go end",
"term:      1 -> stack[0]",
"end:       return",
      ].join('\n'),
      data: [],
      stack: [],
      input: [5]
   },

}

export { examples };
