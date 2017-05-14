
<template>
  <textarea></textarea>
</template>

<script>
   // adapted from https://www.npmjs.com/package/vue-codemirror-lite

   var CodeMirror = require('codemirror/lib/codemirror.js')
   require('codemirror/lib/codemirror.css')
   require('codemirror/addon/selection/active-line.js')
   require('codemirror/addon/mode/simple.js')

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
      created: function() {
         // adapted from https://github.com/codemirror/CodeMirror/blob/master/demo/simplemode.html
         // slow on Chrome, fast on Firefox
         CodeMirror.defineSimpleMode("simplemode", {
            // The start state contains the rules that are intially used
            start: [
               // The regex matches the token, the token property contains the type
               //{regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
               // You can match multiple tokens at once. Note that the captured
               // groups must span the whole string in this case
               //{regex: /(function)(\s+)([a-z$][\w$]*)/, token: ["keyword", null, "variable-2"]},
               // Rules are matched in the order in which they appear, so there is
               // no ambiguity between this one and the one above
               //{regex: /(?:function|var|return|if|for|while|else|do|this)\b/, token: "keyword"},

               {regex: /(?:data|stack|input|output)\b/, token: "keyword"},

               //{regex: /true|false|null|undefined/, token: "atom"},
               {regex: /go|compare|push|pop|call|return|stop/, token: "atom"},


               {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number"},
               {regex: /\/\/.*/, token: "comment"},
               //{regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3"},
               // A next property will cause the mode to move to a different state
               {regex: /\/\*/, token: "comment", next: "comment"},
               {regex: /[-+\/*=<>!]+/, token: "operator"},
               // indent and dedent properties guide autoindentation
               {regex: /[\{\[\(]/, indent: true},
               {regex: /[\}\]\)]/, dedent: true},
               //{regex: /[a-z$][\w$]*/, token: "variable"},
               // You can embed other modes with the mode property. This rule
               // causes all code between << and >> to be highlighted with the XML
               // mode.
               //{regex: /<</, token: "meta", mode: {spec: "xml", end: />>/}}
            ],
            // The multi-line comment state.
            comment: [
               {regex: /.*?\*\//, token: "comment", next: "start"},
               {regex: /.*/, token: "comment"}
            ],
            // The meta property contains global information about the mode. It
            // can contain properties like lineComment, which are supported by
            // all modes, and also directives like dontIndentStates, which are
            // specific to simple modes.
            meta: {
               dontIndentStates: ["comment"],
               lineComment: "//"
            }
        })
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

        this.editor.setOption('mode', 'simplemode')
         
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
  .CodeMirror-selectedtext {
     color: white;
  }
  .styled-background {
     background-color: #abbffe;
  }
</style>
