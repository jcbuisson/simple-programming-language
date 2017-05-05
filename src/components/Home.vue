<template>
   <!--div class="home">
          <code-editor :title="'Code'"></code-editor>
          <memory-editor :initialarray="darray" :title="'Data'"></memory-editor>
          <memory-editor :initialarray="sarray" :title="'Stack'"></memory-editor>
          <memory-editor :initialarray="inputs" :title="'Input'"></memory-editor>
          <screen title="Display area"></screen>
          <button type="button" class="btn btn-primary" v-on:click="step">Step</button>
      </div-->

<div class="home">
    <div class="header-panel">
       <b-button-group class="header-panel-group">
          <b-button variant="primary">Simple Programming Language Sandbox</b-button>
       </b-button-group>
       <b-button-group class="header-panel-group">
          <b-button variant="success">Online version</b-button>
          <b-button variant="primary">Documentation</b-button>
          <b-button variant="info">Development</b-button>
       </b-button-group>
    </div>
    
    <div class="main-panel">
       <div class="main-panel-left">
          <div class="main-panel-left-center">
             CODE EDITOR
          </div>
          <div class="main-panel-left-footer">
             DEBUG TOOLBAR
          </div>
       </div>
       <div class="main-panel-right">
          <div class="main-panel-right-top">
             MEMORY
          </div>
          <div class="main-panel-right-bottom">
             INPUT/OUTPUT
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
            state: true,
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
            let x = parser.parse("cp 10, data[0]")
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
   background: rgba(255, 0, 0, .1);
   display: flex;
   flex-direction: row;  
   justify-content: space-around;

   align-items: center;
   align-content: center;
}

.header-panel-group {
   flex: 1;
}

.main-panel {
   background: rgba(0, 255, 0, .1);
   flex: 1;

   display: flex;
   flex-direction: row;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.main-panel-left {
   flex: 1;
   background: rgba(255, 255, 0, .1);

   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.main-panel-left-center {
   flex: 1;
   background: rgba(100, 0, 100, .1);
}

.main-panel-left-footer {
   background: rgba(100, 100, 0, .1);
}

.main-panel-right {
   flex: 1;
   background: rgba(0, 255, 255, .1);

   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.main-panel-right-top {
   flex: 1;
   background: rgba(50, 0, 100, .1);
}

.main-panel-right-bottom {
   flex: 1;
   background: rgba(100, 0, 50, .1);
}

</style>
