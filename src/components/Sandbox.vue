<template>

<div class="sandbox">
    
   <div class="main-panel">
      <div class="main-panel-left">
         <div class="code-editor-panel">
            <code-editor v-bind:title="'Code'"
                         v-bind:initialcode="code"
                         v-bind:styleactiveline="true"
                         v-bind:selectedline="currentInstructionLine"
                         v-on:exampleLoaded="onExampleLoaded"
                         v-on:programParsed="onProgramParsed"
                         v-on:programError="onProgramError"
            ></code-editor>
         </div>
         <div class="debug-toolbar-panel">
            <b-button-group class="debug-btn-panel">
               <b-popover content="Reset" :triggers="['hover']">
                  <b-btn v-on:click="reset" :disabled="state.tag !== 'code-ok'" class="debug-btn">
                     <i class="fa fa-stop"></i>
                  </b-btn>
               </b-popover>
               <b-popover content="Run/Pause" :triggers="['hover']">
                  <b-btn v-on:click="runstop" :disabled="state.tag !== 'code-ok'" class="debug-btn play-btn">
                     <i class="fa" v-bind:class="{ 'fa-pause': state.running, 'fa-play': !state.running }"></i>
                  </b-btn>
               </b-popover>
               <b-popover content="Step" :triggers="['hover']">
                  <b-btn v-on:click="step" :disabled="state.tag !== 'code-ok'" class="debug-btn">
                     <i class="fa fa-step-forward"></i>
                  </b-btn>
               </b-popover>
            </b-button-group>
         </div>
      </div>
      <div class="main-panel-right">
         <div class="memory-panel">
            <div class="data-panel">
               <memory-editor :numberarray="data_array" :title="'Data'" v-bind:styleactiveline="false"></memory-editor>
            </div>
            <div class="stack-panel" v-if="true">
               <memory-editor :numberarray="stack_array" :title="'Stack'"></memory-editor>
            </div>
            <div class="input-panel">
               <memory-editor :numberarray="input_array" :title="'Input'"></memory-editor>
            </div>
         </div>
         <div class="input-output-panel">
            <div class="input0-output0-panel">
               <div class="card input0-panel">
                  <div class="card-header">Numeric input (see <a href="#/documentation" target="_blank">input[0]</a>)</div>
                  <div class="card-block">
                     <input type="number" v-model="input_array[0]">
                  </div>
               </div>
               <div class="card output0-panel">
                  <div class="card-header">Numeric output (see <a href="#/documentation" target="_blank">output[0]</a>)</div>
                  <div class="card-block"><h5>{{ numericOutput }}</h5></div>
               </div>
               <div class="card compare-panel">
                  <div class="card-header">Last compare</div>
                  <div class="card-block">{{ compareDifference }}</div>
               </div>
            </div>
            <div class="screen-panel">SCREEN</div>
         </div>
      </div>
   </div>
</div>

</template>


<script>
   import codemirror from '@/components/CodeMirror'
   import codeditor from '@/components/CodeEditor'
   import memoryeditor from '@/components/MemoryEditor'
   import screen from '@/components/Screen'

   //import { event } from '../utility/eventBus.js'
   //event.init()

   //import { store } from '../utility/store.js'
   import { examples } from '../utility/examples.js'

   import parser from '../utility/parser.js'

   import concat from 'lodash/concat'
   import slice from 'lodash/slice'
   import fill from 'lodash/fill'


   export default {
      components: {
         CodeEditor: codeditor,
         MemoryEditor: memoryeditor,
         Screen: screen,
         CodeMirror: codemirror,
      },
      data () {
         return {
            code: '',
            state: { 'code': 'code-empty' },
            data_array: [],
            stack_array: [],
            input_array: [0],
            numericOutput: 0,
            compareDifference: 0,
         }
      },
      computed: {
         currentInstructionLine: function() {
            if (this.state.tag === 'code-ok') {
               return this.state.program.instructions[this.state.currentInstructionIndex].line
            } else {
               return -1;
            }
         },
      },
      methods: {
         reset: function() {
            this.state.currentInstructionIndex = 0
         },
         step: function() {
            // event.emit('select-line', 5)
            if (this.state.currentInstructionIndex < this.state.program.instructions.length) {
               this.executeInstruction(this.state.program.instructions[this.state.currentInstructionIndex], this.state.program.symbols)
            }
         },
         runstop: function() {
            this.state.running = !this.state.running
            if (this.state.running) {
               this.run()
            } else {
               this.stop()
            }
         },
         run: function() {
            this.data_array = [999].concat(this.data_array.slice(1))
         },
         stop: function() {
            this.data_array = [-999].concat(this.data_array.slice(1))
         },
         onExampleLoaded: function(exampleName) {
            let example = examples[exampleName]
            this.code = example.code
            this.data_array = example.data
            this.stack_array = example.stack
         },
         onProgramParsed: function(program) {
            if (program.instructions.length === 0) {
               this.state = { 'tag': 'code-empty' }
            } else {
               if (this.state.tag !== 'code-ok') {
                  this.state = { 'tag': 'code-ok', 'program': program, 'currentInstructionIndex': 0, 'running': false }
               }
            }
         },
         onProgramError: function() {
            this.state = { 'tag': 'code-error' }
         },
         executeInstruction: function(instruction, symbols) {
            if (instruction.instruction.action === 'copy') {
               let expr = instruction.instruction.expr
               let dest = instruction.instruction.dest
               let exprValue = this.evaluateExpression(expr)
               if (dest.type === 'data') {
                  this.setDataElementAt(dest.index, exprValue)
               } else if (dest.type === 'stack') {

               } else if (dest.type === 'output') {
                  this.setOutputElementAt(dest.index, exprValue)
               }
               this.state.currentInstructionIndex += 1

            } else if (instruction.instruction.action === 'compare') {
               let expr1Value = this.evaluateExpression(instruction.instruction.expr1)
               let expr2Value = this.evaluateExpression(instruction.instruction.expr2)
               this.compareDifference = expr1Value - expr2Value
               this.state.currentInstructionIndex += 1

            } else if (instruction.instruction.action === 'go') {
               let target = instruction.instruction.target
               if (instruction.instruction.condition === true ||
                   (instruction.instruction.condition === 'equal' && this.compareDifference === 0) ||
                   (instruction.instruction.condition === 'greater' && this.compareDifference > 0) ||
                   (instruction.instruction.condition === 'greater_or_equal' && this.compareDifference >= 0) ||
                   (instruction.instruction.condition === 'smaller' && this.compareDifference < 0) ||
                   (instruction.instruction.condition === 'smaller_or_equal' && this.compareDifference <= 0)
               ) {
                  this.state.currentInstructionIndex = symbols[target]
               } else {
                  this.state.currentInstructionIndex += 1
               }
            }
         },
         evaluateExpression: function(expression) {
            if (typeof expression === "number") {
               return expression
            } else if (expression.hasOwnProperty('type')) {
               let indexExpr = expression.index
               let index = this.evaluateExpression(indexExpr)
               if (expression.type === 'data') {
                  return this.getDataElementAt(index)
               } else if (expression.type === 'stack') {
                  return this.stack_array[index]
               } else if (expression.type === 'input') {
                  return this.getInputElementAt(index)
               }
            } else if (expression.hasOwnProperty('op')) {
               let t1 = this.evaluateExpression(expression.t1)
               let t2 = this.evaluateExpression(expression.t2)
               if (expression.op === '+') {
                  return t1 + t2
               } else if (expression.op === '-') {
                  return t1 - t2
               } else if (expression.op === '*') {
                  return t1 * t2
               } else if (expression.op === '/') {
                  return t1 / t2
               }
            }
         },
         getDataElementAt: function(index) {
            if (index >= this.data_array.length) {
               // add zeros up to index
               let zeros = fill(Array(index-this.data_array.length+1), 0)
               this.data_array = concat(this.data_array, zeros)
            }
            return this.data_array[index]
         },
         setDataElementAt: function(index, value) {
            if (index >= this.data_array.length) {
               // add zeros up to index
               let zeros = fill(Array(index-this.data_array.length+1), 0)
               this.data_array = concat(this.data_array, zeros)
            }
            let left = slice(this.data_array, 0, index)
            let right = slice(this.data_array, index+1)
            this.data_array = concat(left, value, right)
         },
         getInputElementAt: function(index) {
            if (index === 0) {
               return parseInt(this.input_array[0])
            }
         },
         setOutputElementAt: function(index, value) {
            if (index === 0) {
               this.numericOutput = value
            }
         },
      },
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.sandbox {
   width: 100%;
   height: 100%;

   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.header-panel {
   margin-top: 10px;
   margin-left: 10px;
   margin-right: 10px;
   margin-bottom: 5px;
}

.main-panel {
   flex: 1;

   display: flex;
   flex-direction: row;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.main-panel-left {
   flex: 1;

   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;

   margin-top: 5px;
   margin-left: 10px;
   margin-right: 5px;
   margin-bottom: 10px;
}

.code-editor-panel {
   flex: 1;
   background: rgba(100, 0, 100, .1);
   margin-bottom: 5px;
}
/*
.debug-toolbar-panel {
   display: flex;
   flex-direction: column;  
   align-items: center;
   justify-content: center;
}

.debug-btn-panel {
   align-items: center;
   justify-content: center;
}

.debug-btn {
   text-align: center;
}

.play-btn {
  width: 60px;
  height: 60px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 40px;
}
*/
.main-panel-right {
   flex: 1;

   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;

   margin-top: 5px;
   margin-left: 5px;
   margin-right: 10px;
   margin-bottom: 10px;
}

.memory-panel {
   flex: 3;

   display: flex;
   flex-direction: row;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.data-panel {
   flex: 1;
   background: rgba(100, 0, 0, .1);
   margin-right: 5px;
}

.stack-panel {
   flex: 1;
   background: rgba(0, 100, 0, .1);
   margin-left: 5px;
   margin-right: 5px;
}

.input-panel {
   flex: 1;
   background: rgba(0, 0, 100, .1);
   margin-left: 5px;
}

.input-output-panel {
   flex: 5;

   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.input0-output0-panel {
   display: flex;
   flex-direction: row;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.input0-panel {
   flex: 5;
}

.output0-panel {
   flex: 5;
}

.compare-panel {
   flex: 5;
}

/*.keyboard-panel {
   background: rgba(100, 0, 0, .1);
   margin-top: 10px;
   margin-bottom: 5px;
}*/

.screen-panel {
   flex: 1;
   background: rgba(0, 100, 0, .1);
   margin-top: 5px;
}

.card .card-block {
   padding-top: 10px;
   padding-bottom: 0px;
}

</style>
