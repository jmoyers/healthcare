import { nanoid } from "nanoid";
import { useParams, useNavigate } from "react-router-dom";
import { useResponseCreate } from "./hooks/response";
import { useForm } from "./hooks/form";
import { useEffect, useState } from "react";

const NewResponse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { status, data: form } = useForm(id);
  const { mutate: createResponse } = useResponseCreate();
  const [created, setCreated] = useState(false);

  // Create a copy of the form and create new response
  if (status === "success" && !created) {
    console.log("Creating new form");

    setCreated(true);

    const response = {
      ...form,
      id: nanoid(),
      form_id: form.id,
    };

    createResponse(response, {
      onSuccess: (res) => {
        navigate(`/response/${res.data.id}`);
      },
    });
  }

  return null;
};

export default NewResponse;
