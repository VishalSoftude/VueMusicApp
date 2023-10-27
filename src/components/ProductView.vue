<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2"></div>
      <h1>Product Management</h1>
      <div class="flex justify-between items-center mb-4">
        <div class="ml-4">
          <input
            v-model="searchText"
            type="text"
            class="border rounded-md p-2"
            placeholder="Search..."
          />
        </div>
      </div>
      <table class="" ref="productTable" id="productTable">
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Order</th>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
export default {
  name: 'ProductView',
  inject: ['apiService'],
  data() {
    return {
      products: [],
      searchText: ''
    };
  },
  mounted() {
    const dataTable = $(this.$refs.productTable);

    dataTable.DataTable({
      // paging: true,
      // lengthChange: true,
      searching: false, // Disable built-in search box
      serverSide: true,
      ajax: async (data, callback) => {
        const apiResponse = await this.apiService.FetchProductDetails(
          this.searchText,
          data.start,
          data.length,
          //`${data.columns[data.order[0].column].data} ${data.order[0].dir}`
          'dd'
        );
        console.log('apiResponse', apiResponse.data.data);
        if (apiResponse) {
          callback({
            recordsTotal: apiResponse.data.recordsFiltered,
            recordsFiltered: apiResponse.data.recordsTotal,
            data: apiResponse.data.data
          });
        }
      },
      columns: [{ data: 'id' }, { data: 'name' }, { data: 'status' }, { data: 'order' }]
    });

    this.$watch('searchText', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        dataTable.DataTable().search(newValue).draw();
      }
    });
    //console.log(apiResponse);
  }
};
</script>

<style>
.container {
  justify-content: center;
  text-align: center;
  margin-left: 100px;
}
#productTable {
  width: 100%;
  margin-top: 1em;
  border-collapse: collapse;
  justify-content: center;
}

#productTable th,
#productTable td {
  padding: 8px;
  text-align: left;
}

#productTable thead tr {
  background-color: #007bff;
  color: #fff;
}

#productTable tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

#productTable tbody tr:hover {
  background-color: #ddd;
}
</style>
