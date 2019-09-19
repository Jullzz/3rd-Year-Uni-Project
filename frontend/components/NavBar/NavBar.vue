<template>
  <div class="width-full bg-grey-darkest pl-1">
    <h1 class="inline-block text-green-400">Team B Pedestrian Counter</h1>
    <span class="float-right text-green-300 mt-2 mr-2">2019 Industry Project</span>
    <div class="border-t border-solid border-green-700 pt-2">
      <div 
        href="#" 
        class="inline-block px-2 py-1"
        :class="{'bg-grey-darker border-r border-solid border-green-700 rounded-t': this.$route.path == '/' }"
      >
        <nuxt-link class="nav text-green-200" to="/">
          Home
        </nuxt-link>
      </div>

      <div 
        href="#" 
        class="inline-block px-2 py-1 -ml-1"
        :class="{'bg-grey-darker border-l border-solid border-green-700 rounded-t': this.$route.path == '/Table' }"
      >
        <nuxt-link class="nav text-green-200" to="/Table">
          Table
        </nuxt-link>
      </div>
      <span class="float-right text-green-300 mt-1 mr-2">James Schifferle - Paul Wright - Julian Verna - Nova Efata - Umar Jafni</span>
    </div>
  </div>
</template>

<style  scoped>
.nav {
  font-size: 18px;
  padding: 5px;
}
</style>