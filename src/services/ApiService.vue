<script>
import axios from 'axios';

// Base URL for your API - adjust as needed
const BASE_URL = import.meta.env.VITE_API_URL;

export default {
  // Get all items
  async getAllItems() {
    try {
      const response = await axios.get(`${BASE_URL}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },
  async test() {
    try {
      const response = await axios.get(`https://api.dofusdu.de/dofus3/v1/en/items/equipment/search?query=nidas&limit=25`);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  // Get single item by ID
  async getItemById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error);
      throw error;
    }
  },

  // Create new item
  async createItem(itemData) {
    try {
      const response = await axios.post(`${BASE_URL}/items`, itemData);
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  // Update item
  async updateItem(id, updateData) {
    try {
      const response = await axios.patch(`${BASE_URL}/items/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating item ${id}:`, error);
      throw error;
    }
  },

  // Delete item
  async deleteItem(id) {
    try {
      const response = await axios.delete(`${BASE_URL}/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting item ${id}:`, error);
      throw error;
    }
  }
}
</script>
