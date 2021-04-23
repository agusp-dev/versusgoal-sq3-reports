import React, { Fragment } from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Sq3Logo from '../../assets/icon-sq3.jpeg'

const data = {
	header: {
		tournament: 'Esquiu 3',
		competition: 'Apertura 2021 +36',
		team: 'Tercer Tiempo +36',
		description: `Los abajo fiermantes manifiestan su adecuada condiccion ficsica para la practica de este deporte corroborada con la planilla de chequeo medico y apto presentada en tiempo y forma antes del inicio del campeonato por medio de su Delegado quien da fe de lo actuado. Asimismo declaramos saber que el seguro deportivo por lesiones en el tiempo de juego debe ser contratado en forma individual por cada jugador por lo que de haber lesiones en el tiempo de juego previsto segun programa sera responsabilidad del jugador y/o su aseguradora quedando el torneo excento de toda responsabilidad al respecto.`,
		image: ''
	},
  head: [
    '',
    'Jugador',
    'Firma'
  ],
  body: [
    {
      image: 'https://images.pexels.com/photos/5380112/pexels-photo-5380112.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: 'Agustin',
      surname: 'Perez',
      dni: '123456789'
    },
    {
      image: 'https://images.pexels.com/photos/1080121/pexels-photo-1080121.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: 'Matias',
      surname: 'Lucero',
      dni: '123456789'
    },
    {
      image: 'https://images.pexels.com/photos/1773450/pexels-photo-1773450.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: 'Maximiliano',
      surname: 'Perez',
      dni: '123456789'
    },
    {
      image: 'https://images.pexels.com/photos/2040353/pexels-photo-2040353.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: 'Patricio',
      surname: 'Morales',
      dni: '123456789'
    },
    {
      image: 'https://images.pexels.com/photos/1080121/pexels-photo-1080121.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: 'Ramiro',
      surname: 'Rwintered',
      dni: '123456789'
    }
  ]
}

export default function UsersTable() {

  const { header, head, body } = data
  const getPdfTableRow = user => {
    const { name, surname, dni } = user
    return [
      '', //Must be an image, not text
      `${surname}, ${name}\n${dni}\nNº:`,
      ''
    ]
  }

  const onDownloadBtnClick = () => {
    const doc = new jsPDF()

		//Header table 1
		doc.autoTable({
			startY: 8,
			showHeader: 'no',
			theme: 'grid',
			columnStyles: {
				0: { columnWidth: 28 },
				1: { columnWidth: 38 }
			},
			didParseCell: data => {
				if (data.row.section === 'body' && data.column.index === 0) {
					const { cell } = data
					cell.styles.fontStyle = 'bold'
				}
			},
			body: [
				['Torneo:', data.header.tournament],
				['Competición:', data.header.competition],
				['Equipo:', data.header.team]
			]
		})
		//Header table 2
		doc.autoTable({
			startY: 8,
			showHeader: 'no',
			theme: 'grid',
			margin: { left: 80 },
			columnStyles: {
				0: { columnWidth: 84 }
			},
			didParseCell: data => {
				if (data.row.section === 'body' && data.column.index === 0) {
          const { cell } = data
					cell.styles.fontSize = 6
				}
			},
      didDrawCell: data => {
        if (data.row.section === 'body' && data.column.index === 1) {
          const { cell } = data
					const img = new Image()
					img.src = Sq3Logo
					console.log(cell)
					doc.addImage(
            img,
            'JPEG',
            cell.x + 6,
            cell.y + 1,
            20,
            20
          )
				}
      },
			body: [
				[header.description, '']
			]
		})

		//Users table
		doc.autoTable({
			theme: 'grid',
			startY: doc.lastAutoTable.finalY + 4,
			margin: { right: 107 },

      headStyles : {
        fillColor: [228, 228, 228],
        lineWidth: 1,
        lineColor: [228, 228, 228],
        textColor: [54, 54, 54]
      },

			columnStyles: {
				0: { columnWidth: 20 },
				1: { columnWidth: 45 },
				3: { columnWidth: 20 }
			},
			columns: [
				{ dataKey: 'photo', header: 'Foto' },
				{ dataKey: 'player', header: 'Jugador' },
				{ dataKey: 'signature', header: 'Firma' },
			],

      body: [...body.map(r => getPdfTableRow(r))],

      didDrawCell: data => {
        const { row, column, cell } = data
        if (row.section === 'body' && column.index === 0) {
          const img = new Image()
          img.src = body[row.index].image
          doc.addImage(
            img,
            'JPEG',
            cell.x + 3, 
            cell.y + 1,
            14,
            14
          )
        }
      }
		})

    doc.autoTable({
			theme: 'grid',
			startY: doc.lastAutoTable.settings.startY,
			margin: { left: 107 },

      headStyles : {
        fillColor: [228, 228, 228],
        lineWidth: 1,
        lineColor: [228, 228, 228],
        textColor: [54, 54, 54]
      },

			columnStyles: {
				0: { columnWidth: 20 },
				1: { columnWidth: 45 },
				3: { columnWidth: 20 }
			},
			columns: [
				{ dataKey: 'photo', header: 'Foto' },
				{ dataKey: 'player', header: 'Jugador' },
				{ dataKey: 'signature', header: 'Firma' },
			],
			body: [...body.map(r => getPdfTableRow(r))],

      didDrawCell: data => {
        const { row, column, cell } = data
        if (row.section === 'body' && column.index === 0) {
          const img = new Image()
          img.src = body[row.index].image
          doc.addImage(
            img,
            'JPEG',
            cell.x + 3, 
            cell.y + 1,
            14,
            14
          )
        }
      }
		})
    
    doc.save('table.pdf')
  }

  return (
    <Fragment>
      <table
        id='usersTable' 
        className='table table-striped'>
        <TableHead head={ head } />
        <TableBody body={ body } />
      </table>
      <div className='d-flex justify-content-end'>
        <button 
          type='button'
          className='btn btn-primary'
          onClick={ onDownloadBtnClick }>
            Download
        </button>
      </div>
    </Fragment>
  )
}
