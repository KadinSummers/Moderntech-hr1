<script>
export default {
  data() {
    const saved = localStorage.getItem("moderntech_employees");
    return { employees: saved ? JSON.parse(saved) : [] };
  },
  computed: {
    total() {
      return this.employees.reduce((s, e) => s + Number(e.salary || 0), 0);
    },
    avg() {
      return this.employees.length
        ? Math.round(this.total / this.employees.length)
        : 0;
    },
  },
  mounted() {
    window.addEventListener("storage", () => {
      const s = localStorage.getItem("moderntech_employees");
      if (s) this.employees = JSON.parse(s);
    });
    // refresh from storage every time view opens
    const s = localStorage.getItem("moderntech_employees");
    if (s) this.employees = JSON.parse(s);
  },
};
</script>
<template>
  <div style="padding: 20px">
    <h2>Payroll - {{ employees.length }} Employees</h2>
    <div
      style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-top: 15px;
      "
    >
      <div style="background: white; padding: 20px; border-radius: 12px">
        <div style="font-size: 11px">TOTAL PAYROLL</div>
        <div style="font-size: 24px; font-weight: 800; color: #16a34a">
          R{{ total.toLocaleString() }}
        </div>
      </div>
      <div style="background: white; padding: 20px; border-radius: 12px">
        <div style="font-size: 11px">AVERAGE</div>
        <div style="font-size: 24px; font-weight: 800">
          R{{ avg.toLocaleString() }}
        </div>
      </div>
      <div style="background: white; padding: 20px; border-radius: 12px">
        <div style="font-size: 11px">EMPLOYEES</div>
        <div style="font-size: 24px; font-weight: 800">
          {{ employees.length }}
        </div>
        <div style="font-size: 10px; color: green">Synced from Dashboard ✓</div>
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
            <th style="padding: 12px">Department</th>
            <th style="padding: 12px">Monthly Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="e in employees"
            :key="e.id"
            style="border-bottom: 1px solid #f1f5f9"
          >
            <td style="padding: 12px">{{ e.first_name }} {{ e.last_name }}</td>
            <td style="padding: 12px; font-size: 12px">{{ e.department }}</td>
            <td style="padding: 12px; font-weight: 600">
              R{{ Number(e.salary).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
