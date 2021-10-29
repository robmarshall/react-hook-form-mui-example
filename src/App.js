import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./App.css";
import { TextField } from "@material-ui/core";

function App() {
  const emailRegexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [result, setResult] = useState("");
  const [mockRedux, setMockRedux] = useState("");

  const onSubmit = (data) => setResult(JSON.stringify(data));

  // Need to set a default value if we need the value to show up immediately.
  // otherwise it shows after first keypress.
  const firstInfo = watch("textField", "First info");
  const emailInfo = watch("emailField", "email");

  // Listen to changes and pass somewhere else.
  useEffect(() => {
    setMockRedux(emailInfo);
  }, [emailInfo]);

  return (
    <div className="app">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="textField"
          rules={{ required: "This field is required" }}
          defaultValue="First info"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="companyName"
              label="Text field"
              helperText={errors?.textField?.message}
              error={Boolean(errors?.textField?.message)}
              inputProps={{ maxLength: 50 }}
            />
          )}
        />

        <Controller
          control={control}
          name="emailField"
          rules={{
            pattern: {
              value: emailRegexPattern,
              message: "Must be a valid email",
            },
          }}
          defaultValue="email"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="emailField"
              label="Company Email"
              helperText={errors?.emailField?.message}
              error={Boolean(errors?.emailField?.message)}
            />
          )}
        />

        <input type="submit" />

        <p>Submit: {result}</p>
        <p>Text Field: {firstInfo}</p>
        <p>Mock Redux: {mockRedux}</p>
      </form>
    </div>
  );
}

export default App;
