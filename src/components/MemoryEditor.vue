
<template>
   <div class="card no-block memory-editor">

      <div class="card-header memory-editor-header">
         {{ title }}
      </div>
      <div class="memory-editor-body" style="overflow: auto;">
         <code-mirror
            v-bind:value="textContent"
            v-bind:styleactiveline="styleactiveline"
            v-bind:options="editorOptions"
            v-on:change="contentChanged"
         ></code-mirror>
      </div>
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
         readonly: Boolean,
      },
      computed: {
         textContent: function() {
            return this.numberarray.join('\n')
         }
      },
      methods: {
         contentChanged: function(newContent) {
            //console.log('content changed : ' + newContent)
            let newArray = newContent.split('\n').map(function(e) { let v = parseFloat(e); return isNaN(v) ? 0 : v })
            this.$emit('memoryChange', newArray)
         }
      },
      data () {
         return {
            editorOptions: {
               mode: "text/BIDON",
               styleActiveLine: this.styleactiveline,
               lineWrapping: true,
               readOnly: this.readonly,
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
.memory-editor {
   display: flex;
   flex-direction: column;  
   justify-content: flex-start;

   align-items: stretch;
   align-content: stretch;
}

.memory-editor-body {
   flex: 1;
   background: rgba(100, 0, 100, .1);
}
</style>
