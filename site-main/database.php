<?php
require_once "database.php";

$sql = "SELECT * FROM produtos";
$result = $conn->query($sql);

if ($result === false) {
    die("Erro na consulta: " . $conn->error);
}

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "Produto: " . htmlspecialchars($row['nome']) . "<br>";
    }
} else {
    echo "Nenhum produto encontrado.";
}
?>
