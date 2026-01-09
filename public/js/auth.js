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
            window.location.href = '/dashboard';
        } else { alert(result.message); }
    } catch (e) { alert('Server error'); }
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
            alert('Berhasil daftar! Silakan login.');
            window.location.href = '/login';
        } else { alert(result.message); }
    } catch (e) { alert('Server error'); }
}