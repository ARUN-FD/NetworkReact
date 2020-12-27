import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import {Row,Col,Label,Input, Container} from 'reactstrap' 
import './App.css';
import readXlsxFile from "read-excel-file";
import {ExportCSV} from './ExportCSV'

function App() {

  const reader = new FileReader();
  const [files, setFiles] = useState({});
  const [fileName, setFileName] = useState("");
  const [customers, setCustomers] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [officeType, setOfficeType] = useState([]);
  const [officeLocation, setOfficeLocation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [templateData, setTemplateData] = useState([]);

  const capitalize = (val) => {
    var string = val;
    return `${string[0].toUpperCase()}${string.slice(1)}`;
  };

  const lowerCaseLetters = (val) => {
    var string = val;
    return `${string.toLowerCase()}`;
  };

  const upperCaseLetter = (val) => {
    var string = val;
    return `${string.toUpperCase()}`;
  };

  useEffect(() => {
    console.log(files)
    var f = files;
    if (f.name) {
      readXlsxFile(f).then((rows) => {
        console.log(rows);
        let keys = rows[1];
        rows.shift();
        if (rows.length > 0) {
          let datas = [];
          let data = {};
          rows.map((x, j) => {
            x.map((y, i) => {
              data[keys[i]] = y;
            });
            data.sNo = j + 1;
            datas.push(data);
          });
          console.log(datas);
          setExcelData(datas);
        }
      });
    }
  }, [files]);

  useEffect(() => {
    let custs = [
      [
        "userName",
        "phone",
        "email",
        "personId",
        "department"
      ],
      [],
    ];
    setCustomers(custs);
    setFileName("addFaculty");
  }, []);

  // useEffect(() => {
  //   if (excelData.length > 0) {
  //     const bulkUpload = async () => {
  //       try {
  //         const response = await RoleUploadData(excelData);
  //         if (response) {
  //           if (response.data) {
  //             console.log("Role copy was posted successfully");
  //           }
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //     bulkUpload();
  //   }
  // }, [excelData]);


  return (
    <Container>
      <Row>
        <Col className={"role-heading-6"}>Role Bulk Upload</Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col md={"6"}>
          <Row>
            <Col md={12}>
              <ExportCSV
                csvData={[customers]}
                fileName={fileName}
              />
            </Col>
          </Row>
        </Col>
        <Col md={"6"}>
          <Row
            onClick={() => {
              document.getElementById("uploadRoleTemplate").click();
            }}
          >
            <Col md={1}>
              <span style={{ fontSize: "20px" }}>
                <i className="fas fa-upload"></i>
              </span>
            </Col>
            <Col md={6}>
              <Label
                style={{ position: "relative", right: "25px", top: "5px" }}
                className={"form-labels-6"}
              >
                Upload Template
              </Label>
              <Input
                id={"uploadRoleTemplate"}
                style={{ display: "none" }}
                type={"file"}
                onChange={(e) => {
                  setFiles(e.target.files[0]);
                }}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* application/vnd.openxmlformats-officedocument.spreadsheetml.sheet */}
    </Container>
  );
}

export default App;
