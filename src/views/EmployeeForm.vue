<template>
  <div
    class="min-vh-100 d-flex align-items-center justify-content-center p-3 bg-light"
  >
    <div class="card shadow w-100" style="max-width: 500px">
      <div class="card-body p-4">
        <h5 class="fw-bold">
          {{ isEdit ? "Edit Employee" : "Add New Employee" }}
        </h5>
        <p class="small text-muted">
          Replaces Excel personal info + salary + history sheets
        </p>

        <div class="row g-2">
          <div class="col-6">
            <label class="form-label small">First Name *</label
            ><input
              v-model="form.first_name"
              class="form-control form-control-sm"
            />
          </div>
          <div class="col-6">
            <label class="form-label small">Last Name *</label
            ><input
              v-model="form.last_name"
              class="form-control form-control-sm"
            />
          </div>
          <div class="col-12">
            <label class="form-label small">Email *</label
            ><input
              v-model="form.email"
              class="form-control form-control-sm"
              placeholder="name@moderntech.co.za"
            />
          </div>
          <div class="col-12">
            <label class="form-label small">Job Title *</label
            ><input
              v-model="form.job_title"
              class="form-control form-control-sm"
              placeholder="e.g. Senior Developer"
            />
          </div>
          <div class="col-6">
            <label class="form-label small">Department</label
            ><select
              v-model="form.department"
              class="form-select form-select-sm"
            >
              <option value="">Select</option>
              <option>Software Development</option>
              <option>Quality Assurance</option>
              <option>Customer Support</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Human Resources</option>
            </select>
          </div>
          <div class="col-6">
            <label class="form-label small">Salary (R) *</label
            ><input
              v-model.number="form.salary"
              type="number"
              class="form-control form-control-sm"
            />
          </div>
          <div class="col-12">
            <label class="form-label small">Hire Date</label
            ><input
              v-model="form.hire_date"
              type="date"
              class="form-control form-control-sm"
            />
          </div>
        </div>

        <div v-if="error" class="alert alert-danger py-2 small mt-3">
          {{ error }}
        </div>

        <div class="d-flex gap-2 mt-3">
          <button @click="$router.push('/')" class="btn btn-secondary w-50">
            Cancel
          </button>
          <button @click="save" class="btn btn-dark w-50">
            {{ isEdit ? "Update" : "Save Employee" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        job_title: "",
        department: "",
        salary: 35000,
        hire_date: new Date().toISOString().split("T")[0],
      },
      error: "",
      isEdit: false,
      editId: null,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.isEdit = true;
      this.editId = id;
      const emps = JSON.parse(localStorage.getItem("employees") || "[]");
      const found = emps.find((e) => e.id == id);
      if (found) this.form = { ...found };
    }
  },
  methods: {
    save() {
      this.error = "";
      if (
        !this.form.first_name ||
        !this.form.last_name ||
        !this.form.email ||
        !this.form.job_title
      ) {
        this.error = "All fields with * are required";
        return;
      }
      if (!this.form.email.includes("@")) {
        this.error = "Invalid email format - must contain @";
        return;
      }
      if (this.form.salary < 10000) {
        this.error = "Salary must be at least R10,000";
        return;
      }
      if (this.form.first_name.length < 2) {
        this.error = "First name too short";
        return;
      }

      let emps = JSON.parse(localStorage.getItem("employees") || "[]");
      if (this.isEdit) {
        emps = emps.map((e) =>
          e.id == this.editId
            ? { ...e, ...this.form, id: parseInt(this.editId) }
            : e,
        );
      } else {
        emps.push({ id: Date.now(), ...this.form, status: "Active" });
      }
      localStorage.setItem("employees", JSON.stringify(emps));
      this.$router.push("/");
    },
  },
};
</script>
