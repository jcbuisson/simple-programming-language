
<template>
   <titled-editor v-bind:title="title" v-bind:initialcontent="textContent" v-on:contentChanged="onContentChanged"></titled-editor>
</template>

<script>
   import titled from '@/components/TitledEditor'

   import cloneDeep from 'lodash/cloneDeep'

   import { event } from '../utility/eventBus.js'
   event.init()

export default {
    components: { TitledEditor: titled },
    props: {
       title: String,
       initialarray: Array,
    },
    computed: {
       currentarray: function() {
          return this.initialarray
       },
       textContent: function() {
         return this.currentarray.join('\n')
       }
    },
    methods: {
       onContentChanged: function(newContent) {
           console.log('content changed : ' + newContent)
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
