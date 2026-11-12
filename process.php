<?php
// Ensure the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Helper function to sanitize inputs
    function clean_input($data) {
        return htmlspecialchars(stripslashes(trim($data)), ENT_QUOTES, 'UTF-8');
    }

    $fullName   = clean_input($_POST['fullName'] ?? '');
    $usn        = strtoupper(clean_input($_POST['usn'] ?? ''));
    $email      = clean_input($_POST['email'] ?? '');
    $phone      = clean_input($_POST['phone'] ?? '');
    $dob        = clean_input($_POST['dob'] ?? '');
    $gender     = clean_input($_POST['gender'] ?? '');
    $department = clean_input($_POST['department'] ?? '');
    $semester   = clean_input($_POST['semester'] ?? '');
    $cgpa       = clean_input($_POST['cgpa'] ?? '');
    $track      = clean_input($_POST['track'] ?? '');
    $address    = clean_input($_POST['address'] ?? '');

    $skills = [];
    if (!empty($_POST['skills']) && is_array($_POST['skills'])) {
        foreach ($_POST['skills'] as $skill) {
            $skills[] = clean_input($skill);
        }
    }
    $skillsList = !empty($skills) ? implode(", ", $skills) : "None selected";

    date_default_timezone_set('Asia/Kolkata');
    $submissionDate = date("d M Y, h:i A");
} else {
    header("Location: index.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Official Registration Acknowledgement</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <div class="card">
            <div class="receipt-banner">
                <h2>Official Registration Acknowledgement</h2>
                <p>Application Processed Successfully via PHP Backend</p>
            </div>

            <div class="receipt-body">
                <div class="receipt-meta">
                    <div><strong>Submission Date:</strong> <?php echo $submissionDate; ?></div>
                    <div><strong>Status:</strong> <span class="status-badge">Confirmed & Verified</span></div>
                </div>

                <h3 class="receipt-table-heading">Applicant Information Summary</h3>
                <table class="receipt-table">
                    <tbody>
                        <tr>
                            <th>Full Name</th>
                            <td><?php echo $fullName; ?></td>
                            <th>USN / Roll No.</th>
                            <td><?php echo $usn; ?></td>
                        </tr>
                        <tr>
                            <th>Email Address</th>
                            <td><?php echo $email; ?></td>
                            <th>Phone Number</th>
                            <td>+91 <?php echo $phone; ?></td>
                        </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td><?php echo $dob; ?></td>
                            <th>Gender</th>
                            <td><?php echo $gender; ?></td>
                        </tr>
                        <tr>
                            <th>Department</th>
                            <td><?php echo $department; ?></td>
                            <th>Semester & CGPA</th>
                            <td><?php echo $semester . " (CGPA: " . number_format((float)$cgpa, 2) . ")"; ?></td>
                        </tr>
                        <tr>
                            <th>Selected Track</th>
                            <td colspan="3" class="highlight-cell"><?php echo $track; ?></td>
                        </tr>
                        <tr>
                            <th>Technical Skills</th>
                            <td colspan="3"><?php echo $skillsList; ?></td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td colspan="3"><?php echo nl2br($address); ?></td>
                        </tr>
                    </tbody>
                </table>

                <div class="receipt-footer-note">
                    <p><strong>Note:</strong> Please save or print a copy of this acknowledgement slip for your academic records.</p>
                </div>

                <div class="form-actions no-print">
                    <a href="index.html" class="btn-outline" style="text-decoration: none; display: inline-block;">Submit Another Response</a>
                    <button type="button" onclick="window.print()" class="btn-primary">Print Application</button>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
