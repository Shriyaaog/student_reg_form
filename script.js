$(document).ready(function () {

    // Quick Fill Sample Data button for instant testing
    $('#fillSampleBtn').on('click', function () {
        $('#fullName').val('Vinod M');
        $('#usn').val('1RF24CS181');
        $('#email').val('rvit24bcs052.rvitm@rvei.edu.in');
        $('#phone').val('9876543210');
        $('#dob').val('2006-05-15');
        $('input[name="gender"][value="Male"]').prop('checked', true);
        $('#department').val('Computer Science & Engineering (CSE)');
        $('#semester').val('5th Semester');
        $('#cgpa').val('8.70');
        $('#track').val('Full Stack Web Development (MERN & PHP)');

        $('input[name="skills[]"]').prop('checked', false);
        $('input[name="skills[]"][value="Python"]').prop('checked', true);
        $('input[name="skills[]"][value="C / C++"]').prop('checked', true);
        $('input[name="skills[]"][value="HTML/CSS/JS"]').prop('checked', true);
        $('input[name="skills[]"][value="Linux / Git"]').prop('checked', true);

        $('#address').val('JP Nagar 8th Phase, Kothanur, Bengaluru, Karnataka - 560076');
        $('#declaration').prop('checked', true);

        $('.error-msg').hide();
        $('input, select, textarea').removeClass('input-error');
    });

    // Clear validation styles on input change
    $('input, select, textarea').on('input change', function () {
        $(this).removeClass('input-error');
        $(this).siblings('.error-msg').fadeOut(150);
    });

    // Reset button handler
    $('#resetBtn').on('click', function () {
        $('.error-msg').hide();
        $('input, select, textarea').removeClass('input-error');
    });

    // Form validation & submission handler
    $('#registrationForm').on('submit', function (e) {
        let isValid = true;

        // 1. Validate Full Name
        const fullName = $('#fullName').val().trim();
        if (fullName.length < 3) {
            $('#fullName').addClass('input-error');
            $('#err-fullName').fadeIn(200);
            isValid = false;
        }

        // 2. Validate USN
        const usn = $('#usn').val().trim();
        if (usn.length < 4) {
            $('#usn').addClass('input-error');
            $('#err-usn').fadeIn(200);
            isValid = false;
        }

        // 3. Validate Email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#email').addClass('input-error');
            $('#err-email').fadeIn(200);
            isValid = false;
        }

        // 4. Validate Phone
        const phone = $('#phone').val().trim();
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            $('#phone').addClass('input-error');
            $('#err-phone').fadeIn(200);
            isValid = false;
        }

        // 5. Validate Date of Birth
        const dob = $('#dob').val();
        if (!dob) {
            $('#dob').addClass('input-error');
            $('#err-dob').fadeIn(200);
            isValid = false;
        }

        // 6. Validate Department
        const department = $('#department').val();
        if (!department) {
            $('#department').addClass('input-error');
            $('#err-department').fadeIn(200);
            isValid = false;
        }

        // 7. Validate Semester
        const semester = $('#semester').val();
        if (!semester) {
            $('#semester').addClass('input-error');
            $('#err-semester').fadeIn(200);
            isValid = false;
        }

        // 8. Validate CGPA
        const cgpa = parseFloat($('#cgpa').val());
        if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
            $('#cgpa').addClass('input-error');
            $('#err-cgpa').fadeIn(200);
            isValid = false;
        }

        // 9. Validate Track
        const track = $('#track').val();
        if (!track) {
            $('#track').addClass('input-error');
            $('#err-track').fadeIn(200);
            isValid = false;
        }

        // 10. Validate Skills
        const selectedSkills = [];
        $('input[name="skills[]"]:checked').each(function () {
            selectedSkills.push($(this).val());
        });
        if (selectedSkills.length === 0) {
            $('#err-skills').fadeIn(200);
            isValid = false;
        } else {
            $('#err-skills').hide();
        }

        // 11. Validate Address
        const address = $('#address').val().trim();
        if (address.length < 10) {
            $('#address').addClass('input-error');
            $('#err-address').fadeIn(200);
            isValid = false;
        }

        // 12. Validate Declaration
        if (!$('#declaration').is(':checked')) {
            $('#err-declaration').fadeIn(200);
            isValid = false;
        } else {
            $('#err-declaration').hide();
        }

        if (!isValid) {
            e.preventDefault();
            return false;
        }

        // Check if running on a PHP-capable local server or static Live Server / GitHub Pages
        // If static environment (like VS Code Live Server or GitHub Pages), render directly via jQuery
        // If running on PHP server (e.g., localhost:8000 via php -S), allow normal POST to process.php
        const isStaticPreview = window.location.protocol === 'file:' || 
                                window.location.hostname.includes('github.io') || 
                                window.location.port === '5500' || 
                                window.location.port === '5501';

        if (isStaticPreview) {
            e.preventDefault();
            displayClientSideReceipt({
                fullName: fullName,
                usn: usn.toUpperCase(),
                email: email,
                phone: '+91 ' + phone,
                dob: dob,
                gender: $('input[name="gender"]:checked').val(),
                department: department,
                semester: semester,
                cgpa: cgpa.toFixed(2),
                track: track,
                skills: selectedSkills.join(', '),
                address: address
            });
        }
        // Otherwise, the form submits normally to process.php!
    });

    function displayClientSideReceipt(data) {
        const now = new Date();
        $('#out-date').text(now.toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }));

        $('#out-fullName').text(data.fullName);
        $('#out-usn').text(data.usn);
        $('#out-email').text(data.email);
        $('#out-phone').text(data.phone);
        $('#out-dob').text(data.dob);
        $('#out-gender').text(data.gender);
        $('#out-department').text(data.department);
        $('#out-sem-cgpa').text(data.semester + ' (CGPA: ' + data.cgpa + ')');
        $('#out-track').text(data.track);
        $('#out-skills').text(data.skills);
        $('#out-address').text(data.address);

        $('#form-section').fadeOut(250, function () {
            $('#receipt-section').fadeIn(300);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    $('#backToFormBtn').on('click', function () {
        $('#receipt-section').fadeOut(250, function () {
            $('#registrationForm')[0].reset();
            $('#form-section').fadeIn(300);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

});
