
<?php

require './connect.php';

$postdata = trim(file_get_contents("php://input"));

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata,true);
  
	if(!is_array($request)){
	$order = [
		'error' => "Error"
	];
	}else{
		$data = $request['elem'];
	}

	$fp = fopen('Artikel.csv', 'w');

	foreach ($data as $fields) {
		fputcsv($fp, $fields, ";");
	}

	fclose($fp);
	
	http_response_code(201);
	echo json_encode(['data'=>$data]);
}

?>
