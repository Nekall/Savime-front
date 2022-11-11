const ResetPassword = () => {
  fetch(``)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  return (
    <div>
      <div>
        <input type="text" placeholder="password" />
        <input type="text" placeholder="confirmPassword" />
        <button>Réinitialiser mon mot de passe</button>
        <a href="/">Accueil</a>
      </div>
    </div>
  );
};

export default ResetPassword;
