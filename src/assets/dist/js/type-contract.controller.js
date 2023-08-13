
// const URL_BASE='https://localhost:7269/api/TypeContract/';
// getData();
// alert("Ingreso");

// document.getElementById("btnAddtypeContract").addEventListener('click', async function(){
//     alert("se intento");
//     if(document.getElementById("AddtypeContract").value=="" || document.getElementById("AddDescriptionTypeContract").value==""){
//         alert("Llenar todos los campos");
//     }else{
//         const params = {
//             id: 0,
//             typeContract: document.getElementById("AddtypeContract").value,
//             description: document.getElementById("AddDescriptionTypeContract").value,
//             user: "User",
//             option: 0 //agregar
//         };
//         await Mantenimiento(params,URL_BASE).then(x=>{
//             clean();
//             getData();
//         });
//     }
    
// });
// document.getElementById("btnUpdatetypeContract").addEventListener('click', async function(){
//     if(document.getElementById("editNameTypeContract").value=="" || document.getElementById("editTypeContractDescription").value==""){
//         console.log("Llenar todos los campos");
//     }else{
//         const params = {
//             id:  document.getElementById("editIdTypeContract").value,
//             typeContract: document.getElementById("editNameTypeContract").value,
//             description: document.getElementById("editTypeContractDescription").value,
//             user: "User",
//             option: 1 //actualizar
//         };
//         await Mantenimiento(params,URL_BASE).then(x=>{
//             clean();
//             getData();
//         });
//     }
    
// });
// document.getElementById("btnDeletetypeContract").addEventListener('click', async function(){
//         const params = {
//             id:  document.getElementById("DeleteTypeContractId").value,
//             typeContract: "",
//             description: "",
//             user: "User",
//             option: 3 //Log eliminar
//         };
//         await Mantenimiento(params,URL_BASE).then(x=>{
//             clean();
//             getData();
//         });
// });

// async function active(id){
//     const params = {
//         id:  id,
//         typeContract: "",
//         description: "",
//         user: "User",
//         option: 2 //Log Activar/desactivar
//     };
//     await Mantenimiento(params,URL_BASE).then(x=>{
//         clean();
//         getData();
//     });
// }
// async function getData(){
//     try{
//         const data= await listAll(URL_BASE+'list')
//         const table= document.querySelector(".tbTipeContract");
//         var textInner=``;
//         var indice=1;
//         textInner=`
//         <thead class="table-light">
//             <tr>
//                 <th style="width: 10%;">#</th>
//                 <th style="width: 35%;">TIPO CONTRATO</th>
//                 <th style="width: 25%;">DESCRIPCIÓN</th>
//                 <th style="width: 10%;">ESTADO</th>
//                 <th style="width: 20%;">ACCIÓN</th>
//             </tr>
//         </thead>
//         <tbody>`;

//         data.forEach(element => {
            
//             textInner+=
//             `
//                 <tr>
//                     <td>${indice}</td>
//                     <td>${element.typeContract}</td>
//                     <td>${element.description}</td>
//                     <td>
//                         ${element.commonTables.state==true?`
//                         <div>
//                             <button class="btn btn-success btn-sm " onclick="active(${element.id})">Activo</button>
//                         </div>
//                         `:`
//                         <div>
//                             <button class="btn btn-danger btn-sm " onclick="active(${element.id})">Inactivo</button>
//                         </div>
//                         `}
//                     </td>      
//                     <td>

//                         <div class="btn-group">
//                             <button class="btn btn-warning btn-sm btnEditarUsuario" data-toggle="modal" 
//                             data-target="#modalEditarTipoContrato" onclick="getValores(${element.id}, '${element.typeContract}', '${element.description}')">
//                                 <i class="fa fa-pen"></i>
//                             </button>

//                             <button class="btn btn-danger btn-sm btnEliminarUsuario" data-toggle="modal" 
//                             data-target="#modalEliminarTipoContrato"  onclick="getValores(${element.id},'${element.typeContract}')">
//                             <i class="fa fa-times"></i></button>
//                         </div>
//                     </td>
//                 </tr>
//             `
//             indice++;
//         });
//         textInner+=`</tbody>`;
//         table.innerHTML =textInner;
        

//     }catch(error){
//         console.error(error)
//     }
// }
// function getValores(id,name,description){
//     document.getElementById("editIdTypeContract").value=id;
//     document.getElementById("editNameTypeContract").value=name;
//     document.getElementById("editTypeContractDescription").value=description;
//     document.getElementById("DeleteTypeContractId").value=id;
//     document.getElementById("TextContactTypeDelete").textContent=" "+name+"?";
// }
// function clean(){
//     document.getElementById("editIdTypeContract").value="";
//     document.getElementById("editNameTypeContract").value="";
//     document.getElementById("editTypeContractDescription").value="";
//     document.getElementById("DeleteTypeContractId").value="";
//     document.getElementById("TextContactTypeDelete").textContent="";
//     document.getElementById("AddtypeContract").value="";
//     document.getElementById("AddDescriptionTypeContract").value="";
// }







