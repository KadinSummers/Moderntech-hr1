<template>
  <div
    style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0f172a;
    "
  >
    <div
      style="
        background: white;
        padding: 32px;
        border-radius: 16px;
        width: 360px;
      "
    >
      <h2 style="margin: 0">ModernTech HR</h2>
      <p style="color: #64748b; font-size: 13px">Enter any details to login</p>
      <div style="display: grid; gap: 12px; margin-top: 20px">
        <input
          v-model="email"
          placeholder="admin@moderntech.co.za"
          style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px"
        />
        <input
          v-model="pass"
          type="password"
          placeholder="password 123"
          style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px"
        />
        <button
          @click="login"
          style="
            background: #0f172a;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
          "
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { email: "admin@moderntech.co.za", pass: "123" };
  },
  methods: {
    login() {
      localStorage.setItem("user", this.email);
      this.$router.push("/");
    },
  },
};
</script>
