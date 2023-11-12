<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

//connect
$mysqli = mysqli_connect("localhost", "dacikbas", "deniz", "donuts");

//check the connection
if(mysqli_connect_error()) {
    echo "Failed to connect to MariaDB: " . $mysqli->connect_error;
    die("There was an error connecting to the database");
}

//if we got here, the connection was successful
$query = "SELECT * FROM donuts";
//capture the return value of mysqli_query
//and if it isn't null, we can get the data
$result = mysqli_query($mysqli, $query);

// Initialize an empty array to store rows
$rows = [];

while($row = mysqli_fetch_array($result)) {
    $id = $row[0];
    $name = $row[1];
    $description = $row[2];
    $price = $row[3];

    // You can also add them to an array if needed
    $rows[] = [
        'id' => $id,
        'name' => $name,
        'description' => $description,
        'price' => $price,
    ];
}

// Check if it's a GET request with an ID parameter
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    // Get the ID from the URL
    $id = $_GET['id'];

    // Perform the database query to get the specific donut by ID
    $query = "SELECT * FROM donuts WHERE id = $id";
    $result = mysqli_query($mysqli, $query);

    // Fetch the data
    $row = mysqli_fetch_assoc($result);

    // Check if the query was successful
    if ($row) {
        // Respond with the donut data
        echo json_encode($row);
    } else {
        // Respond with an error if the query failed or donut not found
        echo json_encode(['error' => 'Donut not found']);
    }

    // Close the connection and exit
    $mysqli->close();
    exit();
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $post_data = file_get_contents("php://input");

    // Decode the JSON data
    $newDonutData = json_decode($post_data, true);

    // Validate the data if needed

    // Extract data
    $name = $newDonutData['name'];
    $description = $newDonutData['description'];
    $price = $newDonutData['price'];

    // Perform the database insert
    $query = "INSERT INTO donuts (name, description, price) VALUES ('$name', '$description', $price)";
    $result = mysqli_query($mysqli, $query);

    // Check if the query was successful
    if ($result) {
        // Get the inserted ID
        $insertedId = mysqli_insert_id($mysqli);

        // Retrieve the newly inserted donut from the database
        $query = "SELECT * FROM donuts WHERE id = $insertedId";
        $result = mysqli_query($mysqli, $query);

        // Fetch the data
        $row = mysqli_fetch_assoc($result);

        // Respond with the new donut data
        echo json_encode($row);
    } else {
        // Respond with an error if the query failed
        echo json_encode(['error' => 'Error inserting into the database']);
    }
}

// Check if it's a PUT request
// Check if it's a PUT request and contains an 'id' parameter
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    // Get the raw PUT data
    $put_data = file_get_contents("php://input");

    // Decode the JSON data
    $updatedDonutData = json_decode($put_data, true);

    // Validate the data
    if (
        !isset($updatedDonutData['id']) ||
        !isset($updatedDonutData['name']) ||
        !isset($updatedDonutData['description']) ||
        !isset($updatedDonutData['price'])
    ) {
        // Respond with a bad request status
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        exit;
    }

    // Extract data
    $id = $updatedDonutData['id'];
    $name = $updatedDonutData['name'];
    $description = $updatedDonutData['description'];
    $price = $updatedDonutData['price'];

    // Perform the database update with prepared statement
    $query = "UPDATE donuts SET name=?, description=?, price=? WHERE id=?";
    $stmt = $mysqli->prepare($query);

    // Check if the prepared statement was successful
    if ($stmt) {
        $stmt->bind_param("ssdi", $name, $description, $price, $id);
        $result = $stmt->execute();
        $stmt->close();

        // Check if the query was successful
        if ($result) {
            // Respond with the updated donut data
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($updatedDonutData);
        } else {
            // Respond with an error if the query failed
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Error updating the database']);
        }
    } else {
        // Respond with an error if the prepared statement failed
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Error preparing the statement']);
    }
    exit;
}

// Check if it's a DELETE request and contains an 'id' parameter
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    // Get the ID from the URL
    $id = $_GET['id'];

    // Perform the database delete
    $query = "DELETE FROM donuts WHERE id = $id";
    $result = mysqli_query($mysqli, $query);

    // Check if the query was successful
    if ($result) {
        // Respond with a success message
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Donut deleted successfully']);
    } else {
        // Respond with an error if the query failed or donut not found
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Error deleting the donut']);
    }

    // Close the connection and exit
    $mysqli->close();
    exit();
}

$mysqli->close();

// Return the data as JSON
echo json_encode($rows);
?>