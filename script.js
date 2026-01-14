document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('login-form');
  const idInput = document.getElementById('identifier');
  const pwInput = document.getElementById('password');
  const toggle = document.getElementById('toggle-password');
  const remember = document.getElementById('remember');
  const idError = document.getElementById('id-error');
  const pwError = document.getElementById('pw-error');

  // Restore remembered identifier
  try{
    const saved = localStorage.getItem('pf_identifier');
    if(saved){ idInput.value = saved; remember.checked = true }
  }catch(e){/* ignore storage errors */}

  toggle.addEventListener('click', ()=>{
    const shown = pwInput.type === 'text';
    pwInput.type = shown ? 'password' : 'text';
    toggle.textContent = shown ? 'Show' : 'Hide';
    toggle.setAttribute('aria-label', shown ? 'Show password' : 'Hide password');
  });

  function validate(){
    let ok = true;
    idError.textContent = '';
    pwError.textContent = '';

    if(!idInput.value.trim()){
      idError.textContent = 'Please enter your email or username.';
      ok = false;
    }

    if(!pwInput.value || pwInput.value.length < 6){
      pwError.textContent = 'Password must be at least 6 characters.';
      ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!validate()) return;

    // remember identifier if checked
    try{
      if(remember.checked){
        localStorage.setItem('pf_identifier', idInput.value);
      } else {
        localStorage.removeItem('pf_identifier');
      }
    }catch(e){/* ignore */}

    // Simulate a submit - in real app replace with fetch/XHR to your auth endpoint
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Signing in...';

    setTimeout(()=>{
      btn.disabled = false;
      btn.textContent = 'Sign in';
      alert('Login simulated. Replace this with real authentication.');
      form.reset();
    }, 900);
  });
});
