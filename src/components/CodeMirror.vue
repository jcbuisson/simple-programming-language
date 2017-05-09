
<template>
  <textarea></textarea>
</template>

<script>
   // adapted from https://www.npmjs.com/package/vue-codemirror-lite

   var CodeMirror = require('codemirror/lib/codemirror.js')
   require('codemirror/lib/codemirror.css')
   require('codemirror/addon/selection/active-line.js')

   export default {
      props: {
         value: String,
         options: {
            type: Object,
            default: function () {
               return {
                  mode: 'text/javascript',
                  styleActiveLine: true,
                  lineNumbers: true,
                  lineWrapping: true
               }
            }
         },
      },
      mounted: function () {
         var _this = this
         this.editor = CodeMirror.fromTextArea(this.$el, this.options)
         this.editor.setValue(this.value)
         this.editor.on('change', function(cm) {
            if (!!_this.$emit) {
               _this.$emit('change', cm.getValue())
               _this.$emit('input', cm.getValue())
            }
         })
      },
      watch: {
         'value': function (newVal, oldVal) {
             var editorValue = this.editor.getValue()
             if (newVal !== editorValue) {
                var scrollInfo = this.editor.getScrollInfo()
                this.editor.setValue(newVal)
                this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
             }
         },
         'options': function (newOptions, oldVal) {
            if (typeof newOptions === 'object') {
               for (var optionName in newOptions) {
                  if (newOptions.hasOwnProperty(optionName)) {
                     this.editor.setOption(optionName, newOptions[optionName])
                  }
               }
            }
         }
      },
      beforeDestroy: function () {
         if (this.editor) {
            this.editor.toTextArea()
         }
      }
   }
</script>

<style>
  .CodeMirror-code {
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    font-size: 13px;
  }
</style>
