
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
         "      input[0] -> data[0]\n" +
         "      data[0] -> data[1]\n" +
         "here: data[0] + data[1] -> data[1]\n" +
         "      data[0] - 1 -> data[0]\n" +
         "      compare data[0] to 0\n" +
         "      go here if greater\n" +
         "      data[1] -> output[0]\n" +
         "      stop      ",
      data: [1000, 1001],
      stack: [0],
   },

}

export { examples };
