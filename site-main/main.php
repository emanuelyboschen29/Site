<?php
// main.php
require_once "database.php";

// Exemplo: listar produtos e suas categorias
$sql = "SELECT p.id, p.nome, p.descricao, p.preco, p.imagem, c.nome AS categoria
        FROM produtos p
        LEFT JOIN categorias c ON p.id_categoria = c.id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h2>Produtos Cadastrados</h2>";
    echo "<ul>";
    while ($row = $result->fetch_assoc()) {
        echo "<li>";
        echo "<strong>" . htmlspecialchars($row['nome']) . "</strong><br>";
        echo "Categoria: " . htmlspecialchars($row['categoria']) . "<br>";
        echo "Preço: R$ " . number_format($row['preco'], 2, ',', '.') . "<br>";
        if (!empty($row['imagem'])) {
            echo "<img src='" . htmlspecialchars($row['imagem']) . "' width='100' alt='" . htmlspecialchars($row['nome']) . "'><br>";
        }
        echo "<hr>";
        echo "</li>";
    }
    echo "</ul>";
} else {
    echo "<p>Nenhum produto cadastrado ainda.</p>";
}

// Fecha a conexão
$conn->close();
?>
