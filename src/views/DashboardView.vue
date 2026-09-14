<script>
const DEFAULT = [
  {
    id: 1,
    first_name: "Thabo",
    last_name: "Mbeki",
    email: "thabo.m@moderntech.co.za",
    job_title: "Senior Developer",
    department: "Software Development",
    salary: 65000,
  },
  {
    id: 2,
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.j@moderntech.co.za",
    job_title: "QA Lead",
    department: "Quality Assurance",
    salary: 55000,
  },
  {
    id: 3,
    first_name: "Lerato",
    last_name: "Nkosi",
    email: "lerato.n@moderntech.co.za",
    job_title: "Support Specialist",
    department: "Customer Support",
    salary: 35000,
  },
  {
    id: 4,
    first_name: "David",
    last_name: "Smith",
    email: "david.s@moderntech.co.za",
    job_title: "Sales Manager",
    department: "Sales",
    salary: 60000,
  },
  {
    id: 5,
    first_name: "Nomsa",
    last_name: "Dlamini",
    email: "nomsa.d@moderntech.co.za",
    job_title: "Marketing Lead",
    department: "Marketing",
    salary: 58000,
  },
  {
    id: 6,
    first_name: "James",
    last_name: "Wilson",
    email: "james.w@moderntech.co.za",
    job_title: "Junior Developer",
    department: "Software Development",
    salary: 38000,
  },
  {
    id: 7,
    first_name: "Aisha",
    last_name: "Patel",
    email: "aisha.p@moderntech.co.za",
    job_title: "QA Engineer",
    department: "Quality Assurance",
    salary: 42000,
  },
  {
    id: 8,
    first_name: "Sipho",
    last_name: "Zulu",
    email: "sipho.z@moderntech.co.za",
    job_title: "Support Agent",
    department: "Customer Support",
    salary: 32000,
  },
  {
    id: 9,
    first_name: "Emily",
    last_name: "Brown",
    email: "emily.b@moderntech.co.za",
    job_title: "Sales Rep",
    department: "Sales",
    salary: 40000,
  },
  {
    id: 10,
    first_name: "Mandla",
    last_name: "Khumalo",
    email: "mandla.k@moderntech.co.za",
    job_title: "DevOps Engineer",
    department: "Software Development",
    salary: 70000,
  },
  {
    id: 11,
    first_name: "Priya",
    last_name: "Naidoo",
    email: "priya.n@moderntech.co.za",
    job_title: "HR Manager",
    department: "Human Resources",
    salary: 62000,
  },
  {
    id: 12,
    first_name: "Chris",
    last_name: "Taylor",
    email: "chris.t@moderntech.co.za",
    job_title: "Product Manager",
    department: "Software Development",
    salary: 75000,
  },
  {
    id: 13,
    first_name: "Zanele",
    last_name: "Mthembu",
    email: "zanele.m@moderntech.co.za",
    job_title: "Content Strategist",
    department: "Marketing",
    salary: 45000,
  },
  {
    id: 14,
    first_name: "Ahmed",
    last_name: "Hassan",
    email: "ahmed.h@moderntech.co.za",
    job_title: "Senior QA",
    department: "Quality Assurance",
    salary: 50000,
  },
  {
    id: 15,
    first_name: "Lisa",
    last_name: "Chen",
    email: "lisa.c@moderntech.co.za",
    job_title: "UX Designer",
    department: "Software Development",
    salary: 52000,
  },
];
export default {
  data() {
    const saved = localStorage.getItem("moderntech_employees");
    return {
      employees: saved ? JSON.parse(saved) : [...DEFAULT],
      showModal: false,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        job_title: "",
        department: "",
        salary: "",
      },
    };
  },
  computed: {
    totalPayroll() {
      return this.employees.reduce((s, e) => s + Number(e.salary || 0), 0);
    },
    avgSalary() {
      return this.employees.length
        ? Math.round(this.totalPayroll / this.employees.length)
        : 0;
    },
  },
  methods: {
    save() {
      localStorage.setItem(
        "moderntech_employees",
        JSON.stringify(this.employees),
      );
    },
    openAdd() {
      this.form = {
        first_name: "",
        last_name: "",
        email: "",
        job_title: "",
        department: "",
        salary: "",
      };
      this.showModal = true;
    },
    saveEmployee() {
      if (
        !this.form.first_name ||
        !this.form.last_name ||
        !this.form.email ||
        !this.form.job_title ||
        !this.form.department ||
        !this.form.salary
      )
        return alert("Fill ALL * fields");
      this.employees.push({
        id: Date.now(),
        ...this.form,
        salary: Number(this.form.salary),
        hire_date: new Date().toISOString().split("T")[0],
      });
      this.save();
      this.showModal = false;
    },
    deleteEmp(id) {
      if (confirm("Delete?")) {
        this.employees = this.employees.filter((e) => e.id !== id);
        this.save();
      }
    },
  },
};
</script>
<template>
  <div style="padding: 20px">
    <div style="display: flex; justify-content: space-between">
      <h2>HR Dashboard - {{ employees.length }} Employees</h2>
      <button
        @click="openAdd"
        style="
          background: #0f172a;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        "
      >
        + Add Employee
      </button>
    </div>
    <div
      style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-top: 15px;
      "
    >
      <div style="background: white; padding: 16px; border-radius: 12px">
        <div style="font-size: 11px; color: #64748b">TOTAL</div>
        <div style="font-size: 28px; font-weight: 800">
          {{ employees.length }}
        </div>
        <div style="font-size: 10px; color: green">
          localStorage persisted ✓
        </div>
      </div>
      <div style="background: white; padding: 16px; border-radius: 12px">
        <div style="font-size: 11px">AVG SALARY</div>
        <div style="font-size: 20px; font-weight: 800">
          R{{ avgSalary.toLocaleString() }}
        </div>
      </div>
      <div style="background: white; padding: 16px; border-radius: 12px">
        <div style="font-size: 11px">PAYROLL</div>
        <div style="font-size: 20px; font-weight: 800">
          R{{ totalPayroll.toLocaleString() }}
        </div>
      </div>
    </div>
    <div
      style="
        background: white;
        border-radius: 12px;
        padding: 20px;
        margin-top: 20px;
      "
    >
      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr style="background: #f8fafc; font-size: 11px">
            <th style="padding: 12px; text-align: left">Employee</th>
            <th style="padding: 12px">Dept</th>
            <th style="padding: 12px">Job</th>
            <th style="padding: 12px">Salary</th>
            <th style="padding: 12px"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="e in employees"
            :key="e.id"
            style="border-bottom: 1px solid #f1f5f9"
          >
            <td style="padding: 12px">
              <b>{{ e.first_name }} {{ e.last_name }}</b>
              <div style="font-size: 11px; color: #64748b">{{ e.email }}</div>
            </td>
            <td style="padding: 12px; font-size: 12px">{{ e.department }}</td>
            <td style="padding: 12px; font-size: 12px">{{ e.job_title }}</td>
            <td style="padding: 12px; font-weight: 600">
              R{{ Number(e.salary).toLocaleString() }}
            </td>
            <td style="padding: 12px">
              <button
                @click="deleteEmp(e.id)"
                style="
                  background: #fee2e2;
                  color: #991b1b;
                  border: none;
                  padding: 5px 10px;
                  border-radius: 6px;
                  cursor: pointer;
                "
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="showModal"
      style="
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;
      "
    >
      <div
        style="
          background: white;
          padding: 24px;
          border-radius: 12px;
          width: 400px;
        "
      >
        <h3>Add Employee</h3>
        <div style="display: grid; gap: 10px; margin-top: 12px">
          <input
            v-model="form.first_name"
            placeholder="First Name *"
            style="padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px"
          /><input
            v-model="form.last_name"
            placeholder="Last Name *"
            style="padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px"
          /><input
            v-model="form.email"
            placeholder="Email *"
            style="padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px"
          /><input
            v-model="form.job_title"
            placeholder="Job Title * developer"
            style="padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px"
          /><input
            v-model.number="form.salary"
            type="number"
            placeholder="Salary * 50000"
            style="
              padding: 10px;
              border: 2px solid #fca5a5;
              border-radius: 8px;
              background: #fef2f2;
            "
          /><select
            v-model="form.department"
            style="padding: 10px; border-radius: 8px"
          >
            <option value="">-- Department * --</option>
            <option>Software Development</option>
            <option>Quality Assurance</option>
            <option>Customer Support</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Human Resources</option>
          </select>
        </div>
        <button
          @click="saveEmployee"
          style="
            width: 100%;
            margin-top: 15px;
            background: #0f172a;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
          "
        >
          Save</button
        ><button
          @click="showModal = false"
          style="
            width: 100%;
            margin-top: 8px;
            background: white;
            padding: 8px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
          "
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
