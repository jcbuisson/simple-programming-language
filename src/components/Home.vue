<template>

<div class="home">
    
    <div class="main-panel">
       <div class="main-panel-left">
          <div class="code-editor-panel">
             <code-editor v-bind:title="'Code'" v-bind:initialcode="'      cp   1000, d[0]'"></code-editor>
          </div>
          <div class="debug-toolbar-panel">
             <b-button-group>
                <b-button v-on:click="step"> <i class="fa fa-step-forward"></i> </b-button>
                <b-button> <i class="fa fa-play"></i> </b-button>
             </b-button-group>
          </div>
       </div>
       <div class="main-panel-right">
          <div class="memory-panel">
             <div class="data-panel">
                <memory-editor :initialarray="darray" :title="'Data'"></memory-editor>
             </div>
             <div class="stack-panel">
                <memory-editor :initialarray="sarray" :title="'Stack'"></memory-editor>
             </div>
             <div class="input-panel">
                <memory-editor :initialarray="inputs" :title="'Input'"></memory-editor>
             </div>
          </div>
          <div class="input-output-panel">
             <div class="keyboard-panel">KEYBOARD</div>
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

   import { event } from '../utility/eventBus.js'
   event.init()

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
            darray: ["1000", "800", "600"],
            sarray: ["600", "800", "1000"],
            inputs: [],
            editorOptions: {
               mode: this.mode,
               tabSize: 2,
               lineNumbers: true,
               firstLineNumber: 0,
               lineWrapping: true,
               extraKeys: {'Ctrl-Space': 'autocomplete'},
            }
         }
      },
      methods: {
         step: function() {
            this.darray = ["1111", "888", "666"]
         }
      },
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.home {
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

.keyboard-panel {
   background: rgba(100, 0, 0, .1);
   margin-top: 10px;
   margin-bottom: 5px;
}

.screen-panel {
   flex: 1;
   background: rgba(0, 100, 0, .1);
   margin-top: 5px;
}

</style>
