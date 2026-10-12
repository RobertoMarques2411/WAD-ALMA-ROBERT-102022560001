<?php

$host   = '127.0.0.1';
$user   = 'root';
$pass   = '';
$dbname = 'don_n_done';

try {
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname`");
    $pdo->exec("USE `$dbname`");

    $pdo->exec("CREATE TABLE IF NOT EXISTS materials (
        id       INT AUTO_INCREMENT PRIMARY KEY,
        brand    VARCHAR(100) NOT NULL,
        category VARCHAR(50)  NOT NULL,
        supplier VARCHAR(100) NOT NULL,
        unit     VARCHAR(50)  NOT NULL,
        stock    INT DEFAULT 0,
        status   VARCHAR(50)  NOT NULL
    )");
} catch (PDOException $e) {
    die("Database error: " . $e->getMessage());
}

if (isset($_POST['add'])) {
    $stmt = $pdo->prepare("INSERT INTO materials 
        (brand, category, supplier, unit, stock, status)
        VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $_POST['brand'],
        $_POST['category'],
        $_POST['supplier'],
        $_POST['unit'],
        (int)$_POST['stock'],
        $_POST['status'],
    ]);
}

if (isset($_POST['update'])) {
    $stmt = $pdo->prepare("UPDATE materials 
        SET stock = ?, status = ? 
        WHERE id = ?");
    $stmt->execute([
        (int)$_POST['stock'],
        $_POST['status'],
        (int)$_POST['id'],
    ]);
}

if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM materials WHERE id = ?");
    $stmt->execute([(int)$_GET['delete']]);
}

$materials = $pdo->query("SELECT * FROM materials ORDER BY id DESC")
                 ->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Cleaning Material - Don N Done</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #3368A0;
            color: #C8DFDB;
            margin: 0;
            padding: 0;
        }
        header {
            background: #1c2b4a;
            color: #ffffff;
            padding: 16px 24px;
            margin-bottom: 24px;
            text-align: center;
        }
        header .brand {
            font-size: 20px;
            font-weight: bold;
            margin: 0 0 10px;
        }
        header nav a {
            color: #ffffff;
            text-decoration: none;
            margin-right: 18px;
            font-size: 14px;
        }
        header nav a:hover { text-decoration: underline; }
        header nav a.active { color: #00c2d1; font-weight: bold; }

        .box {
            background: #66A3BF;
            padding: 20px;
            max-width: 950px;
            margin: 0 auto 30px;
            border-radius: 8px;
        }
        h1 {
            color: #F2EFE7;
            text-align: center;
            margin-top: 0;
        }
        h3 {
            color: #F2EFE7;
            border-bottom: 1px solid #3368A0;
            padding-bottom: 4px;
        }
        label {
            display: block;
            margin-top: 8px;
            font-size: 13px;
            color: #F2EFE7;
            font-weight: bold;
        }
        select, input[type=text], input[type=number] {
            padding: 6px;
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #3368A0;
            border-radius: 4px;
            margin-bottom: 8px;
            background: #ffffff;
            color: #1c2b4a;
        }
        button {
            background: #1c2b4a;
            color: #F2EFE7;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }
        button:hover { background: #3368A0; }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            background: #ffffff;
        }
        th {
            background: #1c2b4a;
            color: #F2EFE7;
            padding: 8px;
            border: 1px solid #1c2b4a;
            font-size: 13px;
        }
        td {
            padding: 6px;
            border: 1px solid #66A3BF;
            color: #1c2b4a;
            text-align: center;
            font-size: 13px;
        }
        td input[type=number] {
            width: 70px;
            margin: 0;
            padding: 4px;
            text-align: center;
        }
        td select {
            width: 130px;
            margin: 0;
            padding: 4px;
            font-size: 12px;
        }
        td form { margin: 0; }

        .btn-small { padding: 4px 8px; font-size: 12px; }
        .btn-update { background: #3368A0; }
        .btn-update:hover { background: #1c2b4a; }

        .delete {
            color: #cc0000;
            text-decoration: none;
            font-weight: bold;
            font-size: 12px;
        }
        .delete:hover { text-decoration: underline; }
    </style>
</head>
<body>

<header>
    <p class="brand">Don N Done</p>
    <nav>
        <a href="service.html">Service &amp; Rate Module</a>
        <a href="machine2.php">Machinery &amp; Equipment Module</a>
        <a href="customer.html">Customer Data Module</a>
        <a href="cleaning.html" class="active">Cleaning Material Module</a>
    </nav>
</header>

<div class="box">
    <h1>Cleaning Material Module</h1>

    <h3>Add New Material</h3>
    <form method="POST">
        <label>Category</label>
        <select name="category" required>
            <option value="">-- Select Category --</option>
            <option value="Fragrance">Fragrance</option>
            <option value="Detergent">Detergent</option>
            <option value="Softener">Softener</option>
        </select>

        <label>Brand</label>
        <input type="text" name="brand" placeholder="e.g. Rinso" required>

        <label>Supplier</label>
        <input type="text" name="supplier" placeholder="e.g. PT Unilever" required>

        <label>Unit</label>
        <input type="text" name="unit" value="5 liter" required>

        <label>Stock</label>
        <input type="number" name="stock" min="0" required>

        <label>Status</label>
        <select name="status" required>
            <option value="">-- Select Status --</option>
            <option value="Still Available">Still Available</option>
            <option value="Need Order">Need Order</option>
        </select>

        <button type="submit" name="add">+ Add Item</button>
    </form>

    <h3>Material List</h3>
    <table>
        <tr>
            <th>No</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Unit</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>
        </tr>

        <?php if (count($materials) == 0): ?>
            <tr><td colspan="8">No data yet.</td></tr>
        <?php else: ?>
            <?php foreach ($materials as $i => $m): ?>
            <tr>
                <td><?= $i + 1 ?></td>
                <td><?= htmlspecialchars($m['brand']) ?></td>
                <td><?= htmlspecialchars($m['category']) ?></td>
                <td><?= htmlspecialchars($m['supplier']) ?></td>
                <td><?= htmlspecialchars($m['unit']) ?></td>

                <td colspan="3">
                    <form method="POST">
                        <input type="hidden" name="id" value="<?= $m['id'] ?>">

                        <input type="number" name="stock" min="0"
                               value="<?= (int)$m['stock'] ?>" required>

                        <select name="status" required>
                            <option value="Still Available"
                                <?= $m['status'] == 'Still Available' ? 'selected' : '' ?>>
                                Still Available
                            </option>
                            <option value="Need Order"
                                <?= $m['status'] == 'Need Order' ? 'selected' : '' ?>>
                                Need Order
                            </option>
                        </select>

                        <button type="submit" name="update" class="btn-small btn-update">Update</button>
                        &nbsp;
                        <a class="delete" href="?delete=<?= $m['id'] ?>"
                           onclick="return confirm('Delete this item?')">Delete</a>
                    </form>
                </td>
            </tr>
            <?php endforeach; ?>
        <?php endif; ?>
    </table>
</div>

</body>
</html>