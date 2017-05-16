
<template>

   <div class="code-editor card no-block">

      <div class="card-header code-editor-header">

         <b-nav>
            <div class="navbar-brand">Code</div>       
            <div class="navbar-nav">     
               <b-nav-item-dropdown text="Examples">
                  <b-dropdown-item v-on:click="example('hello_world')">Hello world</b-dropdown-item>
                  <b-dropdown-item v-on:click="example('input_output')">input/output</b-dropdown-item>
                  <b-dropdown-item v-on:click="example('sum_of_nth_first_integers')">sum of the nth first integers</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item v-on:click="example('fibonacci')">Fibonacci series</b-dropdown-item>
               </b-nav-item-dropdown>
            </div>
         </b-nav>

         <!--nav class="navbar navbar-toggleable-md navbar-light bg-faded">
            <div class="navbar-brand" href="#">Code</div>
            <div class="collapse navbar-collapse">
               <ul class="navbar-nav mr-auto">
                        <b-nav-item-dropdown text="Examples" right-alignment>
                           <b-dropdown-item v-on:click="example('hello_world')">Hello world</b-dropdown-item>
                           <b-dropdown-item v-on:click="example('input_output')">input/output</b-dropdown-item>
                           <b-dropdown-item v-on:click="example('sum_of_nth_first_integers')">sum of the nth first integers</b-dropdown-item>
                           <b-dropdown-divider></b-dropdown-divider>
                           <b-dropdown-item v-on:click="example('fibonacci')">Fibonacci series</b-dropdown-item>
                        </b-nav-item-dropdown>
               </ul>
               <span class="nav-item">
                  <b-btn v-on:click="save" :disabled="false">
                     <i class="fa fa-save" style="font-size: 20px;" v-on:click="save"></i>
                  </b-btn>
                  <filedropbutton></filedropbutton>
               </span>
            </div>
         </nav-->

      </div>
      <div class="code-editor-body" style="overflow: auto;">
         <code-mirror v-bind:value="currentcode"
                      v-bind:options="editorOptions"
                      v-bind:styleactiveline="styleactiveline"
                      v-bind:selectedline="selectedline"
                      v-on:change="updatecode"
         ></code-mirror>
      </div>

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
      },
      created: function() {
         this.parseProgram(this.initialcode)
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
         updatecode: function(newcontent) {
            this.currentcode = newcontent
            this.parseProgram(newcontent)
         },

         // note the use of lodash's debounce function to prevent immediate and too frequent parsing
         parseProgram: debounce(function(code) {
            try {
               // syntactic analysis by PegJS
               let instructions = parser.parse(code)
               // semantic analysis
               let result = this.semanticAnalysis(instructions)
               if (result.errors.length === 0) {
                  this.$emit('programParsed', { 'instructions': instructions, 'symbols': result.symbols, 'useStack': result.useStack })
               } else {
                  let msg = result.errors.join('<br/>')
                  this.$emit('programError', msg)
               }
            } catch(err) {
               let msg = 'Line ' + (err.location.start.line - 1) + ', column ' + err.location.start.column + ': ' + err.message
               this.$emit('programError', msg)
            }
            this.$forceUpdate()
         }, 500),

         semanticAnalysis: function(instructions) {
            let symbols = {}
            let errors = []
            // check that no labels are defined twice and build a symbol table
            instructions.forEach(function(instruction, index) {
               if (instruction.label) {
                  let prevIndex = symbols[instruction.label]
                  if (prevIndex) {
                     errors.push('Line ' + instruction.line + ": symbol '" + instruction.label + "' already defined line " + instructions[prevIndex].line)
                  } else {
                     symbols[instruction.label] = index
                  }
               }
            })
            // then check that all labels referenced in 'go' instructions are defined
            instructions.forEach(function(instruction, index) {
               if (instruction.instruction.action === 'go') {
                  if (!symbols.hasOwnProperty(instruction.instruction.target)) {
                     errors.push('Line ' + instruction.line + ": symbol '<em>" + instruction.instruction.target + "</em>' does not exist")
                  }
               }
            })
            // then verify that 'input' is accessed read-only and 'output' write-only
            // TODO

            // then check whether stack is used or not
            let doNotUseStack = instructions.every(this.instructionDoNotUseStack);
            return { 'symbols': symbols, 'errors': errors, 'useStack': !doNotUseStack }
         },
         instructionDoNotUseStack: function(instruction) {
            if (instruction.instruction.action === 'copy') {
               return this.expressionDoNotUseStack(instruction.instruction.expr) && this.expressionDoNotUseStack(instruction.instruction.dest)
            } else if (instruction.instruction.action === 'push') {
               return false
            } else if (instruction.instruction.action === 'pop') {
               return false
            } else if (instruction.instruction.action === 'compare') {
               return this.expressionDoNotUseStack(instruction.instruction.expr1) && this.expressionDoNotUseStack(instruction.instruction.expr2)
            } else { // stop, go
               return true
            }
         },
         expressionDoNotUseStack: function(expr) {
            if (typeof expr === 'number') {
               return true;
            } else if (expr.hasOwnProperty('type')) {
               if (expr.type === 'stack') {
                  return false
               } else {
                  return this.expressionDoNotUseStack(expr.index)
               }
            } else {
               return this.expressionDoNotUseStack(expr.t1) && this.expressionDoNotUseStack(expr.t2)
            }
         },
      },
      data () {
         return {
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
.code-editor {
   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.code-editor-body {
   flex: 1;
   background: rgba(100, 0, 100, .1);
}

.code-editor-footer {
   margin-bottom: 0px;
}
</style>
