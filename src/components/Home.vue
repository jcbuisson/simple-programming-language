<template>
   <div>
      <top-bar v-bind:name="'home'" v-on:buttonclick="onButtonClick"></top-bar>
      <div v-html="compiledMarkdown" class="mymd"></div>
   </div>
</template>


<script>
   import marked from 'marked'

   import topbar from '@/components/TopBar'

   export default {
      components: {
         TopBar: topbar,
      },
      methods: {
         onButtonClick: function(name) {
            this.$emit('changeview', name)
         }
      },
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
