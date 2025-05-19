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




				import json
import sqlite3
import os

# === CONFIGURATION ===
json_file_path = 'your_file.json'         # Replace this with your actual file path
sqlite_db_path = 'recalls.db'             # Output SQLite database file name

# === FUNCTION TO CONVERT JSON TO SQLITE ===
def json_to_sqlite(json_path, sqlite_path, table_name="recalls"):
    # Load JSON data
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Validate that it's a list of dictionaries
    if not isinstance(data, list) or not all(isinstance(item, dict) for item in data):
        raise ValueError("JSON must be a list of dictionaries.")

    # Connect to SQLite
    conn = sqlite3.connect(sqlite_path)
    cursor = conn.cursor()

    # Prepare table schema from the first record
    first_record = data[0]
    columns = list(first_record.keys())
    column_defs = ', '.join([f'"{col}" TEXT' for col in columns])

    # Create table
    cursor.execute(f'DROP TABLE IF EXISTS "{table_name}"')
    cursor.execute(f'CREATE TABLE "{table_name}" ({column_defs})')

    # Insert records
    for record in data:
        values = [record.get(col, "") for col in columns]
        placeholders = ', '.join(['?'] * len(values))
        cursor.execute(f'INSERT INTO "{table_name}" VALUES ({placeholders})', values)

    # Commit and close
    conn.commit()
    conn.close()
    print(f"✅ SQLite database created at: {os.path.abspath(sqlite_path)}")

# === RUN THE FUNCTION ===
json_to_sqlite(json_file_path, sqlite_db_path)

