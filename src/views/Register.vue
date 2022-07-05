<template>
  <div class="container-fluid vh-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="img/draw2.webp" class="img-fluid" alt="Sample image" />
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <h1 class="text-center mb-3">Register</h1>
        <h6 class="text-success">{{ success }}</h6>
        <h5 class="text-danger">{{ error }}</h5>
        <form @submit.prevent="register">
          <!-- Name input -->
          <div class="form-outline mb-4">
            <label class="form-label" for="name">Name</label>
            <input
              type="text"
              v-model="name"
              id="name"
              class="form-control form-control-lg"
              :class="{ 'is-invalid': v$.name.$errors.length }"
              placeholder="Name"
            />
            <div
              class="input-errors"
              v-for="error of v$.name.$errors"
              :key="error.$uid"
            >
              <div class="text-danger">{{ error.$message }}</div>
            </div>
            <span class="text-danger">{{ errors.name }}</span>
          </div>
          <!-- Email input -->
          <div class="form-outline mb-4">
            <label class="form-label" for="email">Email address</label>
            <input
              type="email"
              v-model="email"
              id="email"
              class="form-control form-control-lg"
              :class="{ 'is-invalid': v$.email.$errors.length }"
              placeholder="Enter a valid email address"
            />
            <div
              class="input-errors"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
            >
              <div class="text-danger">{{ error.$message }}</div>
            </div>
            <span class="text-danger">{{ errors.email }}</span>
          </div>

          <!-- dateOfBirth input -->

          <div class="form-outline mb-3">
            <label for="date_of_birth">Date Of Birth</label>
            <input
              type="date"
              v-model="dateOfBirth"
              class="form-control form-control-lg"
              :class="{ 'is-invalid': v$.dateOfBirth.$errors.length }"
              id="date_of_birth"
              pattern="\d{4}-\d{2}-\d{2}"
            />
            <div
              class="input-errors"
              v-for="error of v$.dateOfBirth.$errors"
              :key="error.$uid"
            >
              <div class="text-danger">{{ error.$message }}</div>
            </div>
            <span class="text-danger">{{ errors.dateOfBirth }}</span>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <label class="form-label" for="password">Password</label>
            <input
              type="password"
              v-model="password"
              id="password"
              class="form-control form-control-lg"
              :class="{ 'is-invalid': v$.password.$errors.length }"
              placeholder="Enter password"
            />
            <div
              class="input-errors"
              v-for="error of v$.password.$errors"
              :key="error.$uid"
            >
              <div class="text-danger">{{ error.$message }}</div>
            </div>
            <span class="text-danger">{{ errors.password }}</span>
          </div>

          <!-- Confirm Password input -->
          <div class="form-outline mb-3">
            <label class="form-label" for="password_confirmation"
              >Re-type Password</label
            >
            <input
              type="password"
              v-model="passwordConfirmation"
              id="password_confirmation"
              class="form-control form-control-lg"
              :class="{ 'is-invalid': v$.passwordConfirmation.$errors.length }"
              placeholder="Re-type password"
            />
            <div
              class="input-errors"
              v-for="error of v$.passwordConfirmation.$errors"
              :key="error.$uid"
            >
              <div class="text-danger">{{ error.$message }}</div>
            </div>
            <span class="text-danger">{{ errors.passwordConfirmation }}</span>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem"
            >
              Register
            </button>
            <p class="small fw-bold mt-2 pt-1 mb-0">
              Already have an account?
              <router-link to="/login" class="link-danger">Login</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

export default {
  name: "register",
  data() {
    return {
      v$: useVuelidate(),
      error: "",
      errors: {},
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      dateOfBirth: "",
      success: "",
    };
  },
  validations() {
    return {
      name: { required: helpers.withMessage("Please enter name", required) },
      email: {
        required: helpers.withMessage("Please enter email", required),
        email,
      },
      dateOfBirth: {
        required: helpers.withMessage("Please enter birth of date", required),
      },
      password: {
        required: helpers.withMessage("Please enter password", required),
        minLength: helpers.withMessage(
          "Minimum length of password is 8",
          minLength(8)
        ),
      },
      passwordConfirmation: {
        required,
        sameAsPassword: helpers.withMessage(
          "Confirm password doesn't match with password",
          sameAs(this.password)
        ),
      },
    };
  },
  methods: {
    register() {
      this.error = "";
      this.errors = {};
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .post("/users", {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation,
            date_of_birth: this.dateOfBirth,
          })
          .then((response) => {
            let responseData = response.data;
            if (response.data.isError) {
              this.errors = response.data.error;
              return;
            }
            this.$router.push("/login");

            this.success = "Registration Successful";
            this.errors = "";
            this.name = "";
            this.email = "";
            this.password = "";
            this.passwordConfirmation = "";
            this.dateOfBirth = "";

          })
          .catch((error) => {
            console.log(error);
            this.error = error.response.data.error;
          });
      }
    },
  },
};
</script>
