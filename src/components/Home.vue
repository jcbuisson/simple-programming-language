<template>
  <div class="home">
    <h1>Programming Sandbox</h1>

    <div class="row">
       <div class="col-4">
          <b-alert show> Code </b-alert>
          <my-code-mirror v-model="code" :options="editorOptions"></my-code-mirror>
       </div>
       <div class="col-2">
          <b-alert show> Data </b-alert>
          <my-code-mirror v-model="code2" :options="editorOptions"></my-code-mirror>
       </div>
       <div class="col-2">
          <b-alert show> Data </b-alert>
          <my-code-mirror v-model="code2" :options="editorOptions" v-bind:test="step"></my-code-mirror>
       </div>
    </div>
    <div>
       <button type="button" class="btn btn-primary" v-on:click="step">Step</button>
    </div>

  </div>
</template>

<script>
import defaultInMyCodeMirror from '@/components/MyCodeMirror'

import { event }  from '../utility/eventBus.js'
event.init()

export default {
  name: 'home',
  components: { MyCodeMirror: defaultInMyCodeMirror },
  data () {
    return {
      state: true,
      code: '# type your code here',
      code2: '1000\n500\n250',
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
        event.emit('step')
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
