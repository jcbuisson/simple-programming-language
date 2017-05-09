
const examples = {

   input_output:
      "here:  in[0] * in[0] -> out[0]\n" +
      "       go here",

   sum_of_nth_first_integers:
      "      input[0] -> data[0]\n" +
      "      data[0] -> data[1]\n" +
      "here: data[0] + data[1] -> data[1]\n" +
      "      data[0] - 1 -> data[0]\n" +
      "      go_if_not_zero here\n" +
      "      data[1] -> output[0]\n" +
      "      stop      "

}

export { examples };
