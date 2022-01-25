import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const API_BASE = "http://172.26.127.134:3001";

function useForm(id) {
  return useQuery(["form", id], async () => {
    const { data } = await axios.get(`${API_BASE}/forms/${id}`);
    return data;
  });
}

function useForms() {
  return useQuery("forms", async () => {
    const { data } = await axios.get(`${API_BASE}/forms`);
    return data;
  });
}

function useFormMutation(id) {
  const queryClient = useQueryClient();
  return useMutation((form) => axios.put(`${API_BASE}/forms/${id}`, form), {
    onMutate: async (form) => {
      await queryClient.cancelQueries(["form", id]);
      const previousValue = queryClient.getQueryData(["form", id]);
      queryClient.setQueryData(["form", id], (old) => form);
      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["form", id], previousValue),
    onSettled: () => {
      queryClient.invalidateQueries(["form", id]);
    },
  });
}

const InputTypes = {
  ShortAnswer: "SHORT_ANSWER",
  Paragraph: "PARAGRAPH",
  Checkbox: "CHECKBOX",
  CheckboxGroup: "CHECKBOX_GROUP",
  Dropdown: "DROPDOWN",
  DateTime: "DATETIME",
};

export { useForm, useForms, useFormMutation, InputTypes };
