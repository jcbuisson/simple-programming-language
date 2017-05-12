
const examples = {

   input_output: {
      code:
         "here:  input[0] * input[0] -> output[0]\n" +
         "       go here",
      data: [0.5, 1],
      stack: [0],
   },

   sum_of_nth_first_integers: {
      code:
         "/* Compute the sum of the first integers\n" +
         "   up to the value typed in the 'Numeric input' field.\n" +
         "   The result is visible in the 'Numeric output' field\n" +
         "*/\n" +
         "      input[0] -> data[0]\n" +
         "      data[0] -> data[1]\n" +
         "here: data[0] + data[1] -> data[1]\n" +
         "      data[0] - 1 -> data[0]\n" +
         "      compare data[0] to 0\n" +
         "      // the 'compare' instruction set the 'greater' boolean\n" +
         "      go here if greater\n" +
         "      data[1] -> output[0]\n" +
         "      stop",
      data: [1000, 1001],
      stack: [],
   },

}

export { examples };
