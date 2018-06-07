
<template>

   <div class="code-editor card no-block">

      <div class="card-header code-editor-header">

         <b-nav>
            <div class="navbar-brand">Code</div>       
            <div class="navbar-nav">     
               <b-nav-item-dropdown text="Examples">
                  <b-dropdown-item v-on:click="example('cube')">Cube calculator</b-dropdown-item>
                  <b-dropdown-item v-on:click="example('square')">Square drawing</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <!--b-dropdown-item v-on:click="example('fibonacci')">Fibonacci sequence</b-dropdown-item-->
                  <b-dropdown-item v-on:click="example('sum_of_nth_first_integers')">Sum of the nth first integers</b-dropdown-item>
                  <b-dropdown-item v-on:click="example('polygon')">Polygon</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item v-on:click="example('hello_world')">Hello world</b-dropdown-item>
                  <!--b-dropdown-item v-on:click="example('spiral')">Spiral</b-dropdown-item-->
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item v-on:click="example('recursive_factorial')">Recursive factorial</b-dropdown-item>
               </b-nav-item-dropdown>
            </div>
         </b-nav>

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
   import union from 'lodash/union'
   import assign from 'lodash/assign'

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
                  this.$emit('programParsed', assign(result, { 'instructions': instructions }))
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
                     errors.push('Line ' + instruction.instruction.line + ": symbol '" + instruction.label +
                                 "' already defined line " + instructions[prevIndex].instruction.line)
                  } else {
                     symbols[instruction.label] = index
                  }
               }
            })
            // then check that all labels referenced in 'go' instructions are defined
            instructions.forEach(function(instruction, index) {
               if (instruction.instruction.action === 'go') {
                  if (!symbols.hasOwnProperty(instruction.instruction.target)) {
                     errors.push('Line ' + instruction.instruction.line + ": symbol '<em>" + instruction.instruction.target + "</em>' does not exist")
                  }
               }
            })
            // then verify that 'input' is accessed read-only and 'output' write-only
            // TODO

            // collect of types of arrays used in the program
            let this_ = this
            let arrayTypes = instructions.reduce(function(accu, instruction) {
               return union(accu, this_.instructionArrayTypes(instruction))
            }, [])

            // collect of code operations used in the program
            let operations = instructions.reduce(function(accu, instruction) {
               return union(accu, [instruction.instruction.action])
            }, [])

            let useCallStack = instructions.some(function(instruction) { return this_.instructionUseCallStack(instruction) })

            return { 'symbols': symbols, 'errors': errors, 'arrayTypes': arrayTypes, 'operations': operations }
         },

         instructionUseCallStack: function(instruction) {
            return (instruction.instruction.action !== 'call' && instruction.instruction.action !== 'return')
         },

         expressionArrayTypes: function(expr) {
            if (typeof expr === 'number') {
               return [];
            } else if (expr.hasOwnProperty('type')) {
               return [expr.type]
            } else {
               return union(this.expressionArrayTypes(expr.t1), this.expressionArrayTypes(expr.t2))
            }
         },
         instructionArrayTypes : function(instruction) {
            if (instruction.instruction.action === 'copy') {
               return union(this.expressionArrayTypes(instruction.instruction.expr), this.expressionArrayTypes(instruction.instruction.dest))
            } else if (instruction.instruction.action === 'push') {
               return this.expressionArrayTypes(instruction.instruction.expr)
            } else if (instruction.instruction.action === 'pop' && instruction.instruction.dest) {
               return this.expressionArrayTypes(instruction.instruction.dest)
            } else if (instruction.instruction.action === 'compare') {
               return union(this.expressionArrayTypes(instruction.instruction.expr1), this.expressionArrayTypes(instruction.instruction.expr2))
            } else {
               return []
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


<style scoped>

/* styling de .Codemirror : voir App.vue */

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
