import React, {useState} from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { rutaAPI } from '../../../config/Config';

export default function EditarTime(){
    /*=============================================
	Hook para capturar datos
	=============================================*/

	const [times, editarTime ] = useState({

		time: "",
		descripcion: "",
        id:""

	})

    /*=============================================
	OnChange
	=============================================*/

	const cambiaFormPost = e => {

		editarTime({

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
		Ejecutamos el servicio put
		=============================================*/
		const result = await putData(times);
		console.log(result);
		// if(result.status === 400){
		// 	$(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
		// }

		if(result.time !== ""){

			$(".modal-footer").before(`<div class="alert alert-success">Success</div>`)

			$('button[type="submit"]').remove();

			setTimeout(()=>{window.location.href= "/";},3000)

		}

	}

    $(document).on("click", ".editarInputs", function(e){
        e.preventDefault();
        let data = $(this).attr("data").split(',');
        $("#timeEdit").val(data[1]);
        $("#descripcionEdit").val(data[2]);

        editarTime({
            'time': $("#timeEdit").val(),
            'descripcion': $("#descripcionEdit").val(),
            'id': data[0]
        })
        
    })
    
    /*=============================================
	CAPTURAMOS DATOS PARA BORRAR
	=============================================*/
    $(document).on("click", ".borrarInput", function(e){
        e.preventDefault();
        let data = $(this).attr("data").split(',')[0];
        Swal.fire({
            title: '¿Está seguro de eliminar este registro?',
            text: "¡Si no lo está puede cancelar la acción!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar registro!'
          }).then((result) => {
            if (result.value) {
  
              /*=============================================
              EJECTUAMOS SERVICIO DELETE
              =============================================*/
  
              const borrarTime = async () =>{
  
                  const result = await deleteData(data);
                  if(result.status === 500){
  
                      Swal.fire({
                          type:"error",
                          title: result.mensaje,
                          showConfirmButton: true,
	                        confirmButtonText: "Cerrar"   
                      }).then(function(result){
  
                           if(result.value){
  
                               window.location.href= "/";
  
                           }
  
                      })
  
                  }
  
                  if(result >= 0){
                    window.location.href= "/";
                  }
  
              }
  
              borrarTime();
          
            }
  
          })
    })

    return(

		<div className="modal" id="editarTime">
		  <div className="modal-dialog">
		    <div className="modal-content">

		      <div className="modal-header">
		        <h4 className="modal-title">Editar Time</h4>
		        <button type="button" className="close" data-dismiss="modal">&times;</button>
		      </div>


		      <form onChange={cambiaFormPost} onSubmit={submitPost} > 

			      <div className="modal-body">

			      	<div className="form-group">

			      		<label className="small text-secondary" htmlFor="time">Time</label>

			      		<div className="input-group mb-3">

			      			<div className="input-group-append input-group-text">
			      			</div>

			      			<input 
			      				id="timeEdit"
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
			      				id="descripcionEdit"
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
Peticion put Time
=============================================*/

const putData = data =>{
	const url = `${rutaAPI}/time/${data.id}`;

	// let formData = new FormData();

	const params = {
		method: "PUT",
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

/*=============================================
Petición delete Time
=============================================*/

const deleteData = data =>{

	const url = `${rutaAPI}/time/${data}`;
	const params = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		}
	}

	return fetch(url, params).then(response=>
		response.json()
	).then(result=>result
	).catch(err=>{
		return err;
	})

}