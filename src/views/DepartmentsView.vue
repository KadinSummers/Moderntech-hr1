<template>
  <div class="min-vh-100 bg-light">
    <nav class="navbar navbar-dark bg-dark px-3">
      <span class="navbar-brand fw-bold"
        >Departments - From 20 to 250 Employees (2010-2026)</span
      ><button @click="$router.push('/')" class="btn btn-light btn-sm">
        Dashboard
      </button>
    </nav>
    <div class="container p-3">
      <div class="alert alert-primary small">
        <b>ModernTech Growth:</b> Started 2010 with 20 employees, now 250 across
        6 departments. Specialises in patient management systems & telemedicine.
        Expanding to Europe & Asia. Previous system: fragmented Excel sheets per
        department. New: centralised.
      </div>
      <div class="row g-3">
        <div
          v-for="dept in departments"
          :key="dept.id"
          class="col-md-6 col-lg-4"
        >
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <h6 class="fw-bold">
                {{ dept.name }}
                <span class="badge bg-secondary float-end">{{
                  dept.location
                }}</span>
              </h6>
              <small class="text-muted"
                >Budget: R{{ dept.budget.toLocaleString() }} •
                {{ employeesByDept(dept.name).length }} employees shown (of
                {{ Math.round((dept.employees / 15) * 250) }} total)</small
              >
              <div class="progress my-2" style="height: 8px">
                <div
                  class="progress-bar"
                  :style="`width:${(employeesByDept(dept.name).length / 6) * 100}%`"
                ></div>
              </div>
              <div class="small">
                <div
                  v-for="e in employeesByDept(dept.name)"
                  :key="e.id"
                  class="d-flex justify-content-between border-bottom py-1"
                >
                  <span>{{ e.first_name }} {{ e.last_name }}</span
                  ><small class="text-muted">{{ e.job_title }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { employeesData } from "../data/employees.js";
export default {
  data() {
    return {
      employees: [],
      departments: [
        {
          id: 1,
          name: "Software Development",
          location: "Cape Town",
          budget: 500000,
          employees: 80,
        },
        {
          id: 2,
          name: "Quality Assurance",
          location: "Cape Town",
          budget: 250000,
          employees: 40,
        },
        {
          id: 3,
          name: "Customer Support",
          location: "Johannesburg",
          budget: 200000,
          employees: 50,
        },
        {
          id: 4,
          name: "Sales",
          location: "Durban",
          budget: 300000,
          employees: 35,
        },
        {
          id: 5,
          name: "Marketing",
          location: "Cape Town",
          budget: 280000,
          employees: 25,
        },
        {
          id: 6,
          name: "Human Resources",
          location: "Cape Town",
          budget: 180000,
          employees: 20,
        },
      ],
    };
  },
  mounted() {
    const s = localStorage.getItem("employees");
    this.employees = s ? JSON.parse(s) : employeesData;
  },
  methods: {
    employeesByDept(name) {
      return this.employees.filter((e) => e.department === name);
    },
  },
};
</script>
