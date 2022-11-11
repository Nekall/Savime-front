const Login = () => {
  fetch(``)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  return (
    <div>
      <div>
        <input type="text" placeholder="email@email.com" />
        <input type="text" placeholder="password" />
        <button>Connexion</button>
        <a href="/inscription">Pas encore de compte ?</a>
        <a href="/mot-de-passe-oublie">J'ai perdu mon mot de passe</a>
      </div>
    </div>
  );
};

export default Login;
