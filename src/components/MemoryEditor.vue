
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
       textContent: function() {
         console.log("compute : " + this.currentarray.join(','))
         return this.currentarray.join('\n')
       }
    },
    created: function () {
       var _this = this
       event.on('step', () => {
          this.currentarray = ["1", "2", "3"]
       })
    },
    methods: {
       onContentChanged: function(newContent) {
           console.log('content changed : ' + newContent)
       }
    },
    data () {
       return {
          currentarray: cloneDeep(this.initialarray)
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
