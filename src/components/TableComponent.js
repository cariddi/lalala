import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function TableComponent( { contacts } ) {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Avatar</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Phone1</Table.HeaderCell>
                    <Table.HeaderCell>Phone2</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Birthdate</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    contacts && contacts.length ?
                    contacts.map(c => {
                        return (
                            <Table.Row key={c.id}>
                                <Table.Cell>{c.id}</Table.Cell>
                                <Table.Cell>{c.avatar}</Table.Cell>
                                <Table.Cell>{c.name}</Table.Cell>
                                <Table.Cell>{c.email}</Table.Cell>
                                <Table.Cell>{c.phone1}</Table.Cell>
                                <Table.Cell>{c.phone2}</Table.Cell>
                                <Table.Cell>{c.address}</Table.Cell>
                                <Table.Cell>{c.birthdate}</Table.Cell>
                                <Table.Cell><Link to={`/view/${c.id}`}><button>+</button></Link></Table.Cell>
                            </Table.Row>
                        )
                        }
                    )
                    :
                    <Table.Row></Table.Row>
                }
            </Table.Body>
        </Table>
    )
}

export default TableComponent
