
<template>
   <div>
      <b-alert show class="title"> {{ title }} </b-alert>
      <code-mirror v-model="code" :options="editorOptions"></code-mirror>
   </div>
</template>

<script>
   import codemirror from '@/components/CodeMirror'

   import { event } from '../utility/eventBus.js'
   event.init()

   export default {
      components: { CodeMirror: codemirror },
      props: {
         title: String,
         //value: String,
      },
      created: function () {
         event.on('step', () => {
            this.value = "111"
         })
      },
      data () {
         return {
            state: true,
            code: 'titled editor',
            editorOptions: {
               mode: this.mode,
               tabSize: 3,
               lineNumbers: true,
               firstLineNumber: 0,
               lineWrapping: true,
               extraKeys: {'Ctrl-Space': 'autocomplete'},
            }
         }
      },
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .title {
      margin-bottom: 0;
      padding-top: 6px;
      padding-bottom: 6px;
   }
</style>
