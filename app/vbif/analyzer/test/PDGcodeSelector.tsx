import {
  create,
  isFunc,
  TSelector,
  treeProcess,
  createHistogram,
  EAxisBits,
} from "jsroot";

const ListPDG = [
  { code: 11, name: "전자 (e-)", nameR: "e" },
  { code: 13, name: "뮤온 (mu-)", nameR: "mu" },
  { code: 22, name: "광자(gamma)", nameR: "gamma" },
  { code: 111, name: "중성파이온 (pi0)", nameR: "pi0" },
  { code: 211, name: "하전파이온 (pi+)", nameR: "pi" },
  { code: 130, name: "중성케이온(장수명) (K0L)", nameR: "K0L" },
  { code: 310, name: "중성케이온(단수명) (K0S)", nameR: "K0S" },
  { code: 311, name: "중성케이온 (K0)", nameR: "K0" },
  { code: 321, name: "하전케이온 (K+)", nameR: "K" },
  { code: 2212, name: "양성자(p)", nameR: "p" },
  { code: 2112, name: "중성자(n)", nameR: "n" },
];
interface PDGCodeTree {
  pdgcode: number;
}

export class PDGCodeSelector extends TSelector {
  //   tgtobj: PDGCodeTree;
  constructor() {
    super();
    this.addBranch("pdgcode");
  }

  Begin() {
    // function called before reading of TTree starts
    console.log("reading PDGCodeSelector");
    this.hist = createHistogram("TH1I", ListPDG.length + 5);
    this.hist.fName = "PDGCode";
    this.hist.fTitle = "PDGCode";
    this.hist.fXaxis.fTitle = "PDGCode";
    this.hist.fYaxis.fTitle = "Entries";
    // this.hist.fXaxis.fLabels = create("TList");
    // console.log(this.hist.fXaxis.fLabels);
    // ListPDG.map(v => v.nameR).forEach((label, idx) => {
    //   console.log(label);
    //   let lbl = create("TObjString");
    //   lbl.fString = label;
    //   console.log(lbl);
    //   this.hist.fXaxis.fLabels.Add(lbl); // Labels are 1-based
    // });
    // this.hist.fXaxis.fNdivisions = 505;
    // this.hist.fXaxis.fBits |= EAxisBits.kLabelsH;
  }

  Process() {
    // function called for every entry
    this.hist.Fill(ListPDG.findIndex(v => v.code == this.tgtobj.pdgcode));
  }

  Terminate(res: any) {
    console.log("terminate of process");
    if (isFunc(this.result_callback)) this.result_callback(this.hist);
    // console.log(this.hist.fXaxis);
  }
}
