<template>
  <div class="container-fluid vh-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="img/draw2.webp" class="img-fluid" alt="Sample image" />
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <h1 class="text-center mb-3">Login</h1>
        <form @submit.prevent="login">
          <h6 v-if="error" class="text-danger text-center">
            {{ error }}
          </h6>
          <!-- Email input -->
          <div class="form-outline mb-4">
            <label class="form-label" for="email">Email address</label>
            <input
              type="email"
              v-model="email"
              id="email"
              class="form-control form-control-lg"
              placeholder="Enter a valid email address"
            />
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <label class="form-label" for="form3Example4">Password</label>
            <input
              type="password"
              v-model="password"
              id="password"
              class="form-control form-control-lg"
              placeholder="Enter password"
            />
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem"
            >
              Login
            </button>
            <p class="small fw-bold mt-2 pt-1 mb-0">
              Don't have an account?
              <router-link to="/register" class="link-danger"
                >Register</router-link
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      error: "",
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        this.error = "Email and Password must not be empty";
        return;
      }

      axios
        .post("/oauth/login", {
          grant_type: "password",
          client_id: import.meta.env.VITE_API_KEY,
          client_secret: import.meta.env.VITE_API_SECRET,
          username: this.email,
          password: this.password,
        })
        .then((response) => {
          let authInfo = response.data.data[0];
          let accessToken = authInfo["access_token"];
          localStorage.setItem("AuthToken", accessToken);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("AuthToken");

          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
        });
    },
  },

  mounted() {
    if (localStorage.getItem("AuthToken")) {
      this.$router.push("/");
    }
  },
};
</script>
