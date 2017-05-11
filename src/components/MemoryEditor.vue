
<template>
   <div class="card no-block">

      <div class="card-header">
         {{ title }}
      </div>
      <code-mirror v-bind:value="textContent" v-bind:options="editorOptions" v-on:change="contentChanged"></code-mirror>

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
         dataarray: Array,
      },
      computed: {
         textContent: function() {
            return this.dataarray.join('\n')
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
               styleActiveLine: true,
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
