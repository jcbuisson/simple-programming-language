<template>
   <div>
      <button @dragover.prevent class="btn btn-secondary" v-on:click="backup">
         <!--div class="droparea">click here to backup</div>
         <div class="droparea">drop here to restore</div-->
         <div class="droparea">click here to backup / drop here to restore</div>
      </button>
   </div>
</template>

<script>
   export default {
      props: {
      },
      mounted: function() {
         var this_ = this
         this.$el.ondrop = function(e) {
            e.preventDefault();
            var reader = new FileReader();
            reader.onload = function(e) {
               this_.$emit('restore', reader.result)
            }
            var file = e.dataTransfer.files[0]
            reader.readAsText(file);  
         };
      },
      methods: {
         backup: function() {
            this.$emit('backup')
         },
      },
   }
</script>

<style>
.droparea {
   font-size: 14px;
}
</style>

