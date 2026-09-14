<template>
  <div
    style="
      display: flex;
      min-height: 100vh;
      background: #f8fafc;
      font-family: Inter, sans-serif;
    "
  >
    <!-- SIDEBAR - HIDE ON LOGIN PAGE -->
    <div
      v-if="!isLoginPage"
      style="
        width: 220px;
        background: #0f172a;
        color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
    >
      <div>
        <h3 style="margin: 0 0 20px 0">ModernTech<br />HR</h3>
        <div style="display: grid; gap: 8px">
          <router-link
            to="/"
            style="
              color: white;
              text-decoration: none;
              padding: 10px;
              border-radius: 8px;
            "
            :style="$route.path === '/' ? 'background:#1e293b' : ''"
            >📊 Dashboard</router-link
          >
          <router-link
            to="/payroll"
            style="
              color: white;
              text-decoration: none;
              padding: 10px;
              border-radius: 8px;
            "
            :style="$route.path === '/payroll' ? 'background:#1e293b' : ''"
            >💰 Payroll</router-link
          >
          <router-link
            to="/timeoff"
            style="
              color: white;
              text-decoration: none;
              padding: 10px;
              border-radius: 8px;
            "
            :style="$route.path === '/timeoff' ? 'background:#1e293b' : ''"
            >🏖️ Time Off</router-link
          >
        </div>
      </div>
      <div>
        <div
          style="
            font-size: 11px;
            color: #94a3b8;
            margin-bottom: 12px;
            padding: 10px;
            background: #1e293b;
            border-radius: 8px;
          "
        >
          👤 Admin<br />{{ employeesCount }} Employees<br />MySQL:3307
        </div>
        <button
          @click="showLogout = true"
          style="
            width: 100%;
            background: #ef4444;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 700;
          "
        >
          🚪 Logout
        </button>
      </div>
    </div>

    <!-- MAIN -->
    <div style="flex: 1; overflow: auto">
      <router-view />
    </div>

    <!-- LOGOUT MODAL -->
    <div
      v-if="showLogout"
      style="
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      "
    >
      <div
        style="
          background: white;
          padding: 24px;
          border-radius: 12px;
          width: 340px;
          text-align: center;
        "
      >
        <h3 style="margin: 0">Logout?</h3>
        <p style="font-size: 13px; color: #64748b; margin: 8px 0 20px 0">
          You will return to login
        </p>
        <div style="display: flex; gap: 10px">
          <button
            @click="showLogout = false"
            style="
              flex: 1;
              padding: 10px;
              border: 1px solid #e2e8f0;
              background: white;
              border-radius: 8px;
              cursor: pointer;
            "
          >
            Cancel
          </button>
          <button
            @click="doLogout"
            style="
              flex: 1;
              padding: 10px;
              background: #ef4444;
              color: white;
              border: none;
              border-radius: 8px;
              font-weight: 700;
              cursor: pointer;
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { showLogout: false };
  },
  computed: {
    isLoginPage() {
      return this.$route.path === "/login";
    },
    employeesCount() {
      const s = localStorage.getItem("moderntech_employees");
      return s ? JSON.parse(s).length : 15;
    },
  },
  methods: {
    doLogout() {
      this.showLogout = false;
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>
