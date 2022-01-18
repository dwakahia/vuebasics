<template>
  <base-layout>
    <template v-slot:top>
      <top/>
    </template>
    <users-list/>
    <template v-slot:bottom>
      <bottom/>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from "./components/layout/BaseLayout";
import Top from "./components/layout/Top";
import Bottom from "./components/layout/Bottom";
import UsersList from "./components/users/UsersList";


export default {
  name: 'App',
  components: {
    Top,
    Bottom,
    UsersList,
    BaseLayout
  }
}
</script>

<style>

</style>
