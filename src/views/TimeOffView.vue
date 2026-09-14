<script>
export default {
  data() {
    const saved = localStorage.getItem("moderntech_employees");
    return {
      employees: saved ? JSON.parse(saved) : [],
      requests: JSON.parse(localStorage.getItem("timeoff") || "[]"),
      form: { employee_id: "", type: "Annual", days: 1 },
    };
  },
  methods: {
    addRequest() {
      if (!this.form.employee_id) return alert("Select employee");
      this.requests.push({
        id: Date.now(),
        ...this.form,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
      });
      localStorage.setItem("timeoff", JSON.stringify(this.requests));
      this.form = { employee_id: "", type: "Annual", days: 1 };
    },
  },
  mounted() {
    const s = localStorage.getItem("moderntech_employees");
    if (s) this.employees = JSON.parse(s);
  },
};
</script>
<template>
  <div style="padding: 20px">
    <h2>Time Off - {{ employees.length }} Employees Available</h2>
    <div
      style="
        background: white;
        padding: 20px;
        border-radius: 12px;
        margin-top: 15px;
      "
    >
      <h4 style="margin: 0 0 10px 0">Request Time Off</h4>
      <div style="display: flex; gap: 10px">
        <select
          v-model="form.employee_id"
          style="padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0"
        >
          <option value="">Select Employee</option>
          <option v-for="e in employees" :key="e.id" :value="e.id">
            {{ e.first_name }} {{ e.last_name }}
          </option></select
        ><select v-model="form.type" style="padding: 10px; border-radius: 8px">
          <option>Annual</option>
          <option>Sick</option>
          <option>Family</option></select
        ><input
          v-model.number="form.days"
          type="number"
          min="1"
          style="
            padding: 10px;
            width: 80px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          "
        /><button
          @click="addRequest"
          style="
            background: #0f172a;
            color: white;
            padding: 10px 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          "
        >
          Submit
        </button>
      </div>
    </div>
    <div
      style="
        background: white;
        padding: 20px;
        border-radius: 12px;
        margin-top: 15px;
      "
    >
      <table style="width: 100%">
        <thead>
          <tr style="font-size: 11px; color: #64748b">
            <th style="text-align: left; padding: 8px">Employee</th>
            <th>Type</th>
            <th>Days</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in requests" :key="r.id">
            <td style="padding: 8px">
              {{ employees.find((e) => e.id == r.employee_id)?.first_name }}
              {{ employees.find((e) => e.id == r.employee_id)?.last_name }}
            </td>
            <td style="padding: 8px">{{ r.type }}</td>
            <td style="padding: 8px">{{ r.days }}</td>
            <td style="padding: 8px">
              <span
                style="
                  background: #fef9c3;
                  padding: 2px 8px;
                  border-radius: 12px;
                  font-size: 11px;
                "
                >{{ r.status }}</span
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="requests.length === 0"
        style="font-size: 12px; color: #64748b; margin-top: 10px"
      >
        No requests yet - synced employees: {{ employees.length }}
      </div>
    </div>
  </div>
</template>
