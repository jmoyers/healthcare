import { useState } from "react";

function useFormState(initial) {
  const [state, setState] = useState(initial);
  const handleEvent = (e) => setState(e.target.value);
  return [state, handleEvent, setState];
}

export default useFormState;
