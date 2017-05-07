
<template>

   <div class="code-editor card no-block">

      <div class="card-header">
         <ul class="nav nav-navs card-header-navs">
            <div class="navbar-brand">{{ title }}</div>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Examples
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
               <div class="dropdown-item">Example 1</div>
               <div class="dropdown-item">Example 2</div>
               <div class="dropdown-item">Example 3</div>
            </div>
            </li>
         </ul>
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
