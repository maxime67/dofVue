<script>
import ItemService from '../services/ApiService.vue';
import Navbar from "@/components/Navbar.vue";

export default {
  name: 'ItemsList',
  components: {Navbar},
  data() {
    return {
      items: [],
      isLoading: true,
      error: null,
      showOverlay: false,
      item: null
    }
  },
  methods: {
    async fetchItems() {
      try {
        this.isLoading = true;
        this.items = await ItemService.getAllItems();
      } catch (error) {
        this.error = 'Failed to load items. Please try again.';
        console.error('Error fetching items:', error);
      } finally {
        this.isLoading = false;
      }
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString();
    },
    dateDiff(achat, revente) {
      if (!achat || !revente) return 'N/A';
      const previous = new Date(achat);
      const after = new Date(revente);
      const diffTime = Math.abs(after - previous); // Get absolute difference in milliseconds
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days

      return `${diffDays} days`;
    },

    async deleteItem(id) {
      if (confirm('Are you sure you want to delete this item?')) {
        try {
          await ItemService.deleteItem(id);
          this.items = this.items.filter(item => item._id !== id);
        } catch (error) {
          alert('Failed to delete item');
          console.error('Delete error:', error);
        }
      }
    },

  },
  mounted() {
    this.fetchItems();
  }
}
</script>

<template>
  <Navbar></Navbar>
  <table class="w-full bg-white shadow-md rounded-lg overflow-hidden">
    <thead class="bg-gray-200">
    <tr>
      <th class="p-3 text-left">Item</th>
      <th class="p-3 text-center">Status</th>
      <th class="p-3 text-center">Purchase Price</th>
      <th class="p-3 text-center">Resale Price</th>
      <th class="p-3 text-center">%</th>
      <th class="p-3 text-center">Days Held</th>
      <th class="p-3 text-center">Delete</th>

    </tr>
    </thead>
    <tbody>
    <tr class="border-b hover:bg-gray-50 transition-colors" v-for="item in items"
        :key="item._id">
      <td class="p-3">{{ item.item }}</td>
      <td class="p-3 text-center">
                        <span v-if="item.prix_revente <= item.prix_achat"
                              class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Loss
                        </span>
        <span v-else class="bg-green-100 text-green-600 text-xs font-medium px-2.5 py-0.5 rounded">
                            Earn
                        </span>
      </td>
      <td class="p-3 text-center font-semibold text-gray-800">{{ item.prix_achat }}</td>
      <td class="p-3 text-center font-semibold text-gray-800">{{ item.prix_revente }}</td>
      <td v-if="item.prix_revente <= item.prix_achat" class="text-red-500 p-3 text-center font-semibold text-gray-800">
        {{ item.prix_achat / item.prix_revente * 100  }}%
      </td>
      <td v-else class="text-green-400 p-3 text-center font-semibold text-gray-800">
        {{ item.prix_achat / item.prix_revente * 100  }}%
      </td>
      <td class="p-3 text-center text-gray-600">{{ dateDiff(item.date_achat, item.date_revente) }}</td>

      <td class="p-3 text-center">
        <button @click="deleteItem(item._id)" class="text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Z"
                  clip-rule="evenodd"/>
          </svg>
        </button>
      </td>
    </tr>
    <!-- More rows would be dynamically added here -->
    </tbody>
  </table>
</template>


<style scoped>
</style>