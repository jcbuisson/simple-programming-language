
<template>

   <div class="code-editor card no-block">

      <div class="card-header">
         <b-nav>
            <div class="navbar-brand">{{ title }}</div>            
            <b-nav-item-dropdown text="Examples" right-alignment>
               <b-dropdown-item v-on:click="example1">Simple 1</b-dropdown-item>
               <b-dropdown-item>Simple 2</b-dropdown-item>
               <b-dropdown-divider></b-dropdown-divider>
               <b-dropdown-item>Intermediate 1</b-dropdown-item>
               <b-dropdown-item>Intermediate 2</b-dropdown-item>
            </b-nav-item-dropdown>
         </b-nav>
      </div>
      <code-mirror v-bind:value="currentcode" v-on:change="update"></code-mirror>
      <b-alert show v-bind:variant="variant"> {{ status }} </b-alert>

   </div>

</template>

<script>
   import codemirror from '@/components/CodeMirror'
   import parser from '../utility/parser.js'
   import debounce from 'lodash/debounce'

   export default {
      components: { CodeMirror: codemirror },
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
         example1: function() {
            console.log('Example 1');
         },
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
