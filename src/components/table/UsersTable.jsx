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
      image: 'https://images.pexels.com/photos/2609925/pexels-photo-2609925.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      name: 'Agustin',
      surname: 'Perez',
      gender: 'Male',
      email: 'perez.agustin@gmail.com'
    },
    {
      image: 'https://images.pexels.com/photos/3577955/pexels-photo-3577955.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      name: 'Diego',
      surname: 'Perez',
      gender: 'Male',
      email: 'perez.diego@gmail.com'
    },
    {
      image: 'https://images.pexels.com/photos/1220757/pexels-photo-1220757.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      name: 'Maximiliano',
      surname: 'Perez',
      gender: 'Male',
      email: 'perez.maxi@gmail.com'
    }
  ]
}

export default function UsersTable() {

  const { header, head, body } = data
  const getPdfTableRow = (i, user) => {
    return [
      i+1,
      '', //Must be an image, not text
      user.name,
      user.surname,
      user.gender,
      user.email
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
			// head: [['asdf', 'fdas']],
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
				0: { columnWidth: 84 },
				1: { columnWidth: 26 }
			},
			didParseCell: data => {
				const { cell } = data
				if (data.row.section === 'body' && data.column.index === 0) {
					cell.styles.fontSize = 6
				}
				if (data.row.section === 'body' && data.column.index === 1) {
					const img = new Image()
					img.src = Sq3Logo
					console.log(cell)
					doc.addImage(
            img,
            'JPEG',
            80 + 84 + cell.x, 
            cell.y,
            20,
            20
          )
				}
			},
			// head: [['asdf', 'fdas']],
			body: [
				[header.description, '']
			]
		})

		//Users table
		doc.autoTable({
			theme: 'grid',
			startY: doc.lastAutoTable.finalY + 8,
			margin: { right: 107 },

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
			body: [
				['', 'Acuña, Jorge Ariel \nDNI: 32373269 \nNº:', ''],
				['', 'Oliva, Franco Ezequiel \nDNI: 32373269 \nNº:', ''],
				['', 'Juncos, Agustin Javier \nDNI: 296057640 \nNº:', ''],
				['', 'Soler, Diego Fabian \nDNI: 301216560 \nNº:', ''],
				['', 'Zapata, Pablo Gabriel \nDNI: 30123550 \nNº:', '']
			]
		})

    // doc.autoTable({
    //   startY: doc.lastAutoTable.finalY + 8,
    //   head: [head],
    //   body: [...body.map((r, i) => getPdfTableRow(i, r))],
    //   //draw user images
    //   didDrawCell: data => {
    //     const { row, column, cell } = data
    //     if (row.section === 'body' && column.index === 1) {
    //       const img = new Image()
    //       img.src = body[row.index].image
          // doc.addImage(
          //   img,
          //   'JPEG',
          //   cell.x + 4, 
          //   cell.y,
          //   6,
          //   6
          // )
    //     }
    //   }
    // })
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
