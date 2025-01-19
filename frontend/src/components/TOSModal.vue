<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <h3>Terms of Service</h3>
        <div class="modal-body">
          <p>
            By using Mush.io, you agree to the following terms:
            <br><br>
          </p>
          
          <p>
            1. All content, media and data submitted through servers belongs to Mush.io and will be handled responsibility by the vendor (Mush.io).
            <br>
            2. Data will be stored securely and only shared with third parties when required by law. 
            <br>
            3. Data will be utilised as required and abides by local and international privacy policies.
          </p>
        </div>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TOSModal',
    data() {
      return {
        isVisible: false
      };
    },
    methods: {
      openModal() {
        this.isVisible = true;
      },
      closeModal() {
        this.isVisible = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    width: 90%; /* 90% width of the screen */
    max-width: 1200px; /* Cap the maximum width */
    max-height: 90vh; /* Max height as 90% of the screen height */
    overflow-y: auto; /* Make content scrollable if it exceeds max height */
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  
  .modal-content h3 {
    margin-top: 0;
    font-size: 2rem;
  }
  
  .modal-body {
    font-size: 1.1rem;
    line-height: 1.6;
    max-height: 75vh;
    overflow-y: auto;
    margin-bottom: 15px;
  }
  
  .modal-content button {
    background-color: #63b3ed; /* Light blue */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .modal-content button:hover {
    background-color: #4fa3d1;
  }
  </style>
  