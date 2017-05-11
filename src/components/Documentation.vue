<template>
   <div class="documentation">

      <h3>Introduction</h3>
      This plateform is a sandbox to make experiments with SPL, a simple programming language.
      You'll be able to write simple programs in this language, and run them to verify their execution

      <h3>Language concepts</h3>

      <h4>Program and instructions</h4>
      <ul>
         <li>A <em>program</em> is a list of <em>instructions</em> written in the <em>Code</em> area. You should not place more
         than one instruction per line.
         </li>
      </ul>

      <h4>Input / Output</h4>

      <h5>Input, or how to get information from the outside world</h5>
      <p>
         The only way to get information from the outside world is to read the <code>input</code> array, each location of which being dedicated
         to a particular input aspect. For example, <code>input[0]</code> continuously reflects the content of the input box situated in the middle-right
         part of the sandbox:
      </p>
      <p><img src="azer"/></p>
      <p>
         The <code>input</code> array is displayed in the sandbox, but it cannot be modified directly, since it is a read-only data array.
         Its content may be modified only through interactions with the outside world.
      </p>

      <h5>Output, or how to act on the outside world</h5>
      <p>
         Similarly, the only way to act on the outside world is to write in the <code>output</code> array, each location of which being dedicated
         to a particular output or acting aspect. For example, writing a number into <code>output[0]</code> has the effect of displaying
         this number in the output field situated in the middle-right part of the sandbox:
      </p>
      <p><img src="azer"/></p>
      <p>
         The <code>output</code> array cannot be displayed in the sandbox, since it is a write-only data array.
      </p>

      <h5>Example</h5>
      <p>
         The following program continuously computes and displays the square of the value typed in the input box :
         <pre>
here:  input[0] * input[0] -> output[0]
       go here
         </pre>
      </p>

   </div>
</template>


<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.documentation {
    margin: 10px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
