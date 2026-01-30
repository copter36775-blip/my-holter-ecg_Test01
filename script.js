function login() {
    // 1. ดึงค่าจากช่องกรอก
    const idInput = document.getElementById('patientId').value;
    const errorMsg = document.getElementById('error-msg');

    // 2. ตรวจสอบว่ากรอกข้อมูลหรือยัง (Validation)
    if (idInput.trim() === "") {
        errorMsg.innerText = "กรุณาระบุรหัสผู้ป่วยก่อนเข้าใช้งาน";
        // ใส่สีแดงที่ขอบกล่องเพื่อให้รู้ว่าผิด
        document.getElementById('patientId').style.borderColor = "#e74c3c";
        return; // จบการทำงานทันที ไม่ไปต่อ
    }

    // 3. จำค่า ID ไว้ในระบบ (สำคัญมาก!)
    // localStorage.setItem('ชื่อตัวแปร', 'ค่าที่จะเก็บ')
    localStorage.setItem('currentPatientId', idInput);

    // 4. พาไปหน้า Dashboard
    // ตอนนี้เรายังไม่ได้สร้างไฟล์ dashboard.html แต่เขียนดักไว้ก่อน
    window.location.href = 'dashboard.html';
}

// เพิ่มลูกเล่น: กด Enter แล้ว Login ได้เลย ไม่ต้องเอาเมาส์ไปกดปุ่ม
document.getElementById('patientId').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        login();
    }
});