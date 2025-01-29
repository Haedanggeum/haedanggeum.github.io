import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export interface TargetLayerEntry {
  matname: string;
  thickness: number | undefined;
  unit: string | undefined;
  weight: number | undefined;
  scored: boolean;
}

export function TargetLayerRow(props: {
  n: number;
  value: TargetLayerEntry;
  setValue: (index: number, value: TargetLayerEntry) => void;
}) {
  const [TkisNumber, setTkisNumber] = useState(false);
  function setMatName(value: string) {
    props.setValue(props.n, {
      ...props.value,
      matname: value,
    });
  }
  function setThickness(value: string) {
    if (isNaN(Number(value))) {
      props.setValue(props.n, { ...props.value, thickness: undefined });
      return;
    }
    props.setValue(props.n, {
      ...props.value,
      thickness: Number(value),
    });
  }
  function setUnit(value: string) {
    props.setValue(props.n, {
      ...props.value,
      unit: value,
    });
  }
  function setScored(value: boolean) {
    props.setValue(props.n, {
      ...props.value,
      scored: value,
    });
  }
  function setWeight(value: string) {
    props.setValue(props.n, {
      ...props.value,
      weight: Number(value),
    });
  }
  return (
    <tr style={{ verticalAlign: "middle" }}>
      <td>{props.n + 1}</td>
      <td>
        <Form.Control
          onChange={c => setMatName(c.currentTarget.value)}
          value={props.value.matname}
        />
      </td>
      <td>
        <Form.Control onChange={c => setThickness(c.currentTarget.value)} />
      </td>
      <td>
        <Form.Select onChange={c => setUnit(c.currentTarget.value)}>
          {[
            { name: "클릭하여 선택", value: undefined },
            { name: "um", value: "um" },
            { name: "mm", value: "mm" },
            { name: "cm", value: "cm" },
          ].map(value => (
            <option key={`particle-${value.value}`} value={value.value}>
              {value.name}
            </option>
          ))}
        </Form.Select>
      </td>
      <td>
        <Form.Check
          type="checkbox"
          onChange={c => setScored(c.currentTarget.checked)}
        />
      </td>
      <td>
        <Form.Control
          disabled={!props.value.scored}
          onChange={c => setWeight(c.currentTarget.value)}
        />
      </td>
    </tr>
  );
}
