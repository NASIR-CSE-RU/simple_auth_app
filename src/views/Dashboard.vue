<template>
  <h1>Users</h1>
  <EasyDataTable
    :headers="columns"
    :buttons-pagination="true"
    :rows-items="[10,25,50]"
    :rows-per-page="10"
    :theme-color="'#0d6efd'"
    :items="users" />
</template>

<script>
import moment from "moment";

export default {
  name: "dashboard",
  data() {
    return {
      users: [],
      columns: [
        { text: "Name", value: "name", sortable: true },
        { text: "Email Address", value: "email", sortable: true },
        { text: "Date Of Birth", value: "date_of_birth", sortable: true },
      ],
    };
  },
  methods: {
    getUsers() {
      axios
        .get("/users")
        .then((response) => {
          let users = response.data.data;
          users.forEach((user) => {
            user["date_of_birth"] = this.$options.filters.timeformat(
              user["date_of_birth"]
            );
          });
          this.users = users;
        })
        .catch((error) => {
          console.log(error);
          //this.error = error.response.data.error;
        });
    },
    checkAuth() {
      if (!localStorage.getItem("AuthToken")) {
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.getUsers();
  },
  filters: {
    timeformat(value) {
      return moment(value).format("MMM DD, YYYY");
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.checkAuth();
      next();
    });
  },
};
</script>
