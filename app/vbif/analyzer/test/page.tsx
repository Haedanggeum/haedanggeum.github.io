"use client";

import { PDGCodeSelector } from "./PDGcodeSelector";
import {
  TSelector,
  openFile,
  treeProcess,
  createHistogram,
  draw as rootdraw,
} from "jsroot";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useState, useRef } from "react";

export default function AnalyzerTestPage() {
  const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  const handleFilechange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Read the file as an ArrayBuffer
    const arrayBuffer = await selectedFile
      .arrayBuffer()
      .then(v => setArrayBuffer(v));
  };

  const handleAnalysis = async () => {
    setDrawn(true);
    // Dynamically import JSROOT
    // const JSROOT = await import("https://root.cern/js/latest/modules/main.mjs");

    // Create a JSROOT file object from the ArrayBuffer
    const jsrootFile = await openFile(arrayBuffer);

    // Read the TTree object (assuming it's named 'myTree')
    const tprofile = await jsrootFile.readObject("tree_profile");
    const selector = new PDGCodeSelector();
    const histogram = await treeProcess(tprofile, selector).then(
      () => selector.hist,
    );
    await rootdraw("drawingPROFILEPDGCODE2", histogram, "HIST");
  };
  return (
    <>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Col style={{ marginTop: "2em" }} sm={12} md={10} lg={9} xl={9} xxl={9}>
          {/* <h1>ROOT File Analyzer</h1> */}본 페이지는 JSROOT 를 활용하여
          VBIF에서 생성된 데이터를 분석하여 기초적 분석 결과를 제공합니다.
          <br /> 서버자원을 쓰지 않으며, 클라이언트 웹브라우저가 분석을
          수행합니다.
          <br />
          <strong>
            웹브라우저의 자원을 활용하므로, 너무 큰 파일을 업로드한 경우
            웹브라우저가 멈출 수 있습니다. 이에 유의하십시오.
          </strong>
        </Col>
        <Col style={{ marginTop: "2em" }} sm={12} md={10} lg={9} xl={9} xxl={9}>
          <h4>파일 선택</h4>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control
              type="file"
              accept=".root"
              ref={fileInputRef}
              onChange={handleFilechange}
            />
          </Form.Group>
          <Button style={{ margin: 0.5 + "em" }} onClick={handleAnalysis}>
            분석하기
          </Button>
        </Col>
        <Col>
          <div
            style={{ width: 100 + "%", height: 600 + "px" }}
            id="drawingPROFILEPDGCODE2"
          ></div>
        </Col>
      </Row>
    </>
  );
}
