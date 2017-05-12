
<template>
   <div class="card no-block">

      <div class="card-header">
         {{ title }}
      </div>
      <code-mirror
         v-bind:value="textContent"
         v-bind:styleactiveline="styleactiveline"
         v-bind:options="editorOptions"
         v-on:change="contentChanged"
      ></code-mirror>

   </div>
</template>

<script>
   import codemirror from '@/components/CodeMirror'

   import cloneDeep from 'lodash/cloneDeep'


   export default {
      components: {
         CodeMirror: codemirror,
      },
      props: {
         title: String,
         numberarray: Array,
         styleactiveline: Boolean,
      },
      computed: {
         textContent: function() {
            return this.numberarray.join('\n')
         }
      },
      methods: {
         contentChanged: function(newContent) {
            //console.log('content changed : ' + newContent)
         }
      },
      data () {
         return {
            editorOptions: {
               mode: "text/BIDON",
               styleActiveLine: this.styleactiveline,
               lineWrapping: true,
               tabSize: 3,
               lineNumbers: true,
               firstLineNumber: 0,
            }
         }
      },
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   title-editor {
      overflow: auto;
   }
</style>
