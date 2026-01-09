async function handleLogin(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (res.ok) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('userNama', result.nama);
            localStorage.setItem('userNIP', result.nip);
            
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Masuk!',
                text: 'Selamat datang.',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = '/dashboard';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: result.message
            });
        }
    } catch (e) {
        Swal.fire('Error', 'Tidak dapat terhubung ke server', 'error');
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil',
                text: 'Akun Anda telah dibuat. Silakan login.',
            }).then(() => {
                window.location.href = '/login';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Daftar',
                text: result.message
            });
        }
    } catch (e) {
        Swal.fire('Error', 'Server error', 'error');
    }
}