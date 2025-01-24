import React, { useState, SetStateAction, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./styles.module.css";

("/control/execute p1_solarmax.mac");

`
/gps/particle proton
/gps/ene/type Mono
/gps/ene/mono 100 MeV
/gps/direction 0 0 1
/gps/pos/centre 0 0 0 mm
`;

const formlsize: number = 3;
const formrsize: number = 9;

export function ParticleSelector(props: {
  setOut: React.Dispatch<SetStateAction<string>>;
}) {
  const [beamtype, setBeamtype] = useState<"mono" | "arb" | "uniform">("mono");
  const [NBeamOn, setNBeamOn] = useState(0);
  const [beamSelText, setBeamSelText] = useState("");

  useEffect(
    () =>
      props.setOut(
        [beamSelText, "\n# Particle Beam On", `/run/beamOn ${NBeamOn}`].join(
          "\n",
        ),
      ),
    [beamtype, NBeamOn, beamSelText, props],
  );
  return (
    <>
      <Row className={styles.RowBox}>
        <Row md={5}>
          <Form.Label column sm={formlsize}>
            에너지 분포 선택
          </Form.Label>
          {[
            { label: "mono", desc: "단일 에너지" },
            { label: "uniform", desc: "균등 분포" },
            { label: "arb", desc: "지정 분포" },
          ].map((v, i) => (
            <Col key={`btypesel-${v.label}`} md={2}>
              <Form.Check
                inline
                name="btypesel"
                type="radio"
                label={v.desc}
                id={v.desc}
                onChange={e =>
                  e.currentTarget.value
                    ? setBeamtype(v.label as "mono" | "arb" | "uniform")
                    : null
                }
                checked={beamtype == v.label}
              />
            </Col>
          ))}
        </Row>
        {beamtype == "mono" ? <SelectorMono setOut={setBeamSelText} /> : <></>}
        {beamtype == "arb" ? <SelectorArb setOut={setBeamSelText} /> : <></>}
        {beamtype == "uniform" ? (
          <SelectorUniform setOut={setBeamSelText} />
        ) : (
          <></>
        )}
        <Form.Group as={Row}>
          <Form.Label column sm={formlsize}>
            입자의 갯수
          </Form.Label>
          <Col sm={formrsize}>
            <Row>
              <Col>
                <Form.Control
                  onChange={v => setNBeamOn(Number(v.currentTarget.value))}
                />
              </Col>
            </Row>
            <Form.Text style={{ textAlign: "left" }}>
              입사할 입자의 갯수를 입력
            </Form.Text>
          </Col>
        </Form.Group>
      </Row>
    </>
  );
}

function SelectorMono(props: {
  setOut: React.Dispatch<SetStateAction<string>>;
}) {
  const [BeamParticle, setBeamParticle] = useState("geantino");
  const [BeamEnergy, setBeamEnergy] = useState(0);
  const [BeamEnergyUnit, setBeamEnergyUnit] = useState("eV");

  useEffect(() =>
    props.setOut(
      [
        `/gps/particle ${BeamParticle}`,
        "/gps/ene/type Mono",
        `/gps/ene/mono ${BeamEnergy} ${BeamEnergyUnit}`,
        "/gps/direction 0 0 1",
        "/gps/pos/centre 0 0 0 mm",
      ].join("\n"),
    ),
  );
  return (
    <Row className={styles.RowBox}>
      <h3>입자 정보 입력</h3>
      {/* 방사선 종류 */}
      <Form.Group as={Row}>
        <Form.Label column sm={formlsize}>
          방사선 종류
        </Form.Label>
        <Col sm={formrsize}>
          <Form.Select onChange={v => setBeamParticle(v.currentTarget.value)}>
            {[
              { name: "클릭하여 선택", value: undefined },
              { name: "양성자(p)", value: "proton" },
              { name: "전자(e-)", value: "e-" },
              { name: "양전자(e+)", value: "e+" },
              { name: "중성자(n)", value: "n" },
              { name: "감마선(gamma)", value: "gamma" },
            ].map(value => (
              <option key={`particle-${value.value}`} value={value.value}>
                {value.name}
              </option>
            ))}
          </Form.Select>
          <Form.Text style={{ textAlign: "left" }}>
            입사할 방사선의 종류를 선택
          </Form.Text>
        </Col>
      </Form.Group>
      {/* 방사선의 에너지 */}
      <Form.Group as={Row}>
        <Form.Label column sm={formlsize}>
          방사선 에너지
        </Form.Label>
        <Col sm={formrsize}>
          <Row>
            <Col sm={8}>
              <Form.Control
                onChange={v =>
                  setBeamEnergy(Number(v.currentTarget.value) ?? 0)
                }
              />
            </Col>
            <Col sm={4}>
              <Form.Select
                onChange={v => setBeamEnergyUnit(v.currentTarget.value)}
              >
                {/* eV keV MeV GeV TeV PeV J electronvolt kiloelectronvolt megaelectronvolt gigaelectronvolt teraelectronvolt petaelectronvolt joule */}
                {[
                  { name: "클릭하여 선택", value: undefined },
                  { name: "eV", value: "eV" },
                  { name: "keV", value: "keV" },
                  { name: "MeV", value: "MeV" },
                  { name: "GeV", value: "GeV" },
                  { name: "TeV", value: "TeV" },
                  { name: "PeV", value: "PeV" },
                  { name: "J", value: "J" },
                ].map(value => (
                  <option key={`particle-${value.value}`} value={value.value}>
                    {value.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Form.Text style={{ textAlign: "left" }}>
            방사선 입자의 에너지와 에너지의 단위 선택
          </Form.Text>
        </Col>
      </Form.Group>
    </Row>
  );
}

function SelectorUniform(props: {
  setOut: React.Dispatch<SetStateAction<string>>;
}) {
  const [BeamParticle, setBeamParticle] = useState("geantino");
  const [BeamMinEnergy, setBeamMinEnergy] = useState(0);
  const [BeamMinEnergyUnit, setBeamMinEnergyUnit] = useState("");
  const [BeamMaxEnergy, setBeamMaxEnergy] = useState(0);
  const [BeamMaxEnergyUnit, setBeamMaxEnergyUnit] = useState("");

  useEffect(() =>
    props.setOut(
      [
        `/gps/particle ${BeamParticle}`,
        "/gps/ene/type Lin",
        `/gps/ene/min ${BeamMinEnergy} ${BeamMinEnergyUnit}`,
        `/gps/ene/max ${BeamMaxEnergy} ${BeamMaxEnergyUnit}`,
        "/gps/ene/gradient 0.",
        "/gps/ene/intercept 1.",
        "/gps/direction 0 0 1",
        "/gps/pos/centre 0 0 0 mm",
      ].join("\n"),
    ),
  );

  const unitMultiplier = [
    { name: "eV", value: 1 },
    { name: "keV", value: 1000 },
    { name: "MeV", value: 1000000 },
    { name: "GeV", value: 1000000000 },
    { name: "TeV", value: 1000000000000 },
    { name: "PeV", value: 1000000000000000 },
    { name: "J", value: 6.242e18 },
  ];

  const maxUnitM = unitMultiplier.findLast(
    v => v.name == BeamMaxEnergyUnit,
  )?.value;
  const minUnitM = unitMultiplier.findLast(
    v => v.name == BeamMinEnergyUnit,
  )?.value;

  return (
    <>
      <Form.Group as={Row}>
        <Form.Label column sm={formlsize}>
          방사선 종류
        </Form.Label>
        <Col sm={formrsize}>
          <Form.Select onChange={v => setBeamParticle(v.currentTarget.value)}>
            {[
              { name: "클릭하여 선택", value: undefined },
              { name: "양성자(p)", value: "p" },
              { name: "전자(e-)", value: "e-" },
              { name: "양전자(e+)", value: "e+" },
              { name: "중성자(n)", value: "n" },
              { name: "감마선(gamma)", value: "gamma" },
            ].map(value => (
              <option key={`particle-${value.value}`} value={value.value}>
                {value.name}
              </option>
            ))}
          </Form.Select>
          <Form.Text style={{ textAlign: "left" }}>
            입사할 방사선의 종류를 선택
          </Form.Text>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={formlsize}>
          최소 에너지
        </Form.Label>
        <Col sm={formrsize}>
          <Row>
            <Col sm={8}>
              <Form.Control
                onChange={v =>
                  setBeamMinEnergy(Number(v.currentTarget.value) ?? 0)
                }
              />
            </Col>
            <Col sm={4}>
              <Form.Select
                onChange={v => setBeamMinEnergyUnit(v.currentTarget.value)}
              >
                {/* eV keV MeV GeV TeV PeV J electronvolt kiloelectronvolt megaelectronvolt gigaelectronvolt teraelectronvolt petaelectronvolt joule */}
                {[
                  { name: "클릭하여 선택", value: undefined },
                  { name: "eV", value: "eV" },
                  { name: "keV", value: "keV" },
                  { name: "MeV", value: "MeV" },
                  { name: "GeV", value: "GeV" },
                  { name: "TeV", value: "TeV" },
                  { name: "PeV", value: "PeV" },
                  { name: "J", value: "J" },
                ].map(value => (
                  <option key={`particle-${value.value}`} value={value.value}>
                    {value.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Form.Text style={{ textAlign: "left" }}>
            방사선 입자의 최소에너지와 에너지의 단위 선택
          </Form.Text>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={formlsize}>
          최대 에너지
        </Form.Label>
        <Col sm={formrsize}>
          <Row>
            <Col sm={8}>
              <Form.Control
                onChange={v =>
                  setBeamMaxEnergy(Number(v.currentTarget.value) ?? 0)
                }
              />
            </Col>
            <Col sm={4}>
              <Form.Select
                onChange={v => setBeamMaxEnergyUnit(v.currentTarget.value)}
              >
                {/* eV keV MeV GeV TeV PeV J electronvolt kiloelectronvolt megaelectronvolt gigaelectronvolt teraelectronvolt petaelectronvolt joule */}
                {[
                  { name: "클릭하여 선택", value: undefined },
                  { name: "eV", value: "eV" },
                  { name: "keV", value: "keV" },
                  { name: "MeV", value: "MeV" },
                  { name: "GeV", value: "GeV" },
                  { name: "TeV", value: "TeV" },
                  { name: "PeV", value: "PeV" },
                  { name: "J", value: "J" },
                ].map(value => (
                  <option key={`particle-${value.value}`} value={value.value}>
                    {value.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Form.Text style={{ textAlign: "left" }}>
            방사선 입자의 최대에너지와 에너지의 단위 선택
          </Form.Text>
        </Col>
        {maxUnitM &&
        minUnitM &&
        BeamMinEnergy * minUnitM > BeamMaxEnergy * maxUnitM ? (
          <Col>
            <Form.Text
              style={{ textAlign: "center", color: "red", fontWeight: 700 }}
            >
              최소에너지가 최대에너지보다 큽니다.
            </Form.Text>
          </Col>
        ) : (
          <></>
        )}
      </Form.Group>
    </>
  );
}
//         Z=1          Z=2
// GCRMAX 3418.262257	336.2989673
// GCRMIN 1592.311196	188.0087506
// Flux (particles/m2-s-sr)

function SelectorArb(props: {
  setOut: React.Dispatch<SetStateAction<string>>;
  //   setN: React.Dispatch<SetStateAction<number>>;
}) {
  // 가능한 매크로 목록
  // SolarMax CREME2009 Proton
  // SolarMax CREME2009 alpha
  // SolarMin CREME2009 Proton
  // SolarMin CREME2009 alpha
  const [arb, setArb] = useState<string | undefined>();

  //   const [cond, setCond] = useState("");
  //   const [part, setPart] = useState("");
  const [flux, setFlux] = useState(0);

  useEffect(
    () => props.setOut(arb ? [`/control/execute ${arb}`].join("\n") : ""),
    [props, arb],
  );

  const fluxes = [
    {
      name: "GCR Minimum proton",
      condition: "GCRMIN",
      particle: "proton",
      value: 3418.262257,
    },
    {
      name: "GCR Minimum alpha",
      condition: "GCRMIN",
      particle: "alpha",
      value: 336.2989673,
    },
    {
      name: "GCR Maximum proton",
      condition: "GCRMAX",
      particle: "proton",
      value: 1592.311196,
    },
    {
      name: "GCR Maximum alpha",
      condition: "GCRMAX",
      particle: "alpha",
      value: 188.0087506,
    },
  ];

  function handleChange(va: string | undefined) {
    if (va == undefined) return;
    const v = fluxes.find(v => v.name == va);
    if (v == undefined) return;
    // setCond(v.condition as string);
    // setPart(v.particle as string);
    setArb(`macro/${v.condition}_${v.particle}.cmac`);
    setFlux(v.value);
  }

  function Calculator() {
    const pi = 3.1415926525;
    const [angleT, setAngleT] = useState<"pi4" | "pi2" | "arb">("pi4");
    const [angleS, setAngleS] = useState<string>("");
    const angle = Number(angleS);
    const [areaS, setAreaS] = useState<string>("");
    const area = Number(areaS);
    const [timeS, setTimeS] = useState<string>("");
    const timeV = Number(timeS);

    useEffect(() => {
      angleT == "pi4" || angleT == "pi2"
        ? setAngleS(
            angleT == "pi4"
              ? String(4 * pi)
              : angleT == "pi2"
              ? String(2 * pi)
              : "0",
          )
        : null;
    }, [angleT, setAngleS]);

    return (
      <>
        <Form.Group as={Row}>
          <Form.Label column sm={formlsize}>
            입체각
          </Form.Label>
          <Col sm={formrsize}>
            <Row>
              {[
                { label: "pi4", desc: "4pi (전방향)" },
                { label: "pi2", desc: "2pi (단방향 균일)" },
                { label: "arb", desc: "입력" },
              ].map((v, i) => (
                <Col key={`btypesel-${v.label}`} md={4}>
                  <Form.Check
                    inline
                    name="calc-steradian"
                    type="radio"
                    label={v.desc}
                    onChange={e =>
                      e.currentTarget.value
                        ? setAngleT(v.label as "pi4" | "pi2" | "arb")
                        : null
                    }
                    checked={angleT == v.label}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <Col sm={formrsize} style={{ margin: "1em" }}>
                <Form.Control
                  disabled={angleT != "arb"}
                  onChange={e => setAngleS(e.currentTarget.value)}
                  value={angleT == "arb" ? angleS : angle}
                />
                {angle > 4 * pi + 0.00000001 ? (
                  <span style={{ color: "red", fontWeight: 700 }}>
                    4pi({4 * pi}) 가 넘는 값입니다. 주의하십시오.
                  </span>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={formlsize}>
            면적 (m2)
          </Form.Label>
          <Col sm={formrsize}>
            <Form.Control
              onChange={e => setAreaS(e.currentTarget.value)}
              value={areaS}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={formlsize}>
            노출 시간 (초)
          </Form.Label>
          <Col sm={formrsize}>
            <Form.Control
              onChange={e => setTimeS(e.currentTarget.value)}
              value={timeS}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={formlsize}>
            계산값
          </Form.Label>
          <Col sm={formrsize}>
            <Form.Control value={flux * angle * area * timeV} disabled={true} />
          </Col>
        </Form.Group>
      </>
    );
  }

  return (
    <>
      <Form.Group as={Row}>
        <Form.Label column sm={formlsize}>
          방사선 종류
        </Form.Label>
        <Col sm={formrsize}>
          <Form.Select onChange={e => handleChange(e.currentTarget.value)}>
            <option>클릭하여 선택</option>
            {fluxes.map(value => (
              <option
                key={`particle-${value.condition}-${value.particle}`}
                value={value.name}
                // onClick={() => {
                //   setCond(value.condition as string);
                //   setPart(value.particle as string);
                //   setArb(value.name);
                //   console.log(
                //     fluxes.find(v => v.condition == cond && v.particle == part)
                //       ?.value,
                //   );
                // }}
              >
                {value.name}
              </option>
            ))}
          </Form.Select>
          <Form.Text style={{ textAlign: "left" }}>
            입사할 방사선의 종류를 선택 [CREME2009]
          </Form.Text>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={formlsize}>
          플럭스값
        </Form.Label>
        <Col sm={formrsize}>
          {flux} [particles/m2-s-sr] <Button variant="link">갯수 계산기</Button>
        </Col>
      </Form.Group>
      <Calculator />
    </>
  );
}
