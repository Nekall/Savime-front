const ForgotPassword = () => {
  fetch(``)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  return (
    <div>
      <div>
        <input type="text" placeholder="email@email.com" />
        <button>Demande de réinitialisation de mon mot de passe</button>
        <a href="/">Accueil</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
