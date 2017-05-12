
<template>

   <div class="code-editor card no-block">

      <div class="card-header">
         <b-nav>
            <div class="navbar-brand">{{ title }}</div>            
            <b-nav-item-dropdown text="Examples" right-alignment>
               <b-dropdown-item v-on:click="example('input_output')">input/output</b-dropdown-item>
               <b-dropdown-item v-on:click="example('sum_of_nth_first_integers')">sum of the nth first integers</b-dropdown-item>
               <b-dropdown-divider></b-dropdown-divider>
               <b-dropdown-item>Intermediate 1</b-dropdown-item>
               <b-dropdown-item>Intermediate 2</b-dropdown-item>
            </b-nav-item-dropdown>
         </b-nav>
      </div>
      <code-mirror v-bind:value="currentcode"
                   v-bind:options="editorOptions"
                   v-bind:styleactiveline="styleactiveline"
                   v-bind:selectedline="selectedline"
                   v-on:change="update"
      ></code-mirror>
      <b-alert show v-bind:variant="variant"> {{ status }} </b-alert>

   </div>

</template>

<script>
   import codemirror from '@/components/CodeMirror'
   import parser from '../utility/parser.js'
   import debounce from 'lodash/debounce'

   //import { event } from '../utility/eventBus.js'
   //event.init()

   export default {
      components: {
         CodeMirror: codemirror,
      },
      props: {
         title: String,
         initialcode: String,
         styleactiveline: Boolean,
         selectedline: Number,
      },
      computed: {
         currentcode: function() {
            return this.initialcode
         },
         variant: function() {
            return this.err ? 'warning' : 'success'
         },
      },
      mounted: function () {
         /*event.on('select-line', function(lineno) {
            console.log('select-line ' + lineno)
         })*/
      },
      methods: {
         example: function(exampleName) {
            this.$emit('exampleLoaded', exampleName)
         },
         update: function(newcontent) {
            this.currentcode = newcontent
            this.parseProgram(newcontent)
         },
         // note the use of lodash's debounce function to prevent immediate and too frequent parsing
         parseProgram: debounce(function(code) {
            try {
               let parsedProgram = parser.parse(code)
               this.err = null
               this.status = '✓ No error'
               this.$emit('programParsed', parsedProgram)
            } catch(err) {
               this.err = err
               this.status = 'Line ' + err.location.start.line + ', column ' + err.location.start.column + ': ' + err.message
               this.$emit('programError')
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
            editorOptions: {
               mode: "text/BIDON",
               styleActiveLine: this.styleactiveline,
               lineWrapping: true,
               tabSize: 3,
               lineNumbers: true,
               //styleSelectedText: true,
               firstLineNumber: 0,
            }
         }
      },
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
