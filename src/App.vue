<template>
  <div class="flex flex-col min-h-screen">
    <div class="bg-blue-800 py-8">
      <div class="container mx-auto px-20">
        <h3 class="text-white font-semibold px-2 text-center md:text-left">Users List</h3>
      </div>
    </div>
    <div class="flex-grow">
      <div class="container mx-auto px-5 md:px-20 py-5">
        <div class="flex justify-center md:justify-end">
          <button class="bg-blue-600 p-3 rounded-lg text-white w-full md:w-auto" @click="showModal">Add User</button>
        </div>
        <div class="my-5">
          <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg hidden md:block">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                      <th scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Home Address
                      </th>
                      <th scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Of Birth
                      </th>
                      <th scope="col"
                          class="relative px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(user,index) in users" :key="index">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="text-sm font-medium text-gray-900">
                            {{ user.name }}
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ user.email }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                          <span
                              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {{ user.gender }}
                          </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ user.dob }}
                      </td>
                      <td class="px-6 py-4 text-center">
                        <button class="bg-red-500 rounded p-3 w-auto text-white mr-2" @click="deleteUser(user)"> Delete
                        </button>
                        <button class="bg-blue-500 rounded p-3 w-auto text-white" @click="openEditModal(user)">Edit
                        </button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div v-if="users.length === 0" class="flex justify-center py-3 my-3">
                      <p class="text-red-600 text-2xl font-semibold">No users Found   &#128557;</p>
                  </div>
                </div>
                <div class="md:hidden">
                  <div v-for="(user,index) in  users" :key="index" class="shadow-lg my-4 mx-3 p-3">
                    <div class="my-2">
                      <p><span>Name:</span> {{ user.name }}</p>
                    </div>
                    <div class="my-2">
                      <p><span>Email:</span> {{ user.email }}</p>
                    </div>
                    <div class="my-2">
                      <p><span>Gender:</span> {{ user.gender }}</p>
                    </div>
                    <div class="my-2">
                      <p><span>DoB:</span> {{ user.dob }}</p>
                    </div>
                    <hr>
                    <div class="flex justify-around py-2">
                      <button class="bg-red-500 rounded p-3 w-full text-white mr-2" @click="deleteUser(user)">Delete
                      </button>
                      <button class="bg-blue-500 rounded p-3 w-full text-white" @click="openEditModal(user)">Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <t-modal name="my-modal" ref="modal" :header="editMode? 'Edit User' :  'Add User'" :clickToClose="false"
             :escToClose="false">
      <div class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 rounded-lg" role="alert"
           v-show="showAlert">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
              d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/>
        </svg>
        <p>Form is not filled in correctly.</p>
      </div>
      <form class="p-2">
        <div class="mb-4">
          <label>Name</label>
          <t-input v-model="form.name" placeholder="name" type="text"/>
        </div>
        <div class="mb-4">
          <label>Email</label>
          <t-input v-model="form.email" placeholder="email address" type="email"/>
        </div>
        <div class="mb-4">
          <label>Select gender</label>
          <t-select v-model="form.gender" placeholder="please select gender" :options="['male','female']"></t-select>
        </div>
        <div class="mb-4">
          <label>Date of Birth</label>
          <t-input v-model="form.dob" placeholder="select date of birth" type="date"/>
        </div>
      </form>
      <template v-slot:footer>
        <div class="flex justify-between">
          <t-button @click="closeModal" type="button">
            Cancel
          </t-button>
          <t-button v-if="editMode" @click="updateUser" type="button">
            Update User
          </t-button>
          <t-button v-else @click="saveUser" type="button">
            Save User
          </t-button>
        </div>
      </template>
    </t-modal>
    <footer class="bg-blue-800 text-center lg:text-left">
      <div class="text-white text-center p-4" style="background-color: rgba(0, 0, 0, 0.2);">
        © {{ new Date().getFullYear() }} Copyright:
        <a class="text-white" href="#">Users List</a>
      </div>
    </footer>
  </div>
</template>

<script>
import {TModal, TButton, TSelect, TInput} from 'vue-tailwind/dist/components'

export default {
  name: 'App',
  components: {
    TModal,
    TButton,
    TSelect,
    TInput,
  },
  data() {
    return {
      form: {
        id: null,
        name: '',
        email: '',
        gender: '',
        dob: null,
      },
      users: [],
      showAlert: false,
      editMode: false,
    }
  },
  methods: {
    showModal() {
      this.$refs.modal.show();
    },
    saveUser() {
      if (this.form.name && this.form.email && this.form.gender && this.form.dob) {
        let newUser = {...this.form, id: Date.now()};
        this.users.push(newUser);
        this.closeModal();
      } else {
        this.showAlert = true;
      }
    },
    openEditModal(user) {
      this.form = {...user};
      this.editMode = true;
      this.showModal();

    },
    updateUser() {
      if (this.form.name && this.form.email && this.form.gender && this.form.dob) {
        let newUser = {...this.form};
        this.users = this.users.map((user) => {
          if (user.id === newUser.id) {
            return newUser;
          }
          return user;
        })
        this.closeModal();
      } else {
        this.showAlert = true;
      }
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
    closeModal() {
      this.$refs.modal.hide();
      this.form = {
        id: null,
        name: '',
        email: '',
        gender: '',
        dob: null
      }
      this.showAlert = false;
      this.editMode = false;
    },

  }
}
</script>

<style>

</style>
