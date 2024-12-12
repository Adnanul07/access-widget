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


function accessWidget() {
	let localAccessWidgetObservableValue = accessWidgetSupplierResponse.value;
	access_supplier_id = localAccessWidgetObservableValue["license_info"][0]["supplier_id"];
	access_license_id = localAccessWidgetObservableValue["license_info"][0]["license_id"];
	event_source_id = localAccessWidgetObservableValue["source_events"][0]["source_id"];/**/
	event_source_event_id = localAccessWidgetObservableValue["source_events"][0]["source_event_id"];/**/
		form =  '<div class="access-top-bar"></div>';/**/
	    	form += '<div id="access-body-id" class="access-body-class">';
	    	form += '<div id="access-details" class="access-body-content">';
	    	form += '</div>';
		form += '<div class="access-middle-bar"></div>';
		form +='    <div id="event-body-id" class="event-body-class">';
	    	form += '	<div id="source-event-details" class="event-body-content">';
		form += '	<div class="access-middle-bar">';
		form += '		<table class="styled-table"><thead><tr id="event-header-row"><th>Name</th><th>Description</th><th>Event Date</th><th>Event Time</th><th>Event Type</th></thead>';
		form += '			<tbody id="event-detail-rows"></tbody>';
		form += '		</table>';
		form += '	</div>';
	    	form += '</div>';

 
		jQuery("#access-info-widget").html(form);


if (Object.keys(localAccessWidgetObservableValue).length > 0){
			events_count = 0;
			rowContents = "";
			localAccessWidgetObservableValue.source_events.forEach(function(events){
				eventsId = events.source_event_id;
				
				events_count += 1;
				
				rowContents += '<tr>';
				
				eventsName = events.source_event_title;
				rowContents += '<td><div id="events-detail-row-name-' + events_count + '" data-table="source_events" data-field="source_event_title" data-title="Event Name" data-previous="' + eventsName +'" data-type="input" data-filterfield="source_event_id" data-filtervalue="' + eventsId +'" data-supplierid="' + event_source_id +'" data-detailsid="event-body-id"></div></td>';




				import http.client
import sqlite3
import urllib.parse
import urllib.error
import requests
from concurrent.futures import ThreadPoolExecutor


def authenium_location(id, lat, long):
    headers = {
        # Request headers
        'Content-Type': "application/json",
        'Cache-Control': "no-cache",
        'Ocp-Apim-Subscription-Key': '78bb1ef77f634efdb6f657bec0923309'
    }
    body = [lat,long]
    url = "https://gateway-dev.api.axaxl.com/AtheniumAnalyticsGaugeAPI/v1/format=json&perils=Wildfire?additionalData=False&returnPerilWithNoData=False"
    response = requests.post(url, json=body, headers=headers)
    data = response.json()[0]
    #print(data)
    #Insert rsults into database    
    sqliteConnection = sqlite3.connect('wildfire.db')
    cursor = sqliteConnection.cursor()
    query = "UPDATE Athenium SET riskScore='%s' WHERE table_id=%d" % (str(data['riskScore']), int(id))# This is an insert
    #print(query)
    cursor.execute(query)
    sqliteConnection.commit()
    sqliteConnection.close()
    
with ThreadPoolExecutor(max_workers=20) as executor:
    cnxn = sqlite3.connect('wildfire.db')
    cursor = cnxn.cursor()
    query = "SELECT * FROM Athenium WHERE table_id>8000 AND table_id <= 9000" #LIMIT 20" 
    cursor.execute(query) 
    columns = [column[0] for column in cursor.description]
    results = [dict(zip(columns, row)) for row in cursor.fetchall()]
    cnxn.close()
    
    for result in results:
    
        # FOR TESTING OR JUST SIMPLE MONITORING
        #print(result)

        executor.submit(authenium_location,authenium_location(result['table_id'],result['latitude'],result['longitude']))


