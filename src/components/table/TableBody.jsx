import React from 'react'

export default function TableBody({ body }) {
  const getBodyData = () => (
    body && body.length > 0
     ? (
       body.map( (r, i) => (
        <tr key={ i }>
          <th scope='row'>{ i+1 }</th>
          <td>{ r.image ? <img src={ r.image } width='32'/> : 'No Img' }</td>
          <td>{ r.name }</td>
          <td>{ r.surname }</td>
          <td>{ r.gender }</td>
          <td>{ r.email }</td>
        </tr>
       ))
     )
     : 'No Data'
  )
  return (
    <tbody>
      { getBodyData() }
    </tbody>
  )
}
