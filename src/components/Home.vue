<template>
  <div class="home">
    <h1>Programming Sandbox</h1>

    <div class="row">
       <div class="col-4">
          <code-editor :title="'Code'"></code-editor>
       </div>
       <div class="col-2">
          <memory-editor :initialarray="darray" :title="'Data'"></memory-editor>
       </div>
       <div class="col-2">
          <memory-editor :initialarray="sarray" :title="'Stack'"></memory-editor>
       </div>
    </div>
    <div>
       <button type="button" class="btn btn-primary" v-on:click="step">Step</button>
    </div>

  </div>
</template>

<script>
import codeditor from '@/components/CodeEditor'
import memoryeditor from '@/components/MemoryEditor'

import { event }  from '../utility/eventBus.js'
event.init()

export default {
  components: {
     CodeEditor: codeditor,
     MemoryEditor: memoryeditor,
  },
  data () {
    return {
      state: true,
      darray: ["1000", "800", "600"],
      sarray: ["600", "800", "1000"],
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
</style>
