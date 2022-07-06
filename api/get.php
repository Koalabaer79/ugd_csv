
<?php

require './connect.php';

$toReturn;
if (($handle = fopen("Artikel.csv", "r")) !== FALSE) {
	while (($data = fgetcsv($handle, 0, ';')) !== FALSE) {
		$toReturn[] = $data;
	}
	fclose($handle);
}
echo json_encode(['data'=>$toReturn]);

?>
