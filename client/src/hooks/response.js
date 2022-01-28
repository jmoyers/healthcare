import { useQuery, useMutation, useQueryClient } from "react-query";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import axios from "axios";

const API_BASE = "http://localhost:3001";

function useResponse(id) {
  return useQuery(["response", id], async () => {
    const { data } = await axios.get(`${API_BASE}/responses/${id}`);
    return data;
  });
}

function useResponses() {
  return useQuery("responses", async () => {
    const { data } = await axios.get(`${API_BASE}/responses`);
    return data;
  });
}

function useResponseDelete() {
  const queryClient = useQueryClient();

  const req = AwesomeDebouncePromise(
    (id) => axios.delete(`${API_BASE}/responses/${id}`),
    1000
  );

  return useMutation((id) => req(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["responses"]);
      const previousValue = queryClient.getQueryData(["responses"]);
      console.log("Optimistic delete", id);
      const newResponses = [...previousValue];
      for (const [i, response] of newResponses.entries()) {
        if (response.id === id) {
          newResponses.splice(i);
        }
      }
      console.log(previousValue, newResponses);
      queryClient.setQueryData(["responses"], newResponses);
      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      console.error("Mutation error", err);
      queryClient.setQueryData(["responses"], previousValue);
    },
    onSettled: async (res) => {
      console.log("Settled", res.data);
    },
  });
}

function useResponseCreate() {
  const queryClient = useQueryClient();

  return useMutation(
    (response) => axios.post(`${API_BASE}/responses`, response),
    {
      onMutate: async (response) => {
        await queryClient.cancelQueries(["responses"]);
        const previousValue = queryClient.getQueryData(["responses"]);
        console.log("Optimistic create response", response);
        const newResponses = previousValue ? [...previousValue] : [];
        newResponses.push(response);
        queryClient.setQueryData(["responses"], newResponses);
        return previousValue;
      },
      onError: (err, variables, previousValue) => {
        console.error("Mutation error", err);
        queryClient.setQueryData(["responses"], previousValue);
      },
      onSettled: async (res) => {
        console.log("Settled", res.data);
      },
    }
  );
}

function useResponseUpdate(id) {
  const queryClient = useQueryClient();

  const put = AwesomeDebouncePromise(
    (response) => axios.put(`${API_BASE}/responses/${response.id}`, response),
    1000
  );

  return useMutation(put, {
    onMutate: async (response) => {
      await queryClient.cancelQueries(["response", id]);
      const previousValue = queryClient.getQueryData(["response", id]);
      console.log("Optimistic update", response);
      queryClient.setQueryData(["response", id], response);
      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      console.error("Mutation error", err);
      queryClient.setQueryData(["response", previousValue.id], previousValue);
    },
    onSettled: async (res) => {
      console.log("Settled", res.data);
    },
  });
}

export {
  useResponse,
  useResponses,
  useResponseUpdate,
  useResponseDelete,
  useResponseCreate,
};
