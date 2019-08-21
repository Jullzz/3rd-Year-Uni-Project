<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="#">
          <nuxt-link class="nav" to="/">
            Home
          </nuxt-link>
        </b-nav-item>

        <b-nav-item href="#">
          <nuxt-link class="nav" to="/Table">
            Table
          </nuxt-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<style  scoped>
.nav {
  font-size: 18px;
  padding: 5px;
}
</style>