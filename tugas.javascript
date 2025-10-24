// Nama: Alfika Wulan Dewinta
// NIM: 2403311702
// File: tugas.javascript
// Gabungan Tugas P2 (Class/Object), P3 (DOM/Event), dan P4 (Async/Fetch data.json)

// Data teks mentah dari modul P2
const TEKS_ASLI = "Memori adalah urutan byte yang berisi sepotong kecil informasi. Informasi ini mungkin menjadi perintah untuk mengatakan pada computar apa yang harus dilakukan. Sel mungkin berisi data yang diperlukan computar untuk melakukan suatu perintah. Setiap slot mungkin berisi salah satu, dan apa yang sekarang menjadi data mungkin saja kemudian menjadi perintah. Ukuran masing-masing sel, dan jumlah sel, berubah secara hebat dari computar ke computar, dan teknologi dalam pembuatan memori sudah berubah secara hebat dari relay elektromekanik, ke tabung yang diisi dengan air raksa di mana pulsa akustik terbentuk, sampai matriks magnet permanen, ke setiap transistor, ke sirkuit terpadu dengan jutaan transistor di atas satu chip silikon.";

/**
 * Class KontenTugas: Untuk mengorganisir data dan fungsi (P2)
 */
class KontenTugas {
    constructor(judul, teks) {
        this.judul = judul;
        this.teksAsli = teks;
        this.sudahDikerjakan = false; 
    }

    // Fungsi koreksi teks (ubah 'computar' jadi 'komputer')
    koreksi() {
        return this.teksAsli.replace(/computar/g, 'komputer');
    }

    // Fungsi hitung kalimat (pisah berdasarkan '.')
    hitungKalimat() {
        return this.koreksi().split('.').filter(k => k.trim().length > 0).length;
    }

    // Fungsi hitung kata (pisah berdasarkan spasi)
    hitungKata() {
        let teksBersih = this.koreksi().trim();
        return teksBersih.split(/\s+/).length;
    }
}

// -----------------------------------------------------------
// FUNGSI INSIALISASI TUGAS P2 & P3
// -----------------------------------------------------------

function inisialisasiTugasP2() {
    let objekTugas = new KontenTugas("Tugas P2: Analisis Teks & DOM", TEKS_ASLI);

    let elemenTgl = document.getElementById("tgl");
    let elemenJudul = document.getElementById("title");
    let elemenKonten = document.getElementsByClassName("content")[0];
    let areaHitung = document.getElementById("count");
    let tombol = document.getElementById("btnIdentifikasi");

    // Tampilkan data awal (P3)
    elemenJudul.innerHTML = objekTugas.judul;
    elemenTgl.innerHTML += new Date(Date.now()).toLocaleDateString(); 
    elemenKonten.innerHTML = objekTugas.koreksi(); 

    // Event Handling saat tombol diklik
    tombol.addEventListener('click', function() {
        if (objekTugas.sudahDikerjakan) {
            alert("PERINGATAN! Proses identifikasi sudah selesai.");
            return;
        }

        let totalKalimat = objekTugas.hitungKalimat();
        let totalKata = objekTugas.hitungKata();

        // Tampilkan hasil P2
        areaHitung.innerHTML = `**HASIL ANALISIS P2:**<br>Jumlah Kalimat: ${totalKalimat}<br>Jumlah Kata: ${totalKata}`;
        objekTugas.sudahDikerjakan = true;
        
        // Panggil fungsi P4 setelah P2 selesai dianalisis
        muatDataTugasP4(); 
    });
}

// -----------------------------------------------------------
// FUNGSI ASYNC P4: Memuat Data dari data.json
// -----------------------------------------------------------

async function muatDataTugasP4() {
    const outputDiv = document.getElementById('output-p4');
    outputDiv.innerHTML = '<hr><h3>Tugas P4: Memuat Data Asinkron</h3><p>Loading data dari data.json...</p>';
    
    try {
        const response = await fetch('./data.json'); 
        if (!response.ok) {
            throw new Error(`Gagal mengambil data: ${response.status}`);
        }
        
        const dataArray = await response.json(); 
        const data = dataArray[0]; // Ambil objek pertama dari array
        
        outputDiv.innerHTML = `
            <hr>
            <h3>Tugas P4: Data Mahasiswa dari data.json (Async/Fetch) ✅</h3>
            <ul>
                <li><strong>Nama:</strong> ${data.Nama}</li>
                <li><strong>NIM:</strong> ${data.NIM}</li>
                <li><strong>Prodi/Kelas:</strong> ${data.Prodi} (${data.Kelas})</li>
                <li><strong>Tugas Mata Kuliah:</strong> ${data['Tugas Mata Kuliah']}</li>
                <li><strong>Asal Instansi:</strong> ${data['Asal Instansi']}</li>
            </ul>
            <p>Lihat juga: <a href="file.html">file.html (Demo P3 Terpisah)</a></p>
        `;

    } catch (error) {
        outputDiv.innerHTML = `<hr><h3>Tugas P4 Gagal ❌</h3><p style="color: red;">[ERROR]: Gagal memuat data tugas. Pastikan data.json sudah benar.</p>`;
        console.error("Kesalahan P4:", error);
    }
}

// Jalankan inisialisasi tugas P2/P3 saat halaman dimuat
window.onload = inisialisasiTugasP2;