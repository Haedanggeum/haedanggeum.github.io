"use client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";

export default function VBIFHowtousePage() {
  return (
    <>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Col sm={12} md={10} lg={9} xl={9} xxl={9}>
          <p>
            본 페이지에서는 VBIF 를 어떻게 활용할 수 있는지에 대해 다룹니다.
          </p>
        </Col>
        <Col sm={12} md={10} lg={9} xl={9} xxl={9}>
          <h2>설치 방법</h2>
          <ul>
            <li>권장사양</li>
            <ul>
              <li>GEANT4 설치가 가능한 환경</li>
              <li>ROOT 설치 가능한 환경</li>
              <li>Linux 또는 macOS</li>
            </ul>
            <li>설치 방법</li>
            <ol>
              <code>git clone 어쩌구저쩌구</code>
            </ol>
            <ol>
              <code>mkdir build && cd build</code>
            </ol>
            <ol>
              <code>cmake .. </code>
            </ol>
            <ol>
              [optional] <code>make install</code>
            </ol>
          </ul>
          <p style={{ textAlign: "left" }}></p>
        </Col>
        <Col sm={12} md={10} lg={9} xl={9} xxl={9}>
          <h2>실행 방법</h2>
          <h3>그래픽 인터페이스로 실행</h3>
          <p>그래픽 인터페이스로 하여 VBIF 를 실행할 수 있습니다.</p>
          <h3>매크로로 실행</h3>
          <p>터미널에서 매크로 인터페이스로 하여 VBIF 를 실행할 수 있습니다.</p>
          <h2>분석 방법</h2>
          <p>
            VBIF 에서의 출력파일은 기본적으로 &ldquo;TTree 를 포함하는
            ROOT&rdquo;파일입니다. 이것을 분석하기 위한 방법은 ROOT 를 설치하여
            개별 요소를 분석할 수 있겠지만, JSROOT 를 이용한 기초적 분석을 본
            웹사이트에서 (<Link href="/vbif/analyzer">클릭하여 이동</Link>)
            제공합니다.
          </p>
        </Col>
        {/* </Row> */}
      </Row>
    </>
  );
}
