
<template>
   <div class="code-editor">
      <titled-editor variant="warning" class="editor" v-bind:title="title" v-bind:initialcontent="currentcode" v-on:contentchanged="update"></titled-editor>
      <b-alert show v-bind:variant="variant"> {{ status }} </b-alert>
   </div>
</template>

<script>
   import titled from '@/components/TitledEditor'
   import parser from '../utility/parser.js'
   import debounce from 'lodash/debounce'

   export default {
      components: { TitledEditor: titled },
      props: {
         title: String,
         initialcode: String,
      },
      computed: {
         currentcode: function() {
            return this.initialcode
         },
         variant: function() {
            return this.err ? 'warning' : 'success'
         },
      },
      methods: {
         update: function(newcontent) {
            this.currentcode = newcontent
            this.parseProgram(newcontent)
         },
         parseProgram: debounce(function(code) {
            try {
               let x = parser.parse(code)
               this.err = null
               this.status = '✓ No error'
            } catch(err) {
               this.err = err
               this.status = 'Line ' + err.location.start.line + ', column ' + err.location.start.column + ': ' + err.message
            }
            this.$forceUpdate()
         }, 500),
      },
      created: function() {
         this.parseProgram(this.initialcode)
      },
      data () {
         return {
            status: '',
            err: null,
         }
      },
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
