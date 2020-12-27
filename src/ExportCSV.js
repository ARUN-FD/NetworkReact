import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Col, Label, Row, } from 'reactstrap';

export const ExportCSV = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const sheetNameFunc = (data) => {
      let names = [];
      data.map((x,i)=>{
        names.push(`sheet${(i+1)}`);
        return 0;
      })
      return names
    }

    const sheetFunc = (data) => {
      let sheets = {};
      data.map((x,i)=>{
        const ws = XLSX.utils.json_to_sheet(x)
        if(i === 0){
          sheets[`sheet${(i+1)}`] = ws;
        }else{
                  sheets[`sheet${(i+1)}`] = ws;
        }
        return 0;
      })
      return sheets;
    }

    const exportToCSV = (csvData, fileName) => {
        const wb = { Sheefts: sheetFunc(csvData), SheetNames: sheetNameFunc(csvData) };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Row style={{fontSize:'20px'}}>
        <Col md={1}>
        <i className="fas fa-download" onClick={(e) => exportToCSV(csvData,fileName)}></i>
        </Col>
        <Col md={6}>
          <Label style={{position:'relative',right:'25px'}}  onClick={(e) => exportToCSV(csvData,fileName)} className={"form-labels-6"}>Download Template</Label>
        </Col>
      </Row>
        
    )
}