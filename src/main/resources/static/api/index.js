const BASE_URL = "http://localhost:8080";

const METHOD = {
  PUT(data) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  },
  DELETE() {
    return {
      method: "DELETE"
    };
  },
  POST(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  }
};

const api = (() => {
  const dataRequest = (uri, config) => fetch(uri, config).then(data => data.json());
  const noDataRequest = (uri, config) => fetch(uri, config);

  const station = {
    get() {
      dataRequest(`${BASE_URL}/stations`);
    },
    create(data) {
      dataRequest(`${BASE_URL}/station`, METHOD.POST(data));
    },
    update(id, data) {
      noDataRequest(`${BASE_URL}/station/${id}`, METHOD.PUT(data));
    },
    delete(id) {
      noDataRequest(`${BASE_URL}/station/${id}`, METHOD.DELETE());
    }
  };

  const lines = {
    get() {
      return dataRequest(`${BASE_URL}/lines`);
    },
    create(data) {
      return dataRequest(`${BASE_URL}/lines`, METHOD.POST(data));
    },
    find(id) {
      return dataRequest(`${BASE_URL}/lines/${id}`);
    },
    update(id, data) {
      return dataRequest(`${BASE_URL}/lines/${id}`, METHOD.PUT(data));
    },
    delete(id) {
      noDataRequest(`${BASE_URL}/lines/${id}`, METHOD.DELETE());
    }
  };

  return {
    lines,
    station
  };
})();

export default api;
