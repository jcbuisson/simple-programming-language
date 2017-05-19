<template>

<div class="sandbox">
    
   <div class="main-panel">
      <div class="main-panel-left">
         <div class="code-panel">
            <code-editor class="code-editor"
                         v-bind:title="'Code'"
                         v-bind:initialcode="code"
                         v-bind:styleactiveline="false"
                         v-bind:selectedline="currentInstructionLine"
                         v-on:exampleLoaded="onExampleLoaded"
                         v-on:programParsed="onProgramParsed"
                         v-on:programError="onProgramError"
            ></code-editor>
         </div>
         <div>
            <b-alert class="code-status" show
                     v-bind:variant="messageColor"
                     v-if="statusBarVisibility">
                <div v-html="state.msg"></div>
            </b-alert>
         </div>
         <div class="debug-toolbar-panel">
            <file-drop-button class="file-drop-panel" v-on:backup="onBackup" v-on:restore="onRestore"></file-drop-button>
            <div class="debug-empty-panel"></div>
            <b-button-group class="debug-btn-panel">
               <b-popover content="Reset" :triggers="['hover']" :delay="{show: 500, hide: 0}">
                  <b-btn v-on:click="reset" :disabled="!isCodeOk || isRunning" class="debug-btn">
                     <i class="fa fa-stop"></i>
                  </b-btn>
               </b-popover>
               <b-popover content="Run/Pause" :triggers="['hover']" :delay="{show: 500, hide: 0}">
                  <b-btn v-on:click="run_pause" :disabled="!isRunningPossible" class="debug-btn play-btn">
                     <i class="fa" v-bind:class="{ 'fa-pause': isRunning, 'fa-play': !isRunning }"></i>
                  </b-btn>
               </b-popover>
               <b-popover content="Step" :triggers="['hover']" :delay="{show: 500, hide: 0}">
                  <b-btn v-on:click="step" :disabled="!isRunningPossible || isRunning" class="debug-btn">
                     <i class="fa fa-step-forward"></i>
                  </b-btn>
               </b-popover>
            </b-button-group>
         </div>
      </div>
      <div class="main-panel-right">
         <div class="memory-panel">
            <div class="data-panel">
               <memory-editor class="data-editor"
                              :numberarray="data_array"
                              :title="'Data'"
                              v-bind:styleactiveline="false"
                              v-bind:readonly="false"
                              v-on:memoryChange="dataEdited"
               ></memory-editor>
            </div>
            <div class="stack-panel" v-if="isCodeOk && (isCodeUsingStack || isCodeUsingCallStack)">
               <memory-editor class="stack-editor"
                              v-if="isCodeUsingStack"
                              :numberarray="stack_array"
                              :title="'Stack'"
                              v-bind:styleactiveline="false"
                              v-bind:readonly="true"
               ></memory-editor>
               <memory-editor class="callstack-editor"
                              v-if="isCodeUsingCallStack"
                              :numberarray="callstack_array"
                              :title="'Call stack'"
                              v-bind:styleactiveline="false"
                              v-bind:readonly="true"
               ></memory-editor>
            </div>
            <div class="input-panel">
               <memory-editor class="input-editor"
                              :numberarray="input_array"
                              v-bind:readonly="true"
                              :title="'Input'"
               ></memory-editor>
            </div>
         </div>
         <div class="input0-output0-panel" style="max-height: 120px;">
            <div class="card input0-panel">
                <div class="card-header">Numeric input</div>
                <div class="card-block">
                    <input type="number" v-model="input_array[0]">
                </div>
            </div>
            <div class="card output0-panel">
                <!--div class="card-header">Numeric output (see <a href="#/documentation" target="_blank">output[0]</a>)</div-->
                <div class="card-header">Numeric output</div>
                <div class="card-block" style="font-size: 20px; font-weight: bold;">{{ numericOutput }}</div>
            </div>
            <div class="card compare-panel">
                <div class="card-header">Last compare status</div>
                <div class="card-block compare-buttons-panel">
                    <div class="btn-group">
                    <a href="#" class="btn btn-info btn-sm" v-bind:class="{ active: compareSmaller }">smaller</a>
                    <a href="#" class="btn btn-info btn-sm" v-bind:class="{ active: compareEqual }">equal</a>
                    <a href="#" class="btn btn-info btn-sm" v-bind:class="{ active: compareGreater }">greater</a>
                    </div>
                </div>
            </div>
         </div>
         <div class="screen-panel">
            <screen v-bind:title="'Screen'"
                    v-bind:commands="canvasCommands"
                    v-on:penmoved="onPenMoved"
            ></screen>
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
   import filedropbutton from '@/components/FileDropButton'

   //import { event } from '../utility/eventBus.js'
   //event.init()

   import { examples } from '../utility/examples.js'

   import parser from '../utility/parser.js'

   import FileSaver from 'file-saver'

   import concat from 'lodash/concat'
   import slice from 'lodash/slice'
   import fill from 'lodash/fill'


   export default {
      components: {
         CodeEditor: codeditor,
         MemoryEditor: memoryeditor,
         Screen: screen,
         CodeMirror: codemirror,
         FileDropButton: filedropbutton,
      },
      data () {
         return {
            code: '',
            state: { 'code': 'code-empty' },
            data_array: [],
            stack_array: [],
            callstack_array: [],
            input_array: [0],
            numericOutput: 0,
            initialContext: { 'code': '', 'data': [], 'stack': [], 'input': [] },
            compareDifference: null,
            timerHandle: null,
            canvasCommands: [],
            penPosition: { 'x': 0, 'y': 0 },
         }
      },
      computed: {
         currentInstructionLine: function() {
            if (this.state.tag === 'code-ok') {
               if (this.state.currentInstructionIndex < this.state.program.instructions.length) {
                  return this.state.program.instructions[this.state.currentInstructionIndex].line
               } else {
                  this.state.msg = "Runtime error: execution went past end of program"
                  this.state.runningstatus = 'runtime-error'
                  clearInterval(this.timerHandle)
                  return this.state.program.instructions[this.state.program.instructions.length-1].line + 1
               }
            } else {
               return -1
            }
         },
         compareEqual: function() {
            return (this.compareDifference != null) && (this.compareDifference === 0)
         },
         compareSmaller: function() {
            return (this.compareDifference != null) && (this.compareDifference < 0)
         },
         compareGreater: function() {
            return (this.compareDifference != null) && (this.compareDifference > 0)
         },
         messageColor: function() {
            if (this.state.tag === 'code-ok') {
                if (this.state.runningstatus === 'runtime-error') {
                   return 'danger'
                } else {
                   return 'success'
                }
            } else {
                return 'warning'
            }
         },
         statusBarVisibility: function() {
             if (this.state.tag === 'code-error') {
                 return true
             } else if (this.state.tag === 'code-ok') {
                 return (this.state.runningstatus === 'idle' || this.state.runningstatus === 'stopped' || this.state.runningstatus === 'runtime-error')
             } else {
                 return false
             }
         },
         isCodeOk: function() {
            return (this.state.tag === 'code-ok')
         },
         isCodeUsingStack: function() {
            return (this.state.program && this.state.program.useStack)
         },
         isCodeUsingCallStack: function() {
            return (this.state.program && this.state.program.useCall)
         },
         isRunningPossible: function() {
            if (this.state.tag === 'code-ok') {
               return (this.state.runningstatus === 'idle' || this.state.runningstatus === 'pause' || this.state.runningstatus === 'running')
            } else {
               return false
            }
         },
         isRunning: function() {
             return (this.state.runningstatus === 'running')
         }
      },
      methods: {
         reset: function() {
            this.loadContext(this.initialContext)
            this.state.msg = "Program reset and ready to run!"
            this.state.runningstatus = 'idle'
            this.state.currentInstructionIndex = 0
         },
         step: function() {
            // event.emit('select-line', 5)
            if (this.state.currentInstructionIndex < this.state.program.instructions.length) {
               this.executeInstruction(this.state.program.instructions[this.state.currentInstructionIndex], this.state.program.symbols)
            } else {
               this.state.msg = "Runtime error: execution went past end of program"
               this.state.runningstatus = 'runtime-error'
               clearInterval(this.timerHandle)
            }
         },
         run_pause: function() {
            if (this.state.runningstatus === 'idle' || this.state.runningstatus === 'pause') {
               this.state.runningstatus = 'running'
               this.run()
            } else {
               this.state.runningstatus = 'pause'
               this.pause()
            }
         },
         run: function() {
            this.timerHandle = setInterval(function () {
               this.step();
            }.bind(this), 5);
         },
         pause: function() {
            this.state.runningstatus = 'pause'
            clearInterval(this.timerHandle)
         },
         stop: function() {
            this.state.msg = "Program stopped"
            this.state.runningstatus = 'stopped'
            clearInterval(this.timerHandle)
         },
         onExampleLoaded: function(exampleName) {
            let example = examples[exampleName]
            this.initialContext = example
            this.loadContext(example)
         },
         onBackup: function() {
            let content = JSON.stringify({ 'code': this.code, 'data': this.data_array, 'stack': this.stack_array, 'input': this.input_array })
            let blob = new Blob([content], {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(blob, "program.txt");
         },
         onRestore: function(jsonDump) {
            this.loadContext(JSON.parse(jsonDump))
         },
         loadContext: function(context) {
            this.initialContext = context
            this.code = context.code
            this.data_array = context.data
            this.stack_array = context.stack
            this.input_array = context.input
            // reset other parts
            this.numericOutput = 0
            this.compareDifference = null
            this.canvasCommands = []
            clearInterval(this.timerHandle)
         },
         onProgramParsed: function(program) {
            if (program.instructions.length === 0) {
               this.state = { 'tag': 'code-empty' }
            } else {
               let msg = '✓ Program ok and ready to run!'
               this.state = { 'tag': 'code-ok', 'program': program, 'currentInstructionIndex': 0, 'runningstatus': 'idle', 'msg': msg }
            }
         },
         onProgramError: function(errorMessage) {
            this.state = { 'tag': 'code-error', 'msg': errorMessage }
         },
         setArrayElementAt: function(type, index, value) {
            if (type === 'data') {
                this.setDataElementAt(index, value)
            } else if (type === 'stack') {
                this.setStackElementAt(index, value)
            } else if (type === 'output') {
                this.setOutputElementAt(index, value)
            }
         },
         executeInstruction: function(instruction, symbols) {
            if (instruction.instruction.action === 'copy') {
               let expr = instruction.instruction.expr
               let dest = instruction.instruction.dest
               let exprValue = this.evaluateExpression(expr)
               this.setArrayElementAt(dest.type, dest.index, exprValue)
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

            } else if (instruction.instruction.action === 'push') {
               let exprValue = this.evaluateExpression(instruction.instruction.expr)
               this.stack_array = [exprValue].concat(this.stack_array)
               this.state.currentInstructionIndex += 1

            } else if (instruction.instruction.action === 'pop') {
               let dest = instruction.instruction.dest
               if (dest) {
                  this.setArrayElementAt(dest.type, dest.index, this.getStackElementAt(0))
               }
               if (this.stack_array.length > 0) {
                  this.stack_array = this.stack_array.slice(1)
               } else {
                  this.state.msg = "Runtime error: stack is empty"
                  this.state.runningstatus = 'runtime-error'
                  clearInterval(this.timerHandle)
               }
               this.state.currentInstructionIndex += 1

            } else if (instruction.instruction.action === 'call') {
               let target = instruction.instruction.target
               this.callstack_array = [this.state.currentInstructionIndex+1].concat(this.callstack_array)
               this.state.currentInstructionIndex = symbols[target]

            } else if (instruction.instruction.action === 'return') {
               if (this.callstack_array.length > 0) {
                  this.state.currentInstructionIndex = this.callstack_array[0]
                  this.callstack_array = this.callstack_array.slice(1)
               } else {
                  this.state.msg = "Runtime error: call stack is empty"
                  this.state.runningstatus = 'runtime-error'
                  clearInterval(this.timerHandle)
               }

            } else if (instruction.instruction.action === 'stop') {
               this.stop()
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
                  return this.getStackElementAt(index)
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
         getStackElementAt: function(index) {
            if (index >= this.stack_array.length) {
               // add zeros up to index
               let zeros = fill(Array(index-this.stack_array.length+1), 0)
               this.stack_array = concat(this.stack_array, zeros)
            }
            return this.stack_array[index]
         },
         setStackElementAt: function(index, value) {
            if (index >= this.stack_array.length) {
               // add zeros up to index
               let zeros = fill(Array(index-this.stack_array.length+1), 0)
               this.stack_array = concat(this.stack_array, zeros)
            }
            let left = slice(this.stack_array, 0, index)
            let right = slice(this.stack_array, index+1)
            this.stack_array = concat(left, value, right)
         },
         getInputElementAt: function(index) {
            if (index === 0) {
               let value = parseFloat(this.input_array[0])
               return isNaN(value) ? 0 : value
            }
         },
         setOutputElementAt: function(index, value) {
            if (index === 0) {
               this.numericOutput = value

            } else if (index === 1) {
               this.canvasCommands = this.canvasCommands.concat([{ 'type': 'pen-position-x', 'value': value }])
            } else if (index === 2) {
               this.canvasCommands = this.canvasCommands.concat([{ 'type': 'pen-position-y', 'value': value }])
            } else if (index === 3) {
               this.canvasCommands = this.canvasCommands.concat([{ 'type': 'turn', 'value': value }])
            } else if (index === 4) {
               this.canvasCommands = this.canvasCommands.concat([{ 'type': 'move', 'value': value }])

            } else if (index === 6) {
               this.canvasCommands = this.canvasCommands.concat([{ 'type': 'write-char', 'value': value }])
            }
         },
         dataEdited: function(newArray) {
            this.data_array = newArray
         },
         stackEdited: function(newArray) {
            this.stack_array = newArray
         },
         onPenMoved: function(penPosition) {
            console.log('pen moved ' + penPosition)
            this.penPosition = penPosition
         }
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

.code-panel {
   flex: 1;
   /*background: rgba(100, 0, 100, .2);*/

   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.code-editor {
   flex: 1;
}

.debug-toolbar-panel {
   display: flex;
   flex-direction: row;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.debug-empty-panel {
   flex: 1;
}

.code-status {
   flex: 1;
   margin-bottom: 0px;
}
/*
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
   flex: 5;

   display: flex;
   flex-direction: row;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.data-panel {
   flex: 1;

   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;

   margin-right: 5px;
}

.data-editor {
    flex: 1;
}

.stack-panel {
   flex: 1;

   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;

   margin-left: 5px;
   margin-right: 5px;
}

.stack-editor {
    flex: 2;
}

.callstack-editor {
    flex: 1;
}

.input-panel {
   flex: 1;

   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;

   margin-left: 5px;
}

.input-editor {
    flex: 1;
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

.compare-buttons-panel {
   display: flex;
   flex-direction: row;  
   justify-content: center;
   align-items: center;
   align-content: center;
}

.screen-panel {
   flex: 3;
   margin-top: 5px;
   /*background-color: #f88;*/
}
</style>
