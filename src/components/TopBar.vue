
<template>
   <b-navbar toggleable fixed="true" sticky="true" type="inverse" variant="success">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-link class="navbar-brand" to="#">
         <span>Simple Programming Language</span>
      </b-link>
      <b-nav is-nav-bar class="ml-auto">
         <div class="btn-group">
            <b-button variant="success" v-bind:class="{ active: name === 'sandbox' }" v-on:click="$emit('buttonclick', 'sandbox')">Sandbox</b-button>
            <b-button variant="success" v-bind:class="{ active: name === 'tutorial' }"v-on:click="$emit('buttonclick', 'tutorial')">Tutorial</b-button>
            <b-button variant="success" v-bind:class="{ active: name === 'reference' }" v-on:click="$emit('buttonclick', 'reference')">Reference</b-button>
            <b-button variant="success" v-bind:class="{ active: name === 'home' }" v-on:click="$emit('buttonclick', 'home')">Home</b-button>
         </div>
      </b-nav>
   </b-navbar>
</template>


<script>
   export default {
      props: {
         name: String,
      }
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
