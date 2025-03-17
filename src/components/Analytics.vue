<template>
  <div class="flex flex-col md:flex-row justify-between items-start gap-4 p-4">
    
 
    <div class="relative flex flex-col bg-stone-200 rounded-2xl border border-gray-200 p-6 w-full 
      sm:w-11/12 md:w-[53%] lg:w-[80%] xl:w-[70%]">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div class="bg-green-400 h-32 sm:h-40 md:h-44 lg:h-48 rounded-xl shadow-md flex items-center justify-center 
          transform hover:scale-95 transition border border-gray-300">
          <p class="text-gray-700 font-semibold text-lg text-center">Total Bets</p>
        </div>

        <div class="bg-yellow-300 h-32 sm:h-40 md:h-44 lg:h-48 rounded-lg shadow-md flex items-center justify-center 
          transform hover:scale-95 transition border border-gray-300">
          <p class="text-gray-700 font-semibold text-lg text-center">Total Active Users</p>
        </div>

        <div class="bg-blue-400 h-32 sm:h-40 md:h-44 lg:h-48 rounded-lg shadow-md flex items-center justify-center 
          transform hover:scale-95 transition border border-gray-300">
          <p class="text-gray-700 font-semibold text-lg text-center">Total Revenue</p>
        </div>

      </div>
    </div>

   
    <div class="flex flex-col sm:flex-row justify-between items-start bg-lime-300 p-6 rounded-2xl border border-gray-200 w-full 
      sm:w-[90%] md:w-[60%] lg:w-[60%] xl:w-[75%]">
      
      <div class="w-full">
        <div class="font-extrabold text-2xl text-center mb-6">Analytics Graph</div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          
          <div class="bg-stone-50 p-6 rounded-2xl shadow-md border border-gray-200 flex items-center justify-center 
            h-40 sm:h-44 md:h-48 lg:h-56 xl:h-64">
            <p class="text-gray-700 font-semibold">Card 1</p>
          </div>

          <div class="bg-stone-50 p-6 rounded-2xl shadow-md border border-gray-200 flex items-center justify-center 
            h-40 sm:h-44 md:h-48 lg:h-56 xl:h-64">
            <p class="text-gray-700 font-semibold">Card 2</p>
          </div>

          <div class="bg-stone-50 p-6 rounded-2xl shadow-md border border-gray-200 flex items-center justify-center 
            h-40 sm:h-44 md:h-48 lg:h-56 xl:h-64">
            <p class="text-gray-700 font-semibold">Card 3</p>
          </div>

          <div class="bg-stone-50 p-6 rounded-2xl shadow-md border border-gray-200 flex items-center justify-center 
            h-40 sm:h-44 md:h-48 lg:h-56 xl:h-64">
            <p class="text-gray-700 font-semibold">Card 4</p>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div class="relative flex flex-col bg-lime-300 rounded-2xl border border-gray-200 p-6 
    sm:w-11/12 md:w-[45%] lg:w-[54%] xl:w-[47%]">

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div class="bg-green-400 h-32 sm:h-40 md:h-44 lg:h-48 rounded-lg shadow-md flex items-center justify-center 
        transform hover:scale-95 transition border border-gray-300">
      </div>

      <div class="bg-yellow-300 h-32 sm:h-40 md:h-44 lg:h-48 rounded-lg shadow-md flex items-center justify-center 
        transform hover:scale-95 transition border border-gray-300">
    
      </div>

      <div class="bg-blue-400 h-32 sm:h-40 md:h-44 lg:h-48 rounded-lg shadow-md flex items-center justify-center 
        transform hover:scale-95 transition border border-gray-300">
      </div>

    </div>
  </div>

</template>
