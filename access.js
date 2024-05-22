/*
document.addEventListener('DOMContentLoaded',function(){
	fetch('informa.json')
	    .then(response =>response.json())
		.then(data =>{
			const sourceinfo=data.supplier_response.source_info;
			const accessDetails=sourceinfo.map(item=>item.source_access_details);
			console.log(accessDetails);
		});
    })			
*/	