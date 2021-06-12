import React, {useState} from 'react';
import $ from 'jquery';
import { rutaAPI } from '../../../config/Config';

export default function CrearTime(){
    /*=============================================
	Hook para capturar datos
	=============================================*/

	const [times, crearTime ] = useState({

		time: "",
		descripcion: ""

	})

    /*=============================================
	OnChange
	=============================================*/

	const cambiaFormPost = e => {

		crearTime({

			...times,
			[e.target.name] : e.target.value

		})

	}

    /*=============================================
	OnSubmit
	=============================================*/

	const submitPost = async e => {

		$('.alert').remove();

		e.preventDefault();	
        // console.log("timers",times);

		 const {time, descripcion} = times;
		// console.log(times);
		/*=============================================
		Validamos que el campo Time no venga vacío
		=============================================*/

		if(time === ""){

			$(".invalid-time").show();
			$(".invalid-time").html("Completa este campo");
			return;
		}

		/*=============================================
		Validamos que el campo Zona no venga vacío
		=============================================*/

		if(descripcion === ""){

			$(".invalid-descripcion").show();
			$(".invalid-descripcion").html("Completa este campo");
			return;
		}

		/*=============================================
		Ejecutamos el servicio post
		=============================================*/
		const result = await postData(times);
		
		// if(result.status === 400){
		// 	$(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
		// }

		if(result.time !== ""){

			$(".modal-footer").before(`<div class="alert alert-success">Success</div>`)

			$('button[type="submit"]').remove();

			setTimeout(()=>{window.location.href= "/";},3000)

		}

	}

    

    return(

		<div className="modal" id="crearTime">
		  <div className="modal-dialog">
		    <div className="modal-content">

		      <div className="modal-header">
		        <h4 className="modal-title">Crear Time</h4>
		        <button type="button" className="close" data-dismiss="modal">&times;</button>
		      </div>


		      <form onChange={cambiaFormPost} onSubmit={submitPost}> 

			      <div className="modal-body">

			      	<div className="form-group">

			      		<label className="small text-secondary" htmlFor="time">Time</label>

			      		<div className="input-group mb-3">

			      			<div className="input-group-append input-group-text">
			      			</div>

			      			<input 
			      				id="time"
			      				type="text"
			      				className="form-control text-lowercase"
			      				name="time"
			      				placeholder="Ingrese el time"
			      				required

			      			/>
							  <div className="invalid-feedback invalid-time"></div>
 			      		</div>	

			      	</div>

			      	<div className="form-group">

			      		<label className="small text-secondary" htmlFor="descripcion">Zona</label>

			      		<div className="input-group mb-3">

			      			<div className="input-group-append input-group-text">
			      			</div>

			      			<input 
			      				id="descripcion"
			      				type="text"
			      				className="form-control text-lowercase"
			      				name="descripcion"
								placeholder="Ingrese la zona"
			      				required

			      			/>
							<div className="invalid-feedback invalid-descripcion"></div>
			      		</div>	

			      	</div>

			      </div>


			      <div className="modal-footer d-flex justify-content-between">

				      <div><button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button></div>

				      <div><button type="submit" className="btn btn-primary">Enviar</button></div>        

			      </div>

		      </form>

		    </div>
		  </div>
		</div>

	)
}

/*=============================================
Peticion post Time
=============================================*/

const postData = data =>{
	const url = `${rutaAPI}/times`;

	// let formData = new FormData();

	const params = {
		method: "POST",
		body: JSON.stringify(data),
		headers:{
			"Content-Type":"application/json"
		}
	}
	return fetch(url, params).then(response =>
        response.json()
   ).then(result => result
    ).catch(error =>{
        return error;
    })
}