import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function TableComponent( { contacts } ) {
    return (
        <div className="mainContainer">
            <div className="mainHeader">
                <div className="avatar">User Avatar</div>
                <h2 className="headerTitle">User Name</h2>
                <button className="button">Add Contact</button>
            </div>
            <hr />
            <div className="dataContainer">
                <div className="subHeader">
                    <div className="subHeaderLabel">Total: 5</div>
                    <h2 className="subHeaderTitle"><strong>Contacts</strong></h2>
                </div>
                <br />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className="tableHeaderCell">ID</Table.HeaderCell>
                            <Table.HeaderCell className="tableHeaderCell">Avatar</Table.HeaderCell>
                            <Table.HeaderCell className="tableHeaderCell">Name</Table.HeaderCell>
                            <Table.HeaderCell className="tableHeaderCell">Email</Table.HeaderCell>
                            <Table.HeaderCell className="tableHeaderCell">Phone1</Table.HeaderCell>
                            <Table.HeaderCell className="tableHeaderCell">Phone2</Table.HeaderCell>
                            <Table.HeaderCell className="tableHeaderCell">Address</Table.HeaderCell>
                            <Table.HeaderCell className="tableHeaderCell">Birthdate</Table.HeaderCell>
                            <Table.HeaderCell className="tableHeaderCell"></Table.HeaderCell>
                            <Table.HeaderCell className="tableHeaderCell"></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            contacts && contacts.length ?
                            contacts.map(c => {
                                return (
                                    <Table.Row key={c.id} className="tableRow">
                                        <Table.Cell className="tableCell">{c.id}</Table.Cell>
                                        <Table.Cell className="tableCell">{c.avatar}</Table.Cell>
                                        <Table.Cell className="tableCell">{c.name}</Table.Cell>
                                        <Table.Cell className="tableCell">{c.email}</Table.Cell>
                                        <Table.Cell className="tableCell">{c.phone1}</Table.Cell>
                                        <Table.Cell className="tableCell">{c.phone2}</Table.Cell>
                                        <Table.Cell className="tableCell">{c.address}</Table.Cell>
                                        <Table.Cell className="tableCell">{c.birthdate}</Table.Cell>
                                        <Table.Cell className="tableCell"><Link to={`/view/${c.id}`}><button className="linkBtnEdit">Edit</button></Link></Table.Cell>
                                        <Table.Cell className="tableCell"><Link to={`/view/${c.id}`}><button className="linkBtnView">+</button></Link></Table.Cell>
                                    </Table.Row>
                                )
                                }
                            )
                            :
                            <Table.Row></Table.Row>
                        }
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default TableComponent
