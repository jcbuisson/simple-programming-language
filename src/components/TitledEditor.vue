
<template>

   <div class="card no-block">

      <div class="card-header">
         {{ title }}
      </div>
      <code-mirror v-bind:value="currentcontent" v-bind:options="editorOptions" v-on:change="contentChanged"></code-mirror>

   </div>

</template>

<script>
   import codemirror from '@/components/CodeMirror'

   export default {
      components: { CodeMirror: codemirror },
      props: {
         variant: String,
         title: String,
         initialcontent: String,
      },
      methods: {
         contentChanged: function(newContent) {
            this.$emit('contentChanged', newContent)
         },
      },
      computed: {
         currentcontent: function() {
            return this.initialcontent
         }
      },
      data () {
         return {
            editorOptions: {
               mode: this.mode,
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
