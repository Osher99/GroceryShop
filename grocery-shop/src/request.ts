const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:23247";

export const fetchData = async (startDate: string, endDate: string, page: number, pageSize: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/transactions?startDate=${startDate}&endDate=${endDate}&pageNumber=${page}&pageSize=${pageSize}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${import.meta.env.REACT_APP_SERVICE_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
            
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
