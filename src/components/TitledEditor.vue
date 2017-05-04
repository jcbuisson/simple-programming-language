
<template>
   <div>
      <b-alert show class="title"> {{ title }} </b-alert>
      <code-mirror v-bind:value="editorcontent" v-bind:options="editorOptions"></code-mirror>
   </div>
</template>

<script>
   import codemirror from '@/components/CodeMirror'

   export default {
      components: { CodeMirror: codemirror },
      props: {
         title: String,
         textcontent: String,
      },
      computed: {
         editorcontent: function() {
            return this.textcontent
         }
      },
      data () {
         return {
            state: true,
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
