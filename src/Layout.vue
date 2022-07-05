<template>
  <!--Main Navigation-->
  <header>
    <!-- Sidebar -->
    <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
      <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple active"
          >
            <i class="fas fa-chart-area fa-fw me-3"></i><span>Dashboard</span>
          </a>
        </div>
      </div>
    </nav>
    <!-- Sidebar -->

    <!-- Navbar -->
    <nav
      id="main-navbar"
      class="navbar navbar-expand-lg navbar-light bg-primary text-white fixed-top"
    >
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Brand -->
        <a class="navbar-brand" href="#">
          <img
            src="/img/logo-wide.png"
            height="25"
            alt="MDB Logo"
            loading="lazy"
          />
        </a>

        <!-- Right links -->
        <ul class="navbar-nav ms-auto d-flex flex-row">
          <!-- Icon -->
          <li class="nav-item">
            <a class="nav-link me-3 me-lg-0 text-white" @click="logout" href="#">
              <i class="fas fa-fill-drip"> Logout</i>
            </a>
          </li>
        </ul>
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
  </header>
  <!--Main Navigation-->

  <!--Main layout-->
  <main style="margin-top: 58px">
    <router-view></router-view>
  </main>
  <!--Main layout-->
</template>

<script>
export default {
  name: "Layout",
  methods: {
    logout() {
      axios
        .post("/oauth/logout")
        .then((response) => {
          localStorage.removeItem("AuthToken");
          axios.defaults.headers.common["Authorization"] = "";
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
        });
    },
  },
};
</script>

<style>
body {
  background-color: #fbfbfb;
}
@media (min-width: 991.98px) {
  main {
    padding-left: 240px;
  }
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 58px 0 0; /* Height of navbar */
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  width: 240px;
  z-index: 600;
}
</style>
