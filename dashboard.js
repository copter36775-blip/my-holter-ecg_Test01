// 1. ตรวจสอบก่อนว่า Login มาหรือยัง?
const patientId = localStorage.getItem('currentPatientId');

if (!patientId) {
    // ถ้าไม่มี ID (แอบเข้าผ่านลิงก์ตรงๆ) ให้เตะกลับไปหน้า Login
    alert("กรุณา Login ก่อนเข้าใช้งาน");
    window.location.href = 'index.html';
} else {
    // ถ้ามี ID ให้แสดงบนหน้าเว็บ
    document.getElementById('display-id').innerText = "Patient ID: " + patientId;
}

// 2. ตั้งค่ากราฟ (Setup Chart)
const ctx = document.getElementById('ecgChart').getContext('2d');

// ข้อมูลเริ่มต้น (แกน X และ Y)
const initialData = {
    labels: Array(50).fill(''), // สร้างแกน X ว่างๆ 50 ช่อง
    datasets: [{
        label: 'ECG Signal (Lead I)',
        data: Array(50).fill(0), // สร้างข้อมูล 0 ไปก่อน 50 ตัว
        borderColor: '#e74c3c', // สีเส้นกราฟ (แดงหัวใจ)
        borderWidth: 2,
        tension: 0.4, // ความโค้งมนของเส้น (0 = เส้นตรง, 0.4 = โค้งสวย)
        pointRadius: 0, // ไม่ต้องโชว์จุดกลมๆ บนเส้น
        fill: false
    }]
};

// สร้างกราฟจริง
const ecgChart = new Chart(ctx, {
    type: 'line', // ชนิดกราฟเส้น
    data: initialData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false, // ปิด Animation เพื่อให้กราฟวิ่งลื่นๆ ไม่กระตุก
        scales: {
            y: {
                min: -2, // กำหนดค่าต่ำสุดแกน Y
                max: 2,  // กำหนดค่าสูงสุดแกน Y
                grid: {
                    color: '#f0f0f0' // สีตารางจางๆ
                }
            },
            x: {
                grid: {
                    display: false // ซ่อนเส้นตารางแนวตั้ง
                }
            }
        }
    }
});

// 3. ฟังก์ชันจำลองคลื่นหัวใจ (Mock Data Simulation)
// ในของจริง ตรงนี้จะเป็นฟังก์ชันที่รับค่าจาก Bluetooth
let counter = 0;

function generateData() {
    // สร้างคลื่น Sine Wave ผสม Noise จำลองคลื่น ECG แบบง่ายๆ
    // (ของจริงเราจะแทนที่ตรงนี้ด้วยค่าที่รับจาก MCU)
    const value = Math.sin(counter * 0.5) + (Math.random() * 0.2);

    // อัปเดตกราฟ
    addData(value);

    counter += 0.5;
}

// ฟังก์ชันสำหรับดันข้อมูลเข้ากราฟ (เลื่อนไปทางซ้าย)
function addData(newValue) {
    // ลบข้อมูลเก่าสุดทางซ้ายออก 1 ตัว
    ecgChart.data.labels.shift();
    ecgChart.data.datasets[0].data.shift();

    // เติมข้อมูลใหม่เข้าทางขวา 1 ตัว
    ecgChart.data.labels.push(''); // แกน X (เวลา)
    ecgChart.data.datasets[0].data.push(newValue); // แกน Y (Voltage)

    // สั่งวาดกราฟใหม่
    ecgChart.update();
}

// สั่งให้รันฟังก์ชัน generateData ทุกๆ 50 มิลลิวินาที (จำลอง Real-time)
setInterval(generateData, 50);

// 4. ฟังก์ชัน Logout
function logout() {
    localStorage.removeItem('currentPatientId'); // ล้างความจำ
    window.location.href = 'index.html'; // กลับหน้าแรก
}