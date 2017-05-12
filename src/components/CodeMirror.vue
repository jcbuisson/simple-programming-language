
<template>
  <textarea></textarea>
</template>

<script>
   // adapted from https://www.npmjs.com/package/vue-codemirror-lite

   var CodeMirror = require('codemirror/lib/codemirror.js')
   require('codemirror/lib/codemirror.css')
   require('codemirror/addon/selection/active-line.js')
   //require('codemirror/addon/search/searchcursor.js')
   //require('codemirror/addon/selection/mark-selection.js')

   //import { event } from '../utility/eventBus.js'
   //event.init()

   export default {
      props: {
         value: String,
         selectedline: Number,
         styleactiveline: Boolean,
         options: {
            type: Object,
            default: function () {
               return {
                  styleActiveLine: true,
                  lineNumbers: true,
                  lineWrapping: true,
                  tabSize: 3,
                  lineNumbers: true,
                  //styleSelectedText: true,
                  firstLineNumber: 0,
               }
            }
         },
      },
      mounted: function () {
         var _this = this
         this.editor = CodeMirror.fromTextArea(this.$el, this.options)
         this.editor.setValue(this.value)
         this.editor.setOption('styleActiveLine', this.styleactiveline)
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
         'selectedline': function(newVal, oldVal) {
            //this.editor.setCursor(newVal)
            this.editor.removeLineClass(oldVal, "background", "styled-background")
            this.editor.addLineClass(newVal, "background", "styled-background")
         },
         'styleactiveline': function(newVal, oldVal) {
            this.editor.setOption('styleActiveLine', newVal)
         },
         'options': function (newOptions, oldVal) {
            if (typeof newOptions === 'object') {
               for (var optionName in newOptions) {
                  if (newOptions.hasOwnProperty(optionName)) {
                     this.editor.setOption(optionName, newOptions[optionName])
                  }
               }
            }
         },
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

  .CodeMirror-selected  {
     background-color: blue !important;
  }
  .CodeMirror-selectedtext {
     color: white;
  }
  .styled-background {
     background-color: #abbffe;
  }
</style>
