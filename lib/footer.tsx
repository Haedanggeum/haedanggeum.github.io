export function Footer() {
  return (
    <footer className="bd-footer py-md-4  bg-body-tertiary">
      <div className="container-xxl bd-gutter mt-3 my-md-4 bd-layout">
        {/* <div className="row">
          <h1>DISCLAIMER</h1>
          <p></p>
        </div> */}

        <div className="row">
          {/* <div className="col-lg-3 mb-4"> */}
          <a
            href="https://haedanggeum.github.io"
            className="d-inline-flex align-items-center mb-2 text-body-secondary text-decoration-none"
          >
            [haedanggeum] 해당금 프로젝트
          </a>
          <a
            href="https://haedanggeum.github.io"
            className="text-decoration-none text-body-secondary"
          >
            https://haedanggeum.github.io
          </a>
          <ul className="list-unstyled small">
            <li className="mb-5">
              This page is based on{" "}
              <a href="https://getbootstrap.com/" target="_blank;">
                bootstrap
              </a>
              , react-bootstrap, next.js
            </li>
          </ul>
        </div>
        {/* <div className="col-6 col-lg-2 offset-lg-1 mb-3"></div>
          <div className="col-6 col-lg-2 mb-3"></div> */}
      </div>
      {/* </div> */}
    </footer>
  );
}

export default Footer;
