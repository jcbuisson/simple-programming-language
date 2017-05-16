<template>
   <div class="body">
      <div v-html="compiledMarkdown"></div>
   </div>
</template>


<script>
   import marked from 'marked'

   export default {
      data () {
         return {
            input: [

"## GitHub project",
"https://github.com/jcbuisson/simple-programming-language",

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
<style scoped>
.body {
  margin: 20px;
}

code {
  color: #f66;
  background: green;
}
</style>
