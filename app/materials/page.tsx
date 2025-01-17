import {
  material_element,
  material_compound_nist,
  material_compound_ISS,
  material_compound_HEP,
  material_compound_BioChemical,
} from "@/lib/materiallist";
import Link from "next/link";
import Table from "react-bootstrap/Table";

export default function MaterialPages() {
  const material_all = [
    ...material_element,
    ...material_compound_nist,
    ...material_compound_ISS,
    ...material_compound_HEP,
    ...material_compound_BioChemical,
  ];
  return (
    <>
      <p>
        다음 페이지에서 가져옴{" "}
        <Link
          href={
            "https://geant4-userdoc.web.cern.ch/UsersGuides/ForApplicationDeveloper/BackupVersions/V11.0/html/Appendix/materialNames.html"
          }
          target="_blank"
        >
          Geant4 Reference
        </Link>
      </p>
      <Table>
        <tbody>
          {material_all.map((v, i) => (
            <tr key={i}>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
