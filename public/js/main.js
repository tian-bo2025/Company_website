async function login(){
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    if(!username || !password){ alert("用户名或密码不能为空"); return; }
    try {
        const res = await fetch('/login', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if(data.success) window.location.href='/';
        else alert(data.error || "登录失败");
    } catch(err){
        console.error(err);
        alert('请求失败');
    }
}

async function register(){
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    if(!username || !password){ alert("用户名或密码不能为空"); return; }
    try {
        const res = await fetch('/register', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ username, email, phone, password })
        });
        const data = await res.json();
        if(data.success) alert("注册成功，请登录");
        else alert(data.error || "注册失败");
    } catch(err){
        console.error(err);
        alert('请求失败');
    }
}
