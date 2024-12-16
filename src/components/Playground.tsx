"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Playground = () => {
  const [inputValue, setInputValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleClick = async () => {
    setSubmitting(true);
    await fetch("/webhook", {
      method: "POST",
      body: inputValue,
    });
    setSubmitting(false);
  };

  return (
    <>
      <Form.Group controlId="playground" className="mb-3">
        <Form.Label>Playground</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </Form.Group>
      <Button disabled={submitting} onClick={handleClick}>Shoot</Button>
    </>
  );
};

export default Playground;
