// components/RootFileAnalyzer.tsx
"use client";

import React, { useState, useRef } from "react";
import {
  treeDraw,
  version,
  openFile,
  makeSVG,
  makeImage,
  readObject,
  setHistogramTitle,
  draw as rootdraw,
} from "jsroot";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { Accordion, Table } from "react-bootstrap";

const RootFileAnalyzer: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
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

  // API reference https://root.cern/js/latest/jsdoc/global.html
  const handleAnalysis = async () => {
    setDrawn(true);
    // Dynamically import JSROOT
    // const JSROOT = await import("https://root.cern/js/latest/modules/main.mjs");

    // Create a JSROOT file object from the ArrayBuffer
    const jsrootFile = await openFile(arrayBuffer);

    // Read the TTree object (assuming it's named 'myTree')
    const ttree = await jsrootFile.readObject("tree_edep");
    const tprofile = await jsrootFile.readObject("tree_profile");
    const tprimary = await jsrootFile.readObject("tree_primary");

    // Perform analysis on the TTree
    // For example, draw a histogram of the 'branchName' branch
    const edephist = await treeDraw(ttree, "edep/1000");
    const primaryEne = await treeDraw(tprimary, "energy");
    const inciprofile = await treeDraw(tprofile, "posx:posy");
    const inciprofilez = await treeDraw(tprofile, "posz");
    const inciprofileEne = await treeDraw(tprofile, "energy/1000");
    const incipdgcode = await treeDraw(tprofile, "pdgcode");

    const dosehist = await treeDraw(ttree, "dose");
    const edosehist = await treeDraw(ttree, "doseWeighted");

    setHistogramTitle(edephist, "Energy Deposited;ENERGY[keV];ENTRIES");
    setHistogramTitle(
      primaryEne,
      "Primary Particle Energy;Energy[keV];ENTRIES",
    );
    setHistogramTitle(
      inciprofile,
      "Incident Particle on Scoring Volume;POSX[mm];POSY[mm];ENTRIES",
    );
    setHistogramTitle(
      inciprofilez,
      "Incident Particle on Scoring Volume;POSZ[mm];ENTRIES",
    );
    setHistogramTitle(
      inciprofileEne,
      "Incident Particle on Scoring Volume;Energy[keV];ENTRIES",
    );
    setHistogramTitle(
      incipdgcode,
      "Incident Particle on Scoring Volume;pdgcode;ENTRIES",
    );

    setHistogramTitle(dosehist, "Radiation Dose;Dose[Gy];ENTRIES");

    setHistogramTitle(edosehist, "Effective Dose;Effective Dose[Sv];ENTRIES");

    // Convert the histogram to an SVG for display
    // const svg = await makeSVG({ object: edephist });

    // Update the analysis result state
    // setAnalysisResult(svg);
    console.log(rootdraw);
    await rootdraw("drawingEDEP1", edephist, "logy;gridx;gridy");
    await rootdraw("drawingPRIMARYene", primaryEne, "logy;gridy");
    await rootdraw("drawingPROFILEene", inciprofileEne, "logy;gridy");
    await rootdraw("drawingPROFILEXY", inciprofile, "logz");
    await rootdraw("drawingPROFILEZ", inciprofilez, "logy;gridx;gridy");
    await rootdraw("drawingPROFILEPDGCODE", incipdgcode, "logy;gridy");

    await rootdraw("drawingDOSE", dosehist, "logy;gridy");
    await rootdraw("drawingEFFECTIVEDOSE", edosehist, "logy;gridy");
  };

  return (
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
        {/* <input
          type="file"
          accept=".root"
          ref={fileInputRef}
          onChange={handleFilechange}
        /> */}
        <Button style={{ margin: 0.5 + "em" }} onClick={handleAnalysis}>
          분석하기
        </Button>
      </Col>
      <Col style={{ marginTop: "2em" }} sm={12} md={10} lg={9} xl={9} xxl={9}>
        <h4>분석 결과</h4>
        <h5>생성된 일차 입자의 에너지 (일차입자별)</h5>
        {drawn ? (
          <div
            style={{ width: 100 + "%", height: 600 + "px" }}
            id="drawingPRIMARYene"
          ></div>
        ) : (
          <p style={{ fontSize: "small", color: "grey" }}>
            분석 한 자료가 없습니다.
          </p>
        )}
        <h5>기록 층에서 손실된 총 에너지(일차입자별)</h5>
        {drawn ? (
          <div
            style={{ width: 100 + "%", height: 600 + "px" }}
            id="drawingEDEP1"
          ></div>
        ) : (
          <p style={{ fontSize: "small", color: "grey" }}>
            분석 한 자료가 없습니다.
          </p>
        )}
        <h5>
          기록 층에 입사될 때의 에너지(기록층 바깥에서 생성된 2차입자는 포함,
          기록층 내부에서 생성된 2차입자는 비포함.)
        </h5>
        {drawn ? (
          <div
            style={{ width: 100 + "%", height: 600 + "px" }}
            id="drawingPROFILEene"
          ></div>
        ) : (
          <p style={{ fontSize: "small", color: "grey" }}>
            분석 한 자료가 없습니다.
          </p>
        )}
        <h5>
          표적층에 입사된 입자의 위치 (기록층 바깥에서 생성된 2차입자는 포함,
          기록층 내부에서 생성된 2차입자는 비포함.)
        </h5>
        {drawn ? (
          <div
            style={{ width: 100 + "%", height: 600 + "px" }}
            id="drawingPROFILEXY"
          ></div>
        ) : (
          <p style={{ fontSize: "small", color: "grey" }}>
            분석 한 자료가 없습니다.
          </p>
        )}
        {drawn ? (
          <div
            style={{ width: 100 + "%", height: 600 + "px" }}
            id="drawingPROFILEZ"
          ></div>
        ) : (
          <p style={{ fontSize: "small", color: "grey" }}>
            분석 한 자료가 없습니다.
          </p>
        )}

        <h5>표적층에 입사된 입자의 pdgcode</h5>
        <p>
          정수형기록이며, Low-binedge 가 그에 해당하는 번호임; 22-23 bin 이면
          22임 (gamma). <br /> PDG 코드에 관련하여서는 다음 PDF 파일을 참고.
          <Link
            target="_blank;"
            href="https://pdg.lbl.gov/2024/reviews/rpp2024-rev-monte-carlo-numbering.pdf"
          >
            참고페이지(pdgcode 관련 외부 페이지)
          </Link>
        </p>
        <Accordion defaultActiveKey={"0"}>
          <Accordion.Item eventKey="1">
            <Accordion.Header>주요 PDGCODE 리스트</Accordion.Header>
            <Accordion.Body>
              <strong>부호가 반대인 경우 그 입자의 반입자임.</strong>
              <Table>
                <tbody>
                  <tr>
                    <th>PDGCODE</th>
                    <th>이름</th>
                  </tr>
                  {[
                    { code: 11, name: "전자 (e-)" },
                    { code: 13, name: "뮤온 (mu-)" },
                    { code: 22, name: "광자(gamma)" },
                    { code: 111, name: "중성파이온 (pi0)" },
                    { code: 211, name: "하전파이온 (pi+)" },
                    { code: 130, name: "중성케이온(장수명) (K0L)" },
                    { code: 310, name: "중성케이온(단수명) (K0S)" },
                    { code: 311, name: "중성케이온 (K0)" },
                    { code: 321, name: "하전케이온 (K+)" },
                    { code: 2212, name: "양성자(p)" },
                    { code: 2112, name: "중성자(n)" },
                  ].map((v, i) => (
                    <tr key={`$pdgcodetable-${i}`}>
                      <td>{v.code}</td>
                      <td>{v.name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {drawn ? (
          <div
            style={{ width: 100 + "%", height: 600 + "px" }}
            id="drawingPROFILEPDGCODE"
          ></div>
        ) : (
          <p style={{ fontSize: "small", color: "grey" }}>
            분석 한 자료가 없습니다.
          </p>
        )}
        <h5>기록층에서의 흡수선량</h5>
        {drawn ? (
          <div
            style={{ width: 100 + "%", height: 600 + "px" }}
            id="drawingDOSE"
          ></div>
        ) : (
          <p style={{ fontSize: "small", color: "grey" }}>
            분석 한 자료가 없습니다.
          </p>
        )}
        <h5>기록층에서의 유효선량</h5>
        {drawn ? (
          <div
            style={{ width: 100 + "%", height: 600 + "px" }}
            id="drawingEFFECTIVEDOSE"
          ></div>
        ) : (
          <p style={{ fontSize: "small", color: "grey" }}>
            분석 한 자료가 없습니다.
          </p>
        )}
      </Col>
      {/* <Col style={{ marginTop: "2em" }} sm={12} md={10} lg={9} xl={9} xxl={9}>
        <h4>출력되는 정보</h4>
        <ul>
          <li>입력된 에너지 프로파일</li>
          <li>기록층에서의 입자가 축적한 에너지 스펙트럼(개별 입자별)</li>
          <li>기록층에서의 위치별 에너지 축적량</li>
        </ul>
      </Col> */}
    </Row>
  );
};

export default RootFileAnalyzer;
