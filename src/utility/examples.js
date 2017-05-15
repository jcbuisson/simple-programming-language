
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
         "			2 -> data[0]",
         "next:   compare data[data[0]] to 0",
         "			go end if equal",
         "			data[data[0]] -> output[6]",
         "			data[0] + 1 -> data[0]",
         "			go next",
         "end:    stop"
      ].join('\n'),
      data: [0, 0, 97, 98, 99, 0],
      stack: [],
      input: []
   },

   fibonacci: {
      code: [
"/* Fibonacci series: 1, 1, 2, 3, 5, 8,...",
"   Next value is the sum of the two previous one",
"   Computes and displays continuously the series values */",
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
   }

}

export { examples };
