<template>

<div class="sandbox">
    
   <div class="main-panel">
      <div class="main-panel-left">
         <div class="code-editor-panel">
            <code-editor v-bind:title="'Code'" v-bind:initialcode="code" v-on:exampleLoaded="onExampleLoaded"
                         v-bind:selectedline="selectedLine"
            ></code-editor>
         </div>
         <div class="debug-toolbar-panel">
            <b-button-group>
               <b-button v-on:click="step"> <i class="fa fa-step-forward"></i> </b-button>
               <b-button v-on:click="runstop"> <i class="fa fa-play"></i> </b-button>
            </b-button-group>
         </div>
      </div>
      <div class="main-panel-right">
         <div class="memory-panel">
            <div class="data-panel">
               <memory-editor :dataarray="darray" :title="'Data'"></memory-editor>
            </div>
            <div class="stack-panel" v-if="true">
               <memory-editor :dataarray="sarray" :title="'Stack'"></memory-editor>
            </div>
            <div class="input-panel">
               <memory-editor :dataarray="inputs" :title="'Input'"></memory-editor>
            </div>
         </div>
         <div class="input-output-panel">
            <div class="input0-output0-panel">
               <!--div class="card input0-panel">
                  <div class="card-block">
                     <p>input[0] : </p> <input type="number" v-model="inputs[0]"></div>
               </div>
               <div class="card output0-panel">
                  <div class="card-block"><p>output[0] : 1234</p></div>
               </div-->
               <div class="card input0-panel">
                  <div class="card-header">input[0]</div>
                  <div class="card-block">
                     <input type="number" v-model="inputs[0]">
                  </div>
               </div>
               <div class="card output0-panel">
                  <div class="card-header">output[0]</div>
                  <div class="card-block"><p>1234</p></div>
               </div>
            </div>
            <div class="screen-panel">SCREEN</div>
         </div>
      </div>
   </div>
</div>

</template>


<script>
   import codeditor from '@/components/CodeEditor'
   import memoryeditor from '@/components/MemoryEditor'
   import screen from '@/components/Screen'

   //import { event } from '../utility/eventBus.js'
   //event.init()

   import { store } from '../utility/store.js'
   import { examples } from '../utility/examples.js'

   import parser from '../utility/parser.js'

   import codemirror from '@/components/CodeMirror'

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
            darray: [1000, 800, 600],
            sarray: [0, 0.5, 1, 1.5, Math.PI],
            inputs: [],
            selectedLine: 0,
         }
      },
      methods: {
         step: function() {
            //this.darray = ["1111", "888", "666"]
            this.selectedLine += 1
            //event.emit('select-line', 5)
         },
         runstop: function() {
            this.selectedLine = 0
            this.darray = ["999"].concat(this.darray.slice(1))
         },
         onExampleLoaded: function(exampleName) {
            let example = examples[exampleName]
            this.code = example.code
            this.darray = example.data
            this.sarray = example.stack
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

.debug-toolbar-panel {
   background: rgba(100, 100, 0, .1);
   margin-top: 5px;
}

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
   flex: 1;
}

.output0-panel {
   flex: 1;
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
