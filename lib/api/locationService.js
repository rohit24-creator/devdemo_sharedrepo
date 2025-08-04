// API Service for Location Data
// This will work with both dummy data and real APIs

// Dummy data (for development)
const dummyOriginData = [
  {
    "Location Name": "Mumbai Port",
    Address: "Mumbai Port Trust, Mumbai",
    City: "Mumbai",
    State: "Maharashtra",
    Country: "India",
    Pincode: "400001"
  },
  {
    "Location Name": "Chennai Port",
    Address: "Chennai Port Trust, Chennai",
    City: "Chennai",
    State: "Tamil Nadu",
    Country: "India",
    Pincode: "600001"
  },
  {
    "Location Name": "Kolkata Port",
    Address: "Kolkata Port Trust, Kolkata",
    City: "Kolkata",
    State: "West Bengal",
    Country: "India",
    Pincode: "700001"
  },
  {
    "Location Name": "Vizag Port",
    Address: "Visakhapatnam Port Trust, Vizag",
    City: "Visakhapatnam",
    State: "Andhra Pradesh",
    Country: "India",
    Pincode: "530001"
  },
  {
    "Location Name": "Kandla Port",
    Address: "Kandla Port Trust, Kandla",
    City: "Kandla",
    State: "Gujarat",
    Country: "India",
    Pincode: "370210"
  },
  {
    "Location Name": "JNPT",
    Address: "Jawaharlal Nehru Port Trust, Navi Mumbai",
    City: "Navi Mumbai",
    State: "Maharashtra",
    Country: "India",
    Pincode: "400707"
  },
  {
    "Location Name": "Mundra Port",
    Address: "Mundra Port, Mundra",
    City: "Mundra",
    State: "Gujarat",
    Country: "India",
    Pincode: "370421"
  },
  {
    "Location Name": "Pipavav Port",
    Address: "Pipavav Port, Pipavav",
    City: "Pipavav",
    State: "Gujarat",
    Country: "India",
    Pincode: "364265"
  }
];

// API Functions
export const locationService = {
  // Get origin locations with optional column filtering
  async getOriginLocations(columns = null) {
    try {
      // In real API, this would be:
      // const response = await fetch('/api/locations/origin');
      // const data = await response.json();
      
      // For now, using dummy data
      const data = dummyOriginData;
      
      // If columns are specified, filter the data
      if (columns) {
        return data.map(item => {
          const filteredItem = {};
          columns.forEach(col => {
            if (item[col] !== undefined) {
              filteredItem[col] = item[col];
            }
          });
          return filteredItem;
        });
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching origin locations:', error);
      return [];
    }
  },

  // Get drop locations (same as origin for now, but can be different)
  async getDropLocations(columns = null) {
    try {
      // In real API, this would be:
      // const response = await fetch('/api/locations/drop');
      // const data = await response.json();
      
      // For now, using same dummy data
      const data = dummyOriginData;
      
      // If columns are specified, filter the data
      if (columns) {
        return data.map(item => {
          const filteredItem = {};
          columns.forEach(col => {
            if (item[col] !== undefined) {
              filteredItem[col] = item[col];
            }
          });
          return filteredItem;
        });
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching drop locations:', error);
      return [];
    }
  },

  // Search locations
  async searchLocations(searchTerm, locationType = 'origin') {
    try {
      // In real API, this would be:
      // const response = await fetch(`/api/locations/search?q=${searchTerm}&type=${locationType}`);
      // const data = await response.json();
      
      const data = locationType === 'origin' ? dummyOriginData : dummyOriginData;
      
      return data.filter(item => 
        item["Location Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.City.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching locations:', error);
      return [];
    }
  }
};

// Column configurations for different pages
export const locationColumns = {
  // Trip Template - Show all columns
  tripTemplate: ["Location Name", "Address", "City", "State", "Country", "Pincode"],
  
  // Trip List - Show fewer columns (no Pincode)
  tripList: ["Location Name", "Address", "City", "State", "Country"],
  
  // Other pages can have different configurations
  booking: ["Location Name", "City", "State", "Country"],
  report: ["Location Name", "Address", "City", "State"]
}; 