import { useQuery, useMutation, useQueryClient } from "react-query";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import axios from "axios";

const API_BASE = "http://localhost:3001";

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

function useFormDelete() {
  const queryClient = useQueryClient();

  const req = AwesomeDebouncePromise(
    (id) => axios.delete(`${API_BASE}/forms/${id}`),
    1000
  );

  return useMutation((id) => req(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["forms"]);
      const previousValue = queryClient.getQueryData(["forms"]);
      console.log("Optimistic delete", id);
      const newForms = [...previousValue];
      for (const [i, form] of newForms.entries()) {
        if (form.id === id) {
          newForms.splice(i);
        }
      }
      queryClient.setQueryData(["forms"], newForms);
      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      console.error("Mutation error", err);
      queryClient.setQueryData(["forms"], previousValue);
    },
    onSettled: async (res) => {
      console.log("Settled", res.data);
    },
  });
}

function useFormCreate() {
  const queryClient = useQueryClient();

  const req = AwesomeDebouncePromise(
    (form) => axios.post(`${API_BASE}/forms`, form),
    1000
  );

  return useMutation((form) => req(form), {
    onMutate: async (form) => {
      await queryClient.cancelQueries(["forms"]);
      const previousValue = queryClient.getQueryData(["forms"]);
      console.log("Optimistic create form", form);
      const newForms = [...previousValue];
      newForms.push(form);
      queryClient.setQueryData(["forms"], newForms);
      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      console.error("Mutation error", err);
      queryClient.setQueryData(["forms"], previousValue);
    },
    onSettled: async (res) => {
      console.log("Settled", res.data);
    },
  });
}

function useFormMutation(id) {
  const queryClient = useQueryClient();

  const put = AwesomeDebouncePromise(
    (form) => axios.put(`${API_BASE}/forms/${form.id}`, form),
    1000
  );

  return useMutation(put, {
    onMutate: async (form) => {
      await queryClient.cancelQueries(["form", id]);
      const previousValue = queryClient.getQueryData(["form", id]);
      console.log("Optimistic update", form);
      queryClient.setQueryData(["form", id], form);
      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      console.error("Mutation error", err);
      queryClient.setQueryData(["form", previousValue.id], previousValue);
    },
    onSettled: async (res) => {
      console.log("Settled", res.data);
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

const InputPrettyNames = [
  {
    name: "Short answer",
    value: InputTypes.ShortAnswer,
  },
  {
    name: "Paragraph",
    value: InputTypes.Paragraph,
  },
  {
    name: "Checkbox Group",
    value: InputTypes.CheckboxGroup,
  },
  {
    name: "Dropdown",
    value: InputTypes.Dropdown,
  },
  {
    name: "Date/Time",
    value: InputTypes.DateTime,
  },
];

export {
  useForm,
  useForms,
  useFormMutation,
  useFormDelete,
  useFormCreate,
  InputTypes,
  InputPrettyNames,
};
