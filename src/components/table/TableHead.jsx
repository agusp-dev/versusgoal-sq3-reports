import React from 'react'

export default function TableHead({ head }) {
  const getHeadData = () => (
    head && head.length > 0 
      ? head.map((c, i) => 
        <th 
          key={ i } 
          scope='col'>
            { c }
        </th>
      )
      : 'No Data'
  )
  return (
    <thead>
      <tr>{ getHeadData() }</tr>
    </thead>
  )
}
