const Signup = () => {
  fetch(``)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  return (
    <div>
      <div>
        <input type="text" placeholder="email@email.com" />
        <input type="text" placeholder="password" />
        <input type="text" placeholder="password" />
        <button>Inscription</button>
        <a href="/connexion">J'ai déjà un compte !</a>
      </div>
    </div>
  );
};

export default Signup;
