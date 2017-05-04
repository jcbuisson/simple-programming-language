
<template>
   <titled-editor v-bind:title="title" v-bind:textcontent="textContent"></titled-editor>
</template>

<script>
   import titled from '@/components/TitledEditor'

   import { event } from '../utility/eventBus.js'
   event.init()

export default {
    components: { TitledEditor: titled },
    props: {
       title: String,
       numberarray: Array,
    },
    computed: {
        textContent: function() {
          return this.numberarray.join('\n')
        }
    },
    created: function () {
       var _this = this
        event.on('step', () => {
           console.log(_this.numberarray[0])
        })
    },
    data () {
       return {
          numarray
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
