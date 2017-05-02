<template>
  <div class="home">
    <h1>Programming Sandbox</h1>

    <div class="row">
       <div class="col-4">
          <b-alert show> Code </b-alert>
          <codemirror v-model="code" :options="editorOptions"></codemirror>
       </div>
       <div class="col-2">
          <b-alert show> Data </b-alert>
          <codemirror v-model="code2" :options="editorOptions"></codemirror>
       </div>
       <div class="col-2">
          <b-alert show> Data </b-alert>
          <codemirror v-model="code2" :options="editorOptions"></codemirror>
       </div>
    </div>

  </div>
</template>

<script>
import codemirror from '@/components/codemirror'
export default {
  name: 'home',
  components: {codemirror: codemirror},
  data () {
    return {

      code: '# type your code here',
      code2: '1000',
      editorOptions: {
        mode: this.mode,
        tabSize: 2,
        lineNumbers: true,
        firstLineNumber: 0,
        lineWrapping: true,
        extraKeys: {'Ctrl-Space': 'autocomplete'},
      }
    }
  }
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
