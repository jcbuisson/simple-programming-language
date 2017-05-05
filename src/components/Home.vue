<template>
   <!--div class="home">
      <h1>Programming Sandbox</h1>

      <div class="row">
         <div class="col-8">
            <div class="row">
               <div class="col-6">
                  <code-editor :title="'Code'"></code-editor>
               </div>
               <div class="col-2">
                  <memory-editor :initialarray="darray" :title="'Data'"></memory-editor>
               </div>
               <div class="col-2">
                  <memory-editor :initialarray="sarray" :title="'Stack'"></memory-editor>
               </div>
               <div class="col-2">
                  <memory-editor :initialarray="inputs" :title="'Input'"></memory-editor>
               </div>
            </div>
         </div>
         <div class="col-4">
            <screen title="Display area"></screen>
         </div>
      </div>

      <div>
         <button type="button" class="btn btn-primary" v-on:click="step">Step</button>
      </div-->


<div class="flexbox-parent">
    <div class="flexbox-item header">
        Header
    </div>
    
    <div class="flexbox-item fill-area content flexbox-item-grow">
        <div class="fill-area-content flexbox-item-grow">

           CONTENT
        </div>
    </div>
    
    <div class="flexbox-item footer">
        Footer
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
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.navbar {
  margin-bottom: 10px;
}




.home {
    width: 100%;
    height: 100%;
}

.flexbox-parent {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    
    justify-content: flex-start; /* align items in Main Axis */
    align-items: stretch; /* align items in Cross Axis */
    align-content: stretch; /* Extra space in Cross Axis */
}

.flexbox-item {
    padding: 8px;
}
.flexbox-item-grow {
    flex: 1; /* same as flex: 1 1 auto; */
}

.flexbox-item.header {
    background: rgba(255, 0, 0, .1);
}
.flexbox-item.footer {
    background: rgba(0, 255, 0, .1);
}

.fill-area {
    display: flex;
    flex-direction: row;
    
    justify-content: flex-start; /* align items in Main Axis */
    align-items: stretch; /* align items in Cross Axis */
    align-content: stretch; /* Extra space in Cross Axis */
    
}
.fill-area-content {
    /*background: rgba(0, 0, 0, .3);
    border: 1px solid #000000;*/
    
    /* Needed for when the area gets squished too far and there is content that can't be displayed */
    overflow: auto; 
}

</style>
