import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

const Students = ({ studentsData }) => {
  console.log("studentsData", studentsData)

  return (
    <>
      <div>
        <TableContainer sx={{ maxHeight: "100vh" }}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Details</TableCell>
              </TableRow>
            </TableHead>
            {studentsData?.length ?
              (
                <TableBody>
                  {studentsData?.map(({ _id, name, email, status }, i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{_id}</TableCell>
                      <TableCell align="right">{name}</TableCell>
                      <TableCell align="right">{email}</TableCell>
                      <TableCell align="right">{status}</TableCell>
                      <TableCell align="right">
                        <Link to={`studentDetails/${_id}`}>
                          <InfoIcon />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )
              :
              (
                <div style={{ textAlign: "center" }}>No Data To Show</div>
              )
            }
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default Students