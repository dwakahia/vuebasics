<template>
  <div class="flex-grow">
    <div class="container mx-auto px-5 md:px-20 py-5">
      <div class="flex justify-center md:justify-end">
        <custom-button @click_event="showModal" type="add" name="Add User" ></custom-button>
      </div>
      <div class="my-5">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <large-view @delete_user="deleteUser" @open_edit_modal="openEditModal" v-if="users.length > 0"
                          :users="users"/>
              <mobile-view v-if="users.length > 0" @delete_user="deleteUser" @open_edit_modal="openEditModal"
                           :users="users"/>
              <EmptyView v-else/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <users-modal/>
  </div>
</template>

<script>
import EmptyView from "./EmptyView";
import MobileView from "./MobileView";
import LargeView from "./LargeView";
import UsersModal from "./UsersModal";
import {Event_bus} from "../../event_bus";


export default {
  name: "UsersList",
  components: {
    EmptyView,
    MobileView,
    LargeView,
    UsersModal,
  },
  data() {
    return {
      users: [],
    }
  }, created() {
    Event_bus.$on('save_user', this.saveUser);
    Event_bus.$on('update_user', this.updateUser);
  }, methods: {
    showModal() {
      Event_bus.$emit('open_modal');
    },
    saveUser(data) {
      let newUser = {...data, id: Date.now()};
      this.users.push(newUser);
      console.log(this.users.length);
    },
    openEditModal(user) {
      Event_bus.$emit('open_update_modal', user);
    },
    updateUser(data) {
      let newUser = {...data};
      this.users = this.users.map((user) => {
        if (user.id === newUser.id) {
          return newUser;
        }
        return user;
      })
    },
    deleteUser(user) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          this.users = this.users.filter((usr) => usr.id !== user.id);

          this.$swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
          )
        }
      })

    },
  }
}
</script>

<style scoped>

</style>