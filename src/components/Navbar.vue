<template>
  <div class="navbar">
    <div>
      <input placeholder="New Item"
             v-model="query"
             @input="fetchResults"
             type="text"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    </div>

    <p v-if="isLoading" class="loading-text">Loading...</p>
    <div v-if="results.length > 0" class="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
      <nav class="flex min-w-[240px] flex-col gap-1 p-1.5">
        <div
            v-for="item in results"
            :key="item.id"
            role="button"
            class="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
        >
          <router-link :to="{
              path: '/new',
              query: {
                itemId: item.ankama_id,
              }
            }">
            <img style="width:20%" :src="item.image_urls.icon">
            {{ item.name }}
          </router-link>
        </div>
      </nav>
    </div>
  </div>

<!--  <div class="relative h-screen flex items-center justify-center p-4">-->
<!--    <div v-if="item"-->
<!--         class="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"-->
<!--         style="background-image: url(https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80);">-->
<!--      <div class="absolute bg-black opacity-60 inset-0 z-0"></div>-->
<!--      <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">-->
<!--        <div class="grid  gap-8 grid-cols-1">-->
<!--          <div class="flex flex-col ">-->
<!--            <div class="flex flex-col sm:flex-row items-center">-->
<!--              <h2 class="font-semibold text-lg mr-auto">New item</h2>-->
<!--              <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>-->
<!--            </div>-->
<!--            <div class="mt-5">-->
<!--              <div class="form">-->
<!--                <div class="md:space-y-2 mb-3">-->
<!--                  <div class="flex items-center py-6">-->
<!--                    <div class="w-12 h-12 mr-4 flex-none rounded-xl border overflow-hidden">-->
<!--                      <img class="w-12 h-12 mr-4 object-cover" :src="item.picture_url" alt="Avatar Upload">-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="md:flex flex-row md:space-x-4 w-full text-xs">-->
<!--                  <div class="mb-3 space-y-2 w-full text-xs">-->
<!--                    <label class="font-semibold text-gray-600 py-2">Item Name <abbr title="required">*</abbr></label>-->
<!--                    <input v-model="item.item" placeholder="Item Name"-->
<!--                           class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"-->
<!--                           required="required" type="text" name="integration[shop_name]" id="integration_shop_name">-->
<!--                    <p class="text-red text-xs hidden">Please fill out this field.</p>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="md:flex flex-row md:space-x-4 w-full text-xs">-->
<!--                  <div class="mb-3 space-y-2 w-full text-xs">-->
<!--                    <label class="font-semibold text-gray-600 py-2">Prix achat <abbr title="required">*</abbr></label>-->
<!--                    <input v-model="item.prix_achat" placeholder="prix d'achat / craft"-->
<!--                           class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"-->
<!--                           required="required" type="number" name="integration[shop_name]" id="integration_shop_name">-->
<!--                    <p class="text-red text-xs hidden">Please fill out this field.</p>-->
<!--                  </div>-->
<!--                  <div class="mb-3 space-y-2 w-full text-xs">-->
<!--                    <label class="font-semibold text-gray-600 py-2">Prix de vente <abbr-->
<!--                        title="required">*</abbr></label>-->
<!--                    <input v-model="item.prix_revente" placeholder="prix de vente"-->
<!--                           class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"-->
<!--                           required="required" type="number" name="integration[shop_name]" id="integration_shop_name">-->
<!--                    <p class="text-red text-xs hidden">Please fill out this field.</p>-->
<!--                  </div>-->
<!--                </div>-->

<!--                <div class="md:flex flex-row md:space-x-4 w-full text-xs">-->
<!--                  <div class="mb-3 space-y-2 w-full text-xs">-->
<!--                    <label class="font-semibold text-gray-600 py-2">Date d'achat <abbr-->
<!--                        title="required">*</abbr></label>-->
<!--                    <input v-model="item.date_achat"-->
<!--                           class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"-->
<!--                           required="required" type="date" name="integration[shop_name]" id="integration_shop_name">-->
<!--                    <p class="text-red text-xs hidden">Please fill out this field.</p>-->
<!--                  </div>-->
<!--                  <div class="mb-3 space-y-2 w-full text-xs">-->
<!--                    <label class="font-semibold text-gray-600 py-2">Date de vente <abbr-->
<!--                        title="required">*</abbr></label>-->
<!--                    <input v-model="item.date_revente" placeholder="prix de vente"-->
<!--                           class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"-->
<!--                           required="required" type="date" name="integration[shop_name]" id="integration_shop_name">-->
<!--                    <p class="text-red text-xs hidden">Please fill out this field.</p>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="flex items-start mb-6">-->
<!--                  <div class="flex items-center h-5">-->
<!--                    <label class="flex items-center cursor-pointer relative">-->
<!--                      <input v-model="item.is_sell" type="checkbox" checked-->
<!--                             class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"-->
<!--                             id="check"/>-->
<!--                      <span-->
<!--                          class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">-->
<!--                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"-->
<!--                         stroke="currentColor" stroke-width="1">-->
<!--                      <path fill-rule="evenodd"-->
<!--                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"-->
<!--                            clip-rule="evenodd"></path>-->
<!--                    </svg>-->
<!--                  </span>-->
<!--                    </label>-->
<!--                    <span class="p-2">Is sell</span>-->
<!--                  </div>-->
<!--                  <div class="flex items-center h-5">-->
<!--                    <label class="flex items-center cursor-pointer relative">-->
<!--                      <input v-model="item.is_fm" type="checkbox" checked-->
<!--                             class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"-->
<!--                             id="check"/>-->
<!--                      <span-->
<!--                          class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">-->
<!--                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"-->
<!--                         stroke="currentColor" stroke-width="1">-->
<!--                      <path fill-rule="evenodd"-->
<!--                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"-->
<!--                            clip-rule="evenodd"></path>-->
<!--                    </svg>-->
<!--                  </span>-->
<!--                    </label>-->
<!--                    <span class="p-2">Is Fm</span>-->
<!--                  </div>-->
<!--                  <div class="flex items-center h-5">-->
<!--                    <label class="flex items-center cursor-pointer relative">-->
<!--                      <input v-model="item.is_craft" type="checkbox" checked-->
<!--                             class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"-->
<!--                             id="check"/>-->
<!--                      <span-->
<!--                          class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">-->
<!--                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"-->
<!--                         stroke="currentColor" stroke-width="1">-->
<!--                      <path fill-rule="evenodd"-->
<!--                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"-->
<!--                            clip-rule="evenodd"></path>-->
<!--                    </svg>-->
<!--                  </span>-->
<!--                    </label>-->
<!--                    <span class="p-2">Is craft</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">-->
<!--                  <router-link to="/">-->
<!--                    <button-->
<!--                        class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">-->
<!--                      Cancel-->
<!--                    </button>-->
<!--                  </router-link>-->
<!--                  <button-->
<!--                      @click="save()"-->
<!--                      class="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">-->
<!--                    Save-->
<!--                  </button>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      results: [],
      isLoading: false,
      debounceTimeout: null,
      showOverlay: false
    };
  },
  methods: {
    fetchResults() {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      this.debounceTimeout = setTimeout(async () => {
        if (this.query.trim() === '') {
          this.results = [];
          return;
        }

        try {
          this.isLoading = true;
          const response = await axios.get(
              `https://api.dofusdu.de/dofus3/v1/fr/items/equipment/search?query=${this.query}&limit=10`
          );
          this.results = response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
          this.results = [];
        } finally {
          this.isLoading = false;
        }
      }, 300);
    },
  },
};
</script>

<style scoped>

</style>
