
const examples = {

   input_output: {
      code:
         "here:  input[0] * input[0] -> output[0]\n" +
         "       go here",
      data: [0.5, 1],
      stack: [0],
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

}

export { examples };
