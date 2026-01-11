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
            localStorage.setItem('role', result.role); // Simpan role
            
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Masuk!',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // Logika Redirect Berdasarkan Role
                if (result.role === 'admin') {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/dashboard';
                }
            });
        } else {
            Swal.fire({ icon: 'error', title: 'Login Gagal', text: result.message });
        }
    } catch (e) {
        Swal.fire('Error', 'Terjadi kesalahan server', 'error');
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