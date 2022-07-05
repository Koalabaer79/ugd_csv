
<?php
if (($handle = fopen("Artikel.csv", "r")) !== FALSE) {
	$data = fgetcsv($handle, 0, ';');
}

?>